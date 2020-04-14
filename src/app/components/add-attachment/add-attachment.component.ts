import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AttachmentsService } from 'src/app/services/attachments/attachments.service';
import { Subscription } from 'rxjs';
import { PrepareAttachment, FileMetadata, PreparedAttachment, UpdateAttachment } from 'src/app/utils/types/AttachmentTypes';
import {
  AnonymousCredential,
  BaseRequestPolicy,
  newPipeline,
  BlockBlobClient
} from "@azure/storage-blob";
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ModalService } from 'src/app/services/modal/modal.service';


@Component({
  selector: 'app-add-attachment',
  templateUrl: './add-attachment.component.html',
  styleUrls: ['./add-attachment.component.css']
})
export class AddAttachmentComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef<HTMLInputElement>;
  $prepareFiles: Subscription;
  files: FileList;
  $routeParams: Subscription;
  id: string;
  filesSelected = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private attachmentsService: AttachmentsService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.$routeParams = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });
  }

  showFileDialog(): void {
    this.fileInput.nativeElement.click();
  }

  onSelected($event): void {
    this.files = $event.target.files;
    if (this.files != null && this.files !== undefined) {
      this.filesSelected = true;
    }
  }

  get currentFiles() {
    const files: File[] = [];
    for (let i = 0; i < this.files.length; i++) {
      files.push(this.files.item(i));
    }
    return files;
  }

  getDateString(date: Date) {
    return new Date(date).toDateString();
  }

  prepareFiles() {
    const fileMetadata: FileMetadata[] = [];
    for (let i = 0; i < this.files.length; i++) {
      const metadata: FileMetadata = {
        name: this.files[i].name,
        size: this.files[i].size,
        type: this.files[i].type
      };
      fileMetadata.push(metadata);
    }
    const prepVm: PrepareAttachment = {
      uploadedBy: localStorage.getItem('currentUserFirstName') + ' ' + localStorage.getItem('currentUserLastName'),
      uploaderId: localStorage.getItem('currentUserId'),
      itemId: this.id,
      files: fileMetadata
    };
    this.attachmentsService.prepareUpload(prepVm).subscribe(
      resp => this.handleFilePrepSuccess(resp),
      err => this.handleFilePrepFailure(err)
    );
  }
  handleFilePrepFailure(err: any): void {
    console.error(err);
  }
  handleFilePrepSuccess(resp: PreparedAttachment): void {
    const a = this.uploadFiles(resp).then(
      success => {
        this.attachmentsService.updateAttachmentAdded();
        Swal.fire({
          title: 'Success',
          text: 'Successfully added attachments',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(clicked => {
          this.resetModal();
          this.setModalVisbility(false);
        });
      }
    ).catch(err => {
      Swal.fire({
        title: 'Error',
        text: 'Failed to add attachments',
        icon: 'success',
        confirmButtonText: 'Ok',
      }).then(clicked => {
        this.resetModal();
        this.setModalVisbility(false);
      });
    });
    console.log(a);
  }

  setModalVisbility(visible: boolean) {
    this.modalService.setVisibilityStatus(visible);
  }

  async uploadFiles(files: PreparedAttachment) {
    for (let i = 0; i < files.files.length; i++) {
      const currentMetadata = files.files[i];
      const pipeline = newPipeline(new AnonymousCredential());
      const url = `https://managrattachments.blob.core.windows.net/managr/${currentMetadata.id}`;
      const blockBlobClient = new BlockBlobClient(
        `${url}${files.sasToken}`, pipeline
      );

      const currentFile = this.files[i];
      await blockBlobClient.uploadBrowserData(currentFile, {
        maxSingleShotSize: 4 * 1024 * 1024
      }).then(
        done => {
          const updateAttachment: UpdateAttachment = {
            id: currentMetadata.id,
            status: 2
          };
          this.attachmentsService.updateAttachmentStatus(updateAttachment).subscribe(resp => {

          });
        }
      ).catch(
        err => {
          const updateAttachment: UpdateAttachment = {
            id: currentMetadata.id,
            status: 3
          };
          this.attachmentsService.updateAttachmentStatus(updateAttachment).subscribe(resp => console.log('errored'));
        }
      );
    }
  }

  resetModal(): void {
    this.fileInput.nativeElement.value = '';
    this.files = undefined;
    this.filesSelected = false;
  }
}
