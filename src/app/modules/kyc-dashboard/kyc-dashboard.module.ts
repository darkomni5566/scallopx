import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { KycDashboardRoutes } from './kyc-dashboard.routing';
import { KycStatusComponent } from 'src/app/pages/kyc-status/kyc-status.component';



@NgModule({
  declarations: [KycStatusComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(KycDashboardRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class KycDashboardModule { }
