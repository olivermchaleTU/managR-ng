import { Component, OnInit, OnDestroy } from '@angular/core';
import { IconDefinition, faPlus, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from 'src/app/services/modal/modal.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-toolbar',
  templateUrl: './board-toolbar.component.html',
  styleUrls: ['./board-toolbar.component.css']
})
export class BoardToolbarComponent implements OnInit, OnDestroy {

  faPlus: IconDefinition = faPlus;
  faChartLine: IconDefinition = faChartLine;
  $modalSubscription: Subscription;
  visible = false;

  constructor(
    private modalService: ModalService,
    private router: Router
    ) { }

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

  navigateToAnalytics() {
    const boardId = localStorage.getItem('boardId');
    this.router.navigate(['/analytics', boardId])
  }

}
