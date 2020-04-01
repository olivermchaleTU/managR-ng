import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CreateComment } from 'src/app/utils/types/CommentTypes';
import { CommentsService } from 'src/app/services/comments/comments.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit, OnDestroy {

  @Input() id: string;
  $createComment: Subscription;
  commentModel: string;
  $routeParams: Subscription;

  constructor(
    private commentsService: CommentsService,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.$routeParams = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
    });
  }

  addComment() {
    const comment: CreateComment = {
      agileItemId: this.id,
      comment: this.commentModel,
      commenterId: localStorage.getItem('currentUserId'),
    };

    this.commentsService.addComment(comment).subscribe(resp => {
      this.commentsService.updateCommentCreated();
      Swal.fire({
        title: 'Success',
        text: 'Successfully added comment',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    },
    err => {
      Swal.fire({
        title: 'Error',
        text: 'Failed to add comment',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    });
  }

  ngOnDestroy(): void {
    if (this.$routeParams) {
      this.$routeParams.unsubscribe();
    }
  }

}
