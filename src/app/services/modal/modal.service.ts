import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private visibilityStatus = new Subject<any>();

  setVisibilityStatus(visibility: boolean) {
    this.visibilityStatus.next({ visible: visibility});
  }

  getVisibilityStatus(): Observable<any> {
    return this.visibilityStatus.asObservable();
  }

  constructor() { }
}
