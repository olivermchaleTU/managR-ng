import { Component, OnInit, OnDestroy } from '@angular/core';
import { BoardService } from 'src/app/services/board/board.service';
import { BoardResponse, BoardStory } from 'src/app/utils/types/BoardTypes';
import { faSpinner, faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal/modal.service';
import { AgileItemsService } from 'src/app/services/agile-items/agile-items.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  stories: BoardStory[];
  boardResponse = false;
  faSpinner: IconDefinition = faSpinner;
  faPlus: IconDefinition = faPlus;
  $boardSubscription: Subscription;
  $agileItemCreatedSubscription: Subscription;
  boardId: string;

  constructor(
    private boardService: BoardService,
    private agileItemsService: AgileItemsService
  ) { }

  ngOnInit(): void {
    this.boardId = localStorage.getItem('boardId');
    this.setSubscriptions();
    this.boardService.getBoardById(this.boardId)
      .subscribe(
        resp => this.handleBoardResponse(resp),
        err => this.handleBoardError(err)
      );
  }

  setSubscriptions() {
    this.$boardSubscription = this.boardService.getBoardById(this.boardId)
      .subscribe(
        resp => this.handleBoardResponse(resp),
        err => this.handleBoardError(err)
      );
    this.$agileItemCreatedSubscription = this.agileItemsService.getCreatedStories()
      .subscribe(
        created => this.getBoardData()
      );
  }

  getBoardData() {
    this.$boardSubscription = this.boardService.getBoardById('dbb831c6-67da-4e92-bdc4-d2f748efad20')
    .subscribe(
      resp => this.handleBoardResponse(resp),
      err => this.handleBoardError(err)
    );
  }
  handleBoardResponse(resp: BoardResponse): void {
    this.boardResponse = true;
    this.stories = resp.stories;
  }

  handleBoardError(err: any): void {
    console.error(err);
  }

  ngOnDestroy(): void {
    if (this.$boardSubscription) {
      this.$boardSubscription.unsubscribe();
    }
  }

}
