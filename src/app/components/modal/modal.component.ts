import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  public visible = false;
  public visibleAnimate = false;
  private $modalSubscription: Subscription;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.setSubscriptions();
  }

  setSubscriptions() {
    this.$modalSubscription = this.modalService.getVisibilityStatus().subscribe(resp => {
      resp.visible ? this.show() : this.hide();
    });
  }

  public show(): void {
    this.visible = true;
    setTimeout(() => this.visibleAnimate = true, 100);
  }

  public hide(): void {
    this.visibleAnimate = false;
    setTimeout(() => this.visible = false, 300);
  }

  public onContainerClicked(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.hide();
    }
  }

  ngOnDestroy() {
    this.$modalSubscription.unsubscribe();
  }

}
