import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { isRegExp } from 'util';
import { IconDefinition, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ItemComment } from 'src/app/utils/types/CommentTypes';

@Component({
  selector: 'app-agile-item-comments',
  templateUrl: './agile-item-comments.component.html',
  styleUrls: ['./agile-item-comments.component.css']
})
export class AgileItemCommentsComponent implements OnInit, OnDestroy {

  @Input() id: string;
  $routeParams: Subscription;
  $commentsSub: Subscription;
  $commentCreatedSub: Subscription;
  noComments = false;
  commentsLoading = true;
  commentsErrored = false;
  comments: ItemComment[];
  faSpinner: IconDefinition = faSpinner;
  constructor(
    private activatedRoute: ActivatedRoute,
    private commentsService: CommentsService
  ) { }

  ngOnInit() {
    this.$routeParams = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.getComments();
    });
    this.setSubscriptions();
  }

  setSubscriptions() {
    this.$commentCreatedSub = this.commentsService.getCreatedComment().subscribe(created => {
      this.getComments();
    });
  }

  getComments() {
    this.$commentsSub = this.commentsService.getComments(this.id).subscribe(
      resp => {
        this.commentsLoading = false;
        if (resp === []) {
          this.noComments = true;
        } else {
          this.comments = resp;
        }
        console.log(resp);
      },
      err => {
        this.commentsErrored = true;
        console.log(err);
      });
  }

  ngOnDestroy(): void {
    if (this.$routeParams) {
      this.$routeParams.unsubscribe();
    }
  }

  getDateString(date: Date) {
    return new Date(date).toDateString();
  }

}
