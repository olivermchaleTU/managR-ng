import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BoardResponse, BoardNameList, BoardTopology } from '../../utils/types/BoardTypes';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private baseUrl = `${environment.storyServiceBaseUrl}`;

  constructor(private http: HttpClient) { }

  public getBoardById(id: string) {
    return this.http.get<BoardResponse>(`${this.baseUrl}board/getBoard?id=${id}`);
  }

  public getBoardNames() {
    return this.http.get<BoardNameList>(`${this.baseUrl}board/getBoardNames`);
  }

  public getBoardTopology(id: string) {
    return this.http.get<BoardTopology>(`${this.baseUrl}board/getBoardTopology?id=${id}`);
  }

}
