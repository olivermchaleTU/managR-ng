import { Component, OnInit, Input } from '@angular/core';
import { BoardStory, BoardTask } from 'src/app/utils/types/BoardTypes';
import { moveItemInArray, CdkDragDrop, transferArrayItem, CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { faEye, faEyeSlash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AgileItemsService } from 'src/app/services/agile-items/agile-items.service';

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

  constructor(
    private agileItemsService: AgileItemsService
  ) { }

  ngOnInit() {
  }

  itemDropped($event: CdkDragDrop<BoardTask[]>) {
    if ($event.previousContainer === $event.container) {
      moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
    } else {
      transferArrayItem($event.previousContainer.data,
                        $event.container.data,
                        $event.previousIndex,
                        $event.currentIndex);

      this.updateStatusStyling($event);
    }
  }

  updateStatusStyling($event: CdkDragDrop<BoardTask[]>) {
    const status = ($event.container.id);
    const movedItem = this.story.tasks[status][$event.currentIndex];
    switch (status) {
      case 'todo':
        movedItem.status = 0;
        break;
      case 'inProgress':
        movedItem.status = 1;
        break;
      case 'blocked':
        movedItem.status = 2;
        break;
      case 'done':
        movedItem.status = 3;
    }
    this.updateAgileItem(movedItem);
  }

  updateAgileItem(movedItem: BoardTask) {
    this.agileItemsService.updateAgileItem(movedItem).subscribe(
    resp => {
      console.log('success' + resp);
    },
    err => {
      console.log('err' + err);
    });
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
