import { Component, OnInit, Input } from '@angular/core';
import { BoardStory } from 'src/app/utils/types/BoardTypes';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.css']
})
export class BoardListComponent implements OnInit {

  @Input() story: BoardStory;
  constructor() { }

  ngOnInit() {
  }

}
