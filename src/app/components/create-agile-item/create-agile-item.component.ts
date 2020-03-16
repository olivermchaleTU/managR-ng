import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { IconDefinition, faSpinner, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { BoardService } from 'src/app/services/board/board.service';
import { BoardName } from 'src/app/utils/types/BoardTypes';

@Component({
  selector: 'app-create-agile-item',
  templateUrl: './create-agile-item.component.html',
  styleUrls: ['./create-agile-item.component.css']
})
export class CreateAgileItemComponent implements OnInit {

  createItemForm: FormGroup;
  model;
  boards: BoardName[];
  loading = true;
  networkError = false;
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
    private boardService: BoardService
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
        this.networkError = true;
      }
    )
  }

  initialiseForm() {
    this.createItemForm = this.formBuilder.group({
      itemType: ['', [Validators.required]],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
      dueBy: ['', [Validators.required, this.validationService.dateValidator]],
      priority: ['', [Validators.required]],
      board: ['', [Validators.required]],
    });
  }

  log(board) {
    console.log(board);
  }

  setModalVisbility(visible: boolean) {
    this.modalService.setVisibilityStatus(visible);
  }

  submit() {
    console.log('submit form');
  }

}

