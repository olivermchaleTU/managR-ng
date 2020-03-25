import { Component, OnInit, OnDestroy } from '@angular/core';
import { IconDefinition, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'src/app/services/modal/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-board-toolbar',
  templateUrl: './board-toolbar.component.html',
  styleUrls: ['./board-toolbar.component.css']
})
export class BoardToolbarComponent implements OnInit, OnDestroy {

  faPlus: IconDefinition = faPlus;
  $modalSubscription: Subscription;
  visible = false;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.setSubscriptions();
  }

  setSubscriptions() {
    this.$modalSubscription = this.modalService.getVisibilityStatus().subscribe(status => {
      this.visible = status.visible;
    });
  }

  setModalVisbility(visible: boolean) {
    this.modalService.setVisibilityStatus(visible);
  }

  ngOnDestroy() {
    this.$modalSubscription.unsubscribe();
  }

}
