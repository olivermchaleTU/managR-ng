import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { CreateComment, ItemComment } from 'src/app/utils/types/CommentTypes';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private commentsBaseUrl = `${environment.commentsServiceBaseUrl}`;
  private commentCreated = new Subject<any>();
  constructor(
    private http: HttpClient
  ) { }

  addComment(comment: CreateComment): Observable<any> {
    return this.http.post<CreateComment>(`${this.commentsBaseUrl}comments/createComment`, comment);
  }

  getComments(id: string): Observable<any> {
    return this.http.get<ItemComment>(`${this.commentsBaseUrl}comments/getComments?id=${id}`);
  }

    // Emits when a comment has been created
    updateCommentCreated() {
      this.commentCreated.next();
    }

    // Internal subscription to update current comment list whenever a new comment has been created
    getCreatedComment(): Observable<any> {
      return this.commentCreated.asObservable();
    }
}
