import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AttachmentsService } from 'src/app/services/attachments/attachments.service';
import { Subscription } from 'rxjs';
import { PrepareAttachment, FileMetadata, PreparedAttachment } from 'src/app/utils/types/AttachmentTypes';
import {
  AnonymousCredential,
  BaseRequestPolicy,
  newPipeline,
  BlockBlobClient
} from "@azure/storage-blob";
import { ActivatedRoute } from '@angular/router';


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

  constructor(
    private activatedRoute: ActivatedRoute,
    private attachmentsService: AttachmentsService
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
    this.uploadFiles(resp);
  }

  async uploadFiles(files: PreparedAttachment) {
    const file = files.files[0];
    // https://managrattachments.blob.core.windows.net/managr
    const pipeline = newPipeline(new AnonymousCredential());
    const url = `https://managrattachments.blob.core.windows.net/managr/${file.id}`;
    const blockBlobClient = new BlockBlobClient(
      `${url}${files.sasToken}`, pipeline
    );

    const fileupload = this.files[0];
    await blockBlobClient.uploadBrowserData(fileupload, {
      maxSingleShotSize: 4 * 1024 * 1024
    });
  }

    // async uploadFiles(files: PreparedAttachment) {
  //   const file = files.files[0];
  //   const sas = '?sv=2019-02-02&ss=b&srt=sco&sp=rwdlac&se=2020-04-13T21:12:21Z&st=2020-04-13T13:12:21Z&spr=https&sig=wQmGLlBtSyT%2Frv8F0%2FT1R93s3Z6bO%2Fa5ZNJObqdpaVk%3D';
  //   // https://managrattachments.blob.core.windows.net/managr
  //   const pipeline = newPipeline(new AnonymousCredential());
  //   const url = `https://managrattachments.blob.core.windows.net/managr/${file.id}`;
  //   const blockBlobClient = new BlockBlobClient(
  //     `${url}${sas}`, pipeline
  //   );

  //   const fileupload = this.files[0];
  //   await blockBlobClient.uploadBrowserData(fileupload, {
  //     maxSingleShotSize: 4 * 1024 * 1024
  //   });
  // }
}
