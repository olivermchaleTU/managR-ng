import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { IconDefinition, faSpinner, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { BoardService } from 'src/app/services/board/board.service';
import { BoardName } from 'src/app/utils/types/BoardTypes';
import { UsersService } from 'src/app/services/users/users.service';
import { UserShort } from 'src/app/utils/types/AuthTypes';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-create-agile-item',
  templateUrl: './create-agile-item.component.html',
  styleUrls: ['./create-agile-item.component.css']
})
export class CreateAgileItemComponent implements OnInit {

  createItemForm: FormGroup;
  model;
  userModel;
  boards: BoardName[];
  users: UserShort[];
  loading = true;
  searching = false;
  boardError = false;
  usersError = false;
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
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.getData();
    this.initialiseForm();
  }

  get form() {
    return this.createItemForm.controls;
  }

  getData() {
    this.boardService.getBoardNames().subscribe(
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

  initialiseForm() {
    this.createItemForm = this.formBuilder.group({
      itemType: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      dueBy: ['', [Validators.required, this.validationService.dateValidator]],
      priority: ['', [Validators.required]],
      board: ['', [Validators.required]],
      assignee: ['', [Validators.required]]
    });
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

  userResultFormatter = (x: {name: string}) => x.name;

  setModalVisbility(visible: boolean) {
    this.modalService.setVisibilityStatus(visible);
  }

  submit() {
    console.log('submit form');
  }

}

