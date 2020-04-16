import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AgileItemsService } from 'src/app/services/agile-items/agile-items.service';
import { Subscription } from 'rxjs';
import { IconDefinition, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AgileItemOverview } from 'src/app/utils/types/AgileItemTypes';
import { ItemUtilityService } from 'src/app/services/item-utility/item-utility.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-related-item-overview',
  templateUrl: './related-item-overview.component.html',
  styleUrls: ['./related-item-overview.component.css']
})
export class RelatedItemOverviewComponent implements OnInit, OnDestroy {

  @Input() id: string;
  $relatedItems: Subscription;
  $routeParams: Subscription;
  relatedItemFailure = false;
  loaded = false;
  loadingFailed = false;
  faSpinner: IconDefinition = faSpinner;
  items: AgileItemOverview[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private agileItemsService: AgileItemsService,
    private router: Router,
    private itemUtilityService: ItemUtilityService
  ) { }

  ngOnInit() {
    this.$routeParams = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.getRelatedItems();
    });
  }

  getRelatedItems() {
    this.$relatedItems = this.agileItemsService.getRelatedItems(this.id).subscribe(
      resp => this.handleRelatedItemResponse(resp),
      err => this.handleRelatedItemFailure(err)
    );
  }

  handleRelatedItemResponse(resp) {
    console.log(resp);
    this.loaded = true;
    this.items = resp;
  }

  handleRelatedItemFailure(err) {
    this.loadingFailed = true;
    this.relatedItemFailure = true;
    console.error('error: ' + err);
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

  navigateToTask(id: string) {
    this.router.navigate(['./details', id]);
  }

  ngOnDestroy(): void {
    if (this.$routeParams) {
      this.$routeParams.unsubscribe();
    }
  }


}
