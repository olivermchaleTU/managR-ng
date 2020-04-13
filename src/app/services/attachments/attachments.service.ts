import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PrepareAttachment, PreparedAttachment, Attachment } from 'src/app/utils/types/AttachmentTypes';

@Injectable({
  providedIn: 'root'
})
export class AttachmentsService {

  private baseUrl = `${environment.attachmentsServiceBaseUrl}`;
  constructor(private http: HttpClient) { }

  prepareUpload(files: PrepareAttachment) {
    return this.http.post<PreparedAttachment>(`${this.baseUrl}attachments/prepareAttachments`, files);
  }

  getAttachments(id: string) {
    return this.http.get<Attachment[]>(`${this.baseUrl}attachments/getAttachments?id=${id}`);
  }

}
