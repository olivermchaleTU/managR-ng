import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

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

  handleBoardResponse(resp: any): void {
    console.log(resp);
  }

  handleBoardError(err: any): void {
    console.log(err);
  }

}
