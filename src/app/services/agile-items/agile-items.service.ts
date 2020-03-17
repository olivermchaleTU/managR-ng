import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AgileItemShort } from 'src/app/utils/types/AgileItemTypes';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AgileItemsService {
  private baseUrl = `${environment.storyServiceBaseUrl}`;
  constructor(private http: HttpClient) { }

  searchForAgileItem(itemType: number, searchQuery: string) {
    // subtract one from itemType to get parent type
    itemType--;
    return this.http.get<AgileItemShort[]>
      (`${this.baseUrl}agileItems/searchAgileItems?itemType=${itemType}&searchQuery=${searchQuery}`).pipe(
      map(response => response)
    );
  }

}
