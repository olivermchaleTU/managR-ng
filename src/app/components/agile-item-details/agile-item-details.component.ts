import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgileItemsService } from 'src/app/services/agile-items/agile-items.service';
import Swal from 'sweetalert2';
import { IconDefinition, faSpinner, faChevronRight, } from '@fortawesome/free-solid-svg-icons';
import { AgileItem } from 'src/app/utils/types/AgileItemTypes';

@Component({
  selector: 'app-agile-item-details',
  templateUrl: './agile-item-details.component.html',
  styleUrls: ['./agile-item-details.component.css']
})
export class AgileItemDetailsComponent implements OnInit, OnDestroy {

  id: string;
  loading = true;
  item: AgileItem;
  $agileItemDetails: Subscription;
  faSpinner: IconDefinition = faSpinner;
  faChevronRight: IconDefinition = faChevronRight;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private agileItemsService: AgileItemsService
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
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


  ngOnDestroy(): void {
    if (this.$agileItemDetails) {
      this.$agileItemDetails.unsubscribe();
    }
  }

}
