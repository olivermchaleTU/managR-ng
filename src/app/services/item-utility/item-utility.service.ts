import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemUtilityService {

  constructor() { }

  getStatusClass(status: number, isBadge = false) {
    let cssClass = '';
    isBadge ? cssClass = 'badge' : cssClass = 'border';
    switch (status) {
      case 0:
        return cssClass += '-purple';
      case 1:
        return cssClass += '-orange';
      case 2:
        return cssClass += '-red';
      case 3:
        return cssClass += '-green';
      default:
        return cssClass += '-purple';
    }
  }

  getStatusText(status: number) {
    switch (status) {
      case 0:
        return 'Pending';
      case 1:
        return 'In Progress';
      case 2:
        return 'Blocked';
      case 3:
        return 'Complete';
      default:
        return 'Unknown';
    }
  }

  getPriorityTag(priority: number) {
    switch (priority) {
      case 0:
        return 'Low';
      case 1:
        return 'Medium';
      case 2:
        return 'High';
      default:
        return 'Unknown';
    }
  }

  getPriorityClass(priority: number) {
    switch (priority) {
      case 0:
        return 'badge-green';
      case 1:
        return 'badge-orange';
      case 2:
        return 'badge-red';
      default:
        return 'badge-purple';
    }
  }

  getTypeText(type: number) {
    switch (type) {
      case 0:
        return 'Super Story';
      case 1:
        return 'Story';
      case 2:
        return 'Task';
      default:
        return 'Unknown';
    }
  }
}
