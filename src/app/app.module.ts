import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BoardComponent } from './components/board/board.component';
import { BoardListComponent } from './components/board-list/board-list.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { BoardService } from './services/board/board.service';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgPersonModule } from 'ng-person';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { BoardToolbarComponent } from './components/board-toolbar/board-toolbar.component';
import { ModalService } from './services/modal/modal.service';
import { CreateAgileItemComponent } from './components/create-agile-item/create-agile-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from './services/validation/validation.service';
@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardListComponent,
    TopNavComponent,
    UserProfileComponent,
    LoginComponent,
    RegisterComponent,
    ModalComponent,
    BoardToolbarComponent,
    CreateAgileItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    NgPersonModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FontAwesomeModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    BoardService,
    AuthService,
    ModalService,
    ValidationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
