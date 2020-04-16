import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserShort, UserDetailVm } from 'src/app/utils/types/AuthTypes';
import { debounceTime, distinct, distinctUntilChanged, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private authBaseUrl = `${environment.authServiceBaseUrl}`;
  constructor(private http: HttpClient) { }

  searchUsers(searchQuery: string) {
    return this.http.get<UserShort[]>(`${this.authBaseUrl}/users/searchForUser?searchQuery=${searchQuery}`).pipe(
      map(response => response)
    );
  }

  getUser(id: string) {
    return this.http.get<UserDetailVm>(`${this.authBaseUrl}/users/getUser?id=${id}`);
  }
}
