import { Component, OnInit } from '@angular/core';
import { faUserCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  navbarOpen = false;
  userId = '2';
  faUserCircle: IconDefinition = faUserCircle;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  toggleNav() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.authService.logout();
  }

}
