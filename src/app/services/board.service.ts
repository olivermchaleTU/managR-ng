import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private baseUrl = `${environment.storyServiceBaseUrl}`;

  constructor(private http: HttpClient) { }

  public getBoardById(id: string) {
    return this.http.get(`${this.baseUrl}board/getBoard?id=${id}`);
  }

}
