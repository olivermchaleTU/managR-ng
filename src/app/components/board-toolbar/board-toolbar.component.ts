import { Component, OnInit } from '@angular/core';
import { IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-board-toolbar',
  templateUrl: './board-toolbar.component.html',
  styleUrls: ['./board-toolbar.component.css']
})
export class BoardToolbarComponent implements OnInit {

  faPlus: IconDefinition = faPlus;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  setModalVisbility(visible: boolean) {
    this.modalService.setVisibilityStatus(visible);
  }

}
