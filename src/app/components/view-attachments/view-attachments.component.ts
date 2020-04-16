import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AttachmentsService } from 'src/app/services/attachments/attachments.service';
import { Attachment } from 'src/app/utils/types/AttachmentTypes';
import { IconDefinition, faSpinner, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { BlobServiceClient } from '@azure/storage-blob';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-view-attachments',
  templateUrl: './view-attachments.component.html',
  styleUrls: ['./view-attachments.component.css']
})
export class ViewAttachmentsComponent implements OnInit {

  faSpinner: IconDefinition = faSpinner;
  faChevronDown: IconDefinition = faChevronDown;
  faChevronUp: IconDefinition = faChevronUp;
  $routeParams: Subscription;
  $attachments: Subscription;
  $attachmentsAdded: Subscription;
  id: string;
  loading = true;
  error = false;
  noAttachments = false;
  attachments: Attachment[];
  attachmentsVisible = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private attachmentsService: AttachmentsService
  ) { }

  ngOnInit() {
    this.$routeParams = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.getData();
    });
  }

  getData() {
    this.$attachments = this.attachmentsService.getAttachments(this.id).subscribe(
      resp => this.handleAttachmentsResponse(resp),
      err => this.handleAttachmentsError(err)
    );
    this.$attachmentsAdded = this.attachmentsService.getAddedAttachment().subscribe(
      added => this.getData()
    );
  }

  handleAttachmentsError(err: any): void {
    console.error(err);
    this.error = true;
    this.loading = false;
  }

  handleAttachmentsResponse(resp: Attachment[]): void {
    this.attachments = resp;
    this.loading = false;
    if (!resp.length) {
      this.noAttachments = true;
    }
  }

  getDateString(date: Date) {
    return new Date(date).toDateString();
  }

  getStatusText(status: number) {
    switch (status) {
      case 0:
        return 'Unknown';
      case 1:
        return 'Uploading';
      case 2:
        return 'Uploaded';
      case 3:
        return 'Failed';
      default:
        return 'Unknown';
    }
  }

  async downloadAttachment(i) {
    const metadata = this.attachments[i];
    const blobServiceClient = new BlobServiceClient('https://managrattachments.blob.core.windows.net');
    const containerClient = blobServiceClient.getContainerClient('managr');
    const blockBlobClient = containerClient.getBlobClient(metadata.id);
    const downloadBlockBlobResponse = await blockBlobClient.download();
    const downloaded = await this.blobToString(await downloadBlockBlobResponse.blobBody);
    saveAs(downloaded, metadata.name);
  }

  async blobToString(blob: Blob): Promise<string> {
    const fileReader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      fileReader.onloadend = (ev: any) => {
        if (ev.target !== undefined) {
          resolve(ev.target.result);
        }
      };
      fileReader.onerror = reject;
      fileReader.readAsDataURL(blob);
    });
  }
}
