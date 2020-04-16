import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { IconDefinition, faSpinner, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { BoardService } from 'src/app/services/board/board.service';
import { BoardName } from 'src/app/utils/types/BoardTypes';
import { UsersService } from 'src/app/services/users/users.service';
import { UserShort } from 'src/app/utils/types/AuthTypes';
import { Observable, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { AgileItemsService } from 'src/app/services/agile-items/agile-items.service';
import Swal from 'sweetalert2';
import { CreateAgileItem } from 'src/app/utils/types/AgileItemTypes';

@Component({
  selector: 'app-create-agile-item',
  templateUrl: './create-agile-item.component.html',
  styleUrls: ['./create-agile-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateAgileItemComponent implements OnInit, OnDestroy {

  createItemForm: FormGroup;
  $agileItemsSubscription: Subscription;
  $boardSubscription: Subscription;
  model;
  userModel;
  superStoryModel;
  storyModel;
  selectModel;
  order = 999;
  boards: BoardName[];
  users: UserShort[];
  formRendered = false;
  creating = false;
  loading = true;
  searching = false;
  boardError = false;
  usersError = false;
  superStoryAdded = false;
  selectedItemType: number;
  stories: any;
  selectedStory: any;
  faSpinner: IconDefinition = faSpinner;
  faCalendar: IconDefinition = faCalendar;
  itemTypes = [
    {
      text: 'Super Story',
      value: 0
    },
    {
      text: 'Story',
      value: 1
    },
    {
      text: 'Task',
      value: 2
    }
  ];
  priorityTypes = [
    {
      text: 'Low',
      value: 0,
    },
    {
      text: 'Medium',
      value: '1'
    },
    {
      text: 'High',
      value: '2'
    }
  ];

  constructor(
    private modalService: ModalService,
    private validationService: ValidationService,
    private formBuilder: FormBuilder,
    private boardService: BoardService,
    private usersService: UsersService,
    private agileItemsService: AgileItemsService
  ) { }

  ngOnInit() {
    this.getData();
    this.initialiseForm();
  }

  get form() {
    return this.createItemForm.controls;
  }

  getData() {
    this.$boardSubscription = this.boardService.getBoardNames().subscribe(
      resp => {
        this.boards = resp.boardNames;
        this.loading = false;
      },
      err => {
        this.loading = false;
        this.boardError = true;
      }
    );
  }

  typeSelected($event) {
    this.selectedItemType = +$event.target.value;
    this.getAdditionalItems();
  }

  initialiseForm() {
    this.createItemForm = this.formBuilder.group({
      itemType: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      dueBy: ['', [Validators.required, this.validationService.dateValidator]],
      priority: ['', [Validators.required]],
      board: ['', [Validators.required]],
      assignee: ['', [Validators.required]],
    });
    this.formRendered = true;
  }

  // todo: remove controls when switched
  getAdditionalItems() {
    switch (this.selectedItemType) {
      case 0:
        break;
      case 1:
        this.createItemForm.addControl('superStory', new FormControl('', [Validators.required]));
        this.createItemForm.addControl('storyPoints', new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]));
        this.createItemForm.updateValueAndValidity();
        break;
      case 2:
        this.createItemForm.addControl('story', new FormControl('', [Validators.required]));
        this.createItemForm.addControl('order', new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]));
        this.createItemForm.addControl('estimatedTime', new FormControl('', [Validators.required, Validators.pattern('^[0-9]+$')]));
        this.createItemForm.updateValueAndValidity();
        break;
    }
  }

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

  searchForAgileItem = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this.agileItemsService.searchForAgileItem(this.selectedItemType, term, localStorage.getItem('boardId')).pipe(
          tap(() => this.usersError = false),
          catchError(() => {
            this.usersError = true;
            return of([]);
          }))
      ),
      tap((res) => {
        this.searching = false;
        if (this.selectedItemType === 2) {
          this.stories = res;
        }
      })
    )

  userResultFormatter = (x: { name: string }) => x.name;
  agileItemResultFormatter = (x: { title: string }) => x.title;

  setModalVisbility(visible: boolean) {
    this.modalService.setVisibilityStatus(visible);
  }

  submit() {
    // create date outside of itemDetails declaration...
    const dueBy = this.createItemForm.get('dueBy').value;
    const date = new Date(dueBy.year, dueBy.month - 1, dueBy.day);

    const itemDetails: CreateAgileItem = {
      itemType: this.createItemForm.get('itemType').value,
      title: this.createItemForm.get('title').value,
      description: this.createItemForm.get('description').value,
      dueBy: date,
      priority: this.createItemForm.get('priority').value,
      board: this.createItemForm.get('board').value,
      assigneeId: this.createItemForm.get('assignee').value.id,
      assigneeName: this.createItemForm.get('assignee').value.name,
      createdBy: localStorage.getItem('currentUserId')
    };

    // add additional items depending on story or task being created
    if (this.selectedItemType === 1) {
      itemDetails.parentId = this.createItemForm.get('superStory').value.id;
      itemDetails.storyPoints = this.createItemForm.get('storyPoints').value;
    } else if (this.selectedItemType === 2) {
      itemDetails.parentId = this.createItemForm.get('story').value.id;
      itemDetails.order = this.createItemForm.get('order').value;
      itemDetails.estimatedTime = this.createItemForm.get('estimatedTime').value;
    }

    // send the request through to the agile item service
    this.$agileItemsSubscription = this.agileItemsService.createAgileItem(itemDetails).subscribe(
      resp => this.handleCreateSuccess(resp),
      err => this.handleCreateError(err)
    );
  }

  handleCreateSuccess(resp) {
    this.creating = false;
    this.agileItemsService.updateStoryCreated();
    Swal.fire({
      title: 'Success!',
      text: 'Successfully created agile item',
      icon: 'success',
      confirmButtonText: 'Ok',
    }).then((clicked) => {
      this.modalService.setVisibilityStatus(false);
    });
  }

  handleCreateError(err) {
    this.creating = false;
    Swal.fire({
      title: 'Error',
      text: 'Failed to create agile item' + err,
      icon: 'error',
      confirmButtonText: 'Ok',
    }).then((clicked) => {
      this.modalService.setVisibilityStatus(false)
    });
  }

  getOrderPlaceholder() {
    if (this.selectedStory === null || this.selectedStory === undefined) {
      return '';
    } else {
      return (`Suggested value: ${this.selectedStory.order + 1}`);
    }
  }

  setOrderValidator(storyTitle) {
    if (this.stories) {
      this.selectedStory = this.stories.find(x => x.title === storyTitle);
      const order = this.selectedStory.order;
      this.createItemForm.controls.order.setValidators(
        [Validators.required, Validators.min(order + 1), Validators.max(order + 1), Validators.pattern('^[0-9]+$')]
      );
    }
  }

  ngOnDestroy() {
    console.log('destroy create agile items component');
    if (this.$agileItemsSubscription) {
      this.$agileItemsSubscription.unsubscribe();
    }
    if (this.$boardSubscription) {
      this.$boardSubscription.unsubscribe();
    }
  }


}

