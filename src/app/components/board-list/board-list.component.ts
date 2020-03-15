import { Component, OnInit, Input } from '@angular/core';
import { BoardStory, BoardTask } from 'src/app/utils/types/BoardTypes';
import { moveItemInArray, CdkDragDrop, transferArrayItem, CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { faEye, faEyeSlash, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {

  @Input() story: BoardStory;
  tasksVisible = true;
  dragging = false;
  faEye: IconDefinition = faEye;
  faEyeSlash: IconDefinition = faEyeSlash;

  constructor() { }

  ngOnInit() {
  }

  itemDropped($event: CdkDragDrop<string[]>) {
    if ($event.previousContainer === $event.container) {
      moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
    } else {
      transferArrayItem($event.previousContainer.data,
                        $event.container.data,
                        $event.previousIndex,
                        $event.currentIndex);
    }
  }

  getStatusClass(item: BoardTask) {
    switch (item.status) {
      case 0:
        return 'border-purple';
      case 1:
        return 'border-orange';
      case 2:
        return 'border-red';
      case 3:
        return 'border-green';
      default:
        return 'border-purple';
    }
  }

  getPriorityTag(item: BoardTask) {
    switch (item.priority) {
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

  getPriorityClass(item: BoardTask) {
    switch (item.priority) {
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

  toggleStoryVisiblity() {
    this.tasksVisible = !this.tasksVisible;
  }

}
