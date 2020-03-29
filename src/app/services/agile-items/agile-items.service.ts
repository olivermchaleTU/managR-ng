import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AgileItemShort, CreateAgileItem } from 'src/app/utils/types/AgileItemTypes';
import { map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { BoardTask } from 'src/app/utils/types/BoardTypes';

@Injectable({
  providedIn: 'root'
})
export class AgileItemsService {
  private baseUrl = `${environment.storyServiceBaseUrl}`;
  constructor(private http: HttpClient) { }

  private storyCreated = new Subject<any>();

  searchForAgileItem(itemType: number, searchQuery: string, boardId: string) {
    // subtract one from itemType to get parent type
    itemType--;
    return this.http.get<AgileItemShort[]>
      (`${this.baseUrl}agileItems/searchAgileItems?itemType=${itemType}&boardId=${boardId}&searchQuery=${searchQuery}`).pipe(
      map(response => response)
    );
  }

  createAgileItem(itemDetails: CreateAgileItem) {
    return this.http.post<CreateAgileItem>(`${this.baseUrl}agileItems/createAgileItem`, itemDetails);
  }

  updateAgileItem(item: BoardTask) {
    return this.http.post<BoardTask>(`${this.baseUrl}agileItems/updateAgileItem`, item);
  }

  // Emits when a story has been created
  updateStoryCreated() {
    this.storyCreated.next();
  }

  // Internal subscription to update current story list whenever a new story has been created
  getCreatedStories(): Observable<any> {
    return this.storyCreated.asObservable();
  }

}
