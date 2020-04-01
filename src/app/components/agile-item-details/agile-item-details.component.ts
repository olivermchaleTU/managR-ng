import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgileItemsService } from 'src/app/services/agile-items/agile-items.service';
import Swal from 'sweetalert2';
import { IconDefinition, faSpinner, faChevronRight, } from '@fortawesome/free-solid-svg-icons';
import { AgileItem } from 'src/app/utils/types/AgileItemTypes';
import { ItemUtilityService } from 'src/app/services/item-utility/item-utility.service';

@Component({
  selector: 'app-agile-item-details',
  templateUrl: './agile-item-details.component.html',
  styleUrls: ['./agile-item-details.component.css']
})
export class AgileItemDetailsComponent implements OnInit, OnDestroy {

  id: string = null;
  loading = true;
  item: AgileItem;
  $agileItemDetails: Subscription;
  $routeParams: Subscription;
  faSpinner: IconDefinition = faSpinner;
  faChevronRight: IconDefinition = faChevronRight;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private agileItemsService: AgileItemsService,
    private itemUtilityService: ItemUtilityService
    ) { }

  ngOnInit() {
    this.$routeParams = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.getAgileItemDetails();
    });
  }

  getAgileItemDetails() {
    this.$agileItemDetails = this.agileItemsService.getFullAgileItem(this.id).subscribe(
      resp => this.handleItemResponse(resp),
      err => this.handleItemFailure(err)
    );
  }

  handleItemResponse(resp) {
    this.loading = false;
    this.item = resp;
    console.log(resp);
  }

  handleItemFailure(err) {
    this.loading = false;
    Swal.fire({
      title: 'Error',
      text: 'Failed to get agile item' + err,
      icon: 'error',
      confirmButtonText: 'Ok',
    }).then((clicked) => {
      this.router.navigate(['/board']);
    });
  }

  getStatusClass(status: number, isBadge = true) {
    return this.itemUtilityService.getStatusClass(status, isBadge);
  }

  getStatusText(status: number) {
    return this.itemUtilityService.getStatusText(status);
  }

  getPriorityClass(priority: number) {
    return this.itemUtilityService.getPriorityClass(priority);
  }

  getPriorityTag(priority: number) {
    return this.itemUtilityService.getPriorityTag(priority);
  }

  getType(itemType: number) {
    return this.itemUtilityService.getTypeText(itemType);
  }

  getDateString(date: Date) {
    return new Date(date).toDateString();
  }

  getOverviewTitle(itemType: number) {
    return this.itemUtilityService.getOverviewTitle(itemType);
  }

  getProgressText(itemType: number, complete = false): string {
    let text = 'Total ';
    if (complete) {
      text = 'Complete ';
    }
    itemType === 1 ? text += 'Tasks' : text += 'Stories';
    return text;
  }

  ngOnDestroy(): void {
    if (this.$agileItemDetails) {
      this.$agileItemDetails.unsubscribe();
    }
    if (this.$routeParams) {
      this.$routeParams.unsubscribe();
    }
  }

}
