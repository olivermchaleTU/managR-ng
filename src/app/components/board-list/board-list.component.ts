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
  faEye: IconDefinition = faEye;
  faEyeSlash: IconDefinition = faEyeSlash;

  constructor() { }

  ngOnInit() {
  }

  itemDropped($event: CdkDragDrop<string[]>) {

    this.dropListExited($event);

    if ($event.previousContainer === $event.container) {
      moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
    } else {
      transferArrayItem($event.previousContainer.data,
                        $event.container.data,
                        $event.previousIndex,
                        $event.currentIndex);
    }
  }

  dropListEntered($event: CdkDragEnter) {
    console.log('entered');
    // switch ($event.container.id) {
    //   case 'todo':
    //       this.story.todo.dragged = true;
    //       break;
    //   case 'progress':
    //       this.progress.dragged = true;
    //       break;
    //   case 'done':
    //       this.done.dragged = true;
    //       break;
    //   default:
    //       break;
    // }
  }

  dropListExited($event: CdkDragExit) {
    console.log('exited');
    // switch ($event.container.id) {
    //   case 'todo':
    //       this.todo.dragged = false;
    //       break;
    //   case 'progress':
    //       this.progress.dragged = false;
    //       break;
    //   case 'done':
    //       this.done.dragged = false;
    //       break;
    //   default:
    //       break;
    // }
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

  toggleStoryVisiblity() {
    this.tasksVisible = !this.tasksVisible;
  }

}
