import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NotificationManagementComponent } from 'src/app/pages/notification-management/notification-management.component';
import { NotificationRoutes } from './notification.routing';



@NgModule({
  declarations: [NotificationManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(NotificationRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class NotificationModule { }
