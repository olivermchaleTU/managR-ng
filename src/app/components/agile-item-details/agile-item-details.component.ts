import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Observable, of } from 'rxjs';
import { AgileItemsService } from 'src/app/services/agile-items/agile-items.service';
import Swal from 'sweetalert2';
import { IconDefinition, faSpinner, faChevronRight,
  faCaretDown, faPencilAlt, faPlus, faCalendarAlt, } from '@fortawesome/free-solid-svg-icons';
import { AgileItem } from 'src/app/utils/types/AgileItemTypes';
import { ItemUtilityService } from 'src/app/services/item-utility/item-utility.service';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users/users.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from 'src/app/services/modal/modal.service';

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
  faCaretDown: IconDefinition = faCaretDown;
  faPencil: IconDefinition = faPencilAlt;
  faPlus: IconDefinition = faPlus;
  faCalendar: IconDefinition = faCalendarAlt;
  editAssignee = false;
  editTitle = false;
  editDescription = false;
  editDueBy = false;
  searching = false;
  usersError = false;
  loggingTime = false;
  attachmentsOpen = false;
  userModel: any;
  dateModel: any;
  initialItem: AgileItem;
  timeToAdd: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private agileItemsService: AgileItemsService,
    private usersService: UsersService,
    private itemUtilityService: ItemUtilityService,
    private modalService: ModalService
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

  setModalVisbility(visible: boolean) {
    this.modalService.setVisibilityStatus(visible);
  }

  handleItemResponse(resp) {
    this.loading = false;
    this.item = resp;
    // hack to avoid reference to same value...
    this.initialItem = JSON.parse(JSON.stringify(resp));
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

  userResultFormatter = (x: { name: string }) => x.name;

  searchForUser = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => this.searching = true),
    switchMap(term =>
      this.usersService.searchUsers(term).pipe(
        tap(() => this.usersError = false),
        catchError(() => {
          this.usersError = true;
          return of([]);
        }))
    ),
    tap(() => this.searching = false)
  )

  assigneeSelected(assignee) {
    this.item.assigneeId = assignee.id;
    this.item.assigneeName = assignee.name;
    this.editAssignee = false;
    this.saveGenericChange();
  }

  dateChanged($event: NgbDate) {
    const date = new Date($event.year, $event.month - 1, $event.day);
    this.item.dueBy = date;
    this.editDueBy = false;
    this.saveGenericChange();
  }

  updatePriority(priority: number) {
    this.item.priority = priority;
    this.saveGenericChange();
  }

  async updateStatus(status: number) {
    if (status === 2) {
      const reason = await this.agileItemsService.getBlockedReason();
      if (reason != null) {
        this.item.blockedReason = reason;
      } else {
        return;
      }
    }
    this.item.status = status;
    this.saveGenericChange();
  }

  addTime() {
    if (this.timeToAdd != null && this.timeToAdd !== undefined) {
      this.item.loggedTime += +this.timeToAdd;
      this.saveGenericChange();
    }
  }

  ngOnDestroy(): void {
    if (this.$agileItemDetails) {
      this.$agileItemDetails.unsubscribe();
    }
    if (this.$routeParams) {
      this.$routeParams.unsubscribe();
    }
  }

  getTitle(item: AgileItem) {
    if (item.blockedReason) {
      return item.blockedReason;
    }
    return this.getStatusText(item.status);
  }

  saveGenericChange() {
    this.agileItemsService.updateFullAgileItem(this.item).subscribe(
    resp => {
      this.initialItem = JSON.parse(JSON.stringify(this.item));
      console.log(resp);
    },
    err => {
      console.log(err);
    });
  }

}
