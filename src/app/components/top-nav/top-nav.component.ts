import { Component, OnInit } from '@angular/core';
import { faUserCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {
  navbarOpen = false;
  userId = 'err';
  userName = 'Oliver McHale';
  faUserCircle: IconDefinition = faUserCircle;
  constructor(
    private authService: AuthService,
    private themeService: ThemeService
    ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('currentUserId');
    const firstName = localStorage.getItem('currentUserFirstName');
    const lastName = localStorage.getItem('currentUserLastName');
    this.userName = firstName + ' ' + lastName;
  }

  toggleNav() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.authService.logout();
  }

  setTheme(theme: string) {
    theme === 'light' ? this.themeService.setLightTheme() : this.themeService.setDarkTheme()
  }

}
