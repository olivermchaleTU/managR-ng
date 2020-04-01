import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateComment, ItemComment } from 'src/app/utils/types/CommentTypes';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private commentsBaseUrl = `${environment.commentsServiceBaseUrl}`;
  constructor(
    private http: HttpClient
  ) { }

  addComment(comment: CreateComment): Observable<any> {
    return this.http.post<CreateComment>(`${this.commentsBaseUrl}comments/createComment`, comment);
  }

  getComments(id: string): Observable<any> {
    return this.http.get<ItemComment>(`${this.commentsBaseUrl}comments/getComments?id=${id}`);
  }
}
