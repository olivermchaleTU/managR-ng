import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'managR';

  ngOnInit() {
    localStorage.setItem('boardId', 'dbb831c6-67da-4e92-bdc4-d2f748efad20');
  }
}
