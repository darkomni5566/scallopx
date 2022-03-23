import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { FeesRoutes } from './fees.routing';
import { FeesManagementComponent } from 'src/app/pages/fees-management/fees-management.component';



@NgModule({
  declarations: [FeesManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(FeesRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class FeesModule { }
