import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board/board.service';
import { BoardResponse, BoardStory } from 'src/app/utils/types/BoardTypes';
import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  stories: BoardStory[];
  boardResponse = false;
  faSpinner: IconDefinition = faSpinner;

  constructor(
    private boardService: BoardService
  ) { }

  ngOnInit(): void {
    this.boardService.getBoardById('dbb831c6-67da-4e92-bdc4-d2f748efad20')
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
    console.log(err);
  }

}
