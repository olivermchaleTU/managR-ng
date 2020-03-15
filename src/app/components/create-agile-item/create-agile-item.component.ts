import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-create-agile-item',
  templateUrl: './create-agile-item.component.html',
  styleUrls: ['./create-agile-item.component.css']
})
export class CreateAgileItemComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  setModalVisbility(visible: boolean) {
    this.modalService.setVisibilityStatus(visible);
  }

}
