import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PrepareAttachment, PreparedAttachment, Attachment, UpdateAttachment } from 'src/app/utils/types/AttachmentTypes';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttachmentsService {

  private attachmentAdded = new Subject<any>();
  private baseUrl = `${environment.attachmentsServiceBaseUrl}`;
  constructor(private http: HttpClient) { }

  prepareUpload(files: PrepareAttachment) {
    return this.http.post<PreparedAttachment>(`${this.baseUrl}attachments/prepareAttachments`, files);
  }

  getAttachments(id: string) {
    return this.http.get<Attachment[]>(`${this.baseUrl}attachments/getAttachments?id=${id}`);
  }

  updateAttachmentStatus(attachment: UpdateAttachment) {
    return this.http.post<boolean>(`${this.baseUrl}attachments/updateAttachmentStatus`, attachment);
  }

  // Emits when an attachment has been added
  updateAttachmentAdded() {
    this.attachmentAdded.next();
  }

  // Internal subscription to update current attachment list whenever a new attachment has been added
  getAddedAttachment(): Observable<any> {
    return this.attachmentAdded.asObservable();
  }

}
