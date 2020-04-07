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
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth/auth.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import { BoardToolbarComponent } from './components/board-toolbar/board-toolbar.component';
import { ModalService } from './services/modal/modal.service';
import { CreateAgileItemComponent } from './components/create-agile-item/create-agile-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from './services/validation/validation.service';
import { UsersService } from './services/users/users.service';
import { AgileItemsService } from './services/agile-items/agile-items.service';
import { AgileItemDetailsComponent } from './components/agile-item-details/agile-item-details.component';
import { ItemUtilityService } from './services/item-utility/item-utility.service';
import { RelatedItemOverviewComponent } from './components/related-item-overview/related-item-overview.component';
import { AgileItemCommentsComponent } from './components/agile-item-comments/agile-item-comments.component';
import { CommentsService } from './services/comments/comments.service';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { ThemeService } from './services/theme/theme.service';
import { ComparisonChartComponent } from './components/comparison-chart/comparison-chart.component';
import { ChartsModule } from 'ng2-charts';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { ChartService } from './services/chart/chart.service';
import { NgCircleProgressModule } from 'ng-circle-progress';


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
    CreateAgileItemComponent,
    AgileItemDetailsComponent,
    RelatedItemOverviewComponent,
    AgileItemCommentsComponent,
    AddCommentComponent,
    ComparisonChartComponent,
    AnalyticsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    ChartsModule,
    NgCircleProgressModule.forRoot({})
  ],
  providers: [
    BoardService,
    AuthService,
    ModalService,
    ValidationService,
    UsersService,
    AgileItemsService,
    ItemUtilityService,
    CommentsService,
    ThemeService,
    ChartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
