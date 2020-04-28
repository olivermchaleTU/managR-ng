import { Component, OnInit, Input } from '@angular/core';
import { BoardStory, BoardTask } from 'src/app/utils/types/BoardTypes';
import { moveItemInArray, CdkDragDrop, transferArrayItem, CdkDragEnter, CdkDragExit } from '@angular/cdk/drag-drop';
import { faEye, faEyeSlash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AgileItemsService } from 'src/app/services/agile-items/agile-items.service';
import { Router } from '@angular/router';
import { ItemUtilityService } from 'src/app/services/item-utility/item-utility.service';

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
    private agileItemsService: AgileItemsService,
    private itemUtilityService: ItemUtilityService,
    private router: Router
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

  async updateStatusStyling($event: CdkDragDrop<BoardTask[]>) {
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
        const blocked = await this.agileItemsService.getBlockedReason();
        if (blocked != null) {
          movedItem.blockedReason = blocked;
          movedItem.status = 2;
        } else {
          transferArrayItem($event.container.data,
            $event.previousContainer.data,
            $event.currentIndex,
            $event.previousIndex);
        }
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

  toggleStoryVisiblity() {
    this.tasksVisible = !this.tasksVisible;
  }

  navigateToItem(item: BoardTask) {
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/details', item.id]);
  }

  getStatusClass(status: number) {
    return this.itemUtilityService.getStatusClass(status);
  }

  getPriorityClass(priority: number) {
    return this.itemUtilityService.getPriorityClass(priority);
  }

  getPriorityTag(priority: number) {
    return this.itemUtilityService.getPriorityTag(priority);
  }

}
