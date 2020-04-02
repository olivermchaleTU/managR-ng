import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { UserDetailVm } from 'src/app/utils/types/AuthTypes';
import Swal from 'sweetalert2';
import { IconDefinition, faUser, faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  $routeParams: Subscription;
  id: string;
  user: UserDetailVm;
  loading = true;
  faUser: IconDefinition = faUser;
  faSpinner: IconDefinition = faSpinner;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.$routeParams = this.activatedRoute.params.subscribe(params => {
      this.id = params.id;
      this.getUserDetails();
    });
  }

  getUserDetails() {
    this.usersService.getUser(this.id).subscribe(
      resp => {
      this.user = resp;
      this.loading = false;
    },
    err => {
      Swal.fire({
        title: 'Error',
        text: 'Failured to get user',
        icon: 'error',
        confirmButtonText: 'Ok',
      }).then(clicked => {
        this.router.navigate(['/board']);
      });
    });
  }

  getRoleText(role: number) {
    switch (role) {
      case 0 :
        return 'User';
      case 1 :
        return 'Spectator';
      case 2 :
        return 'Leader';
      case 3 :
        return 'Analyst';
      default:
        return 'Error';
    }
  }

  ngOnDestroy() {
    if (this.$routeParams) {
      this.$routeParams.unsubscribe();
    }
  }

}
