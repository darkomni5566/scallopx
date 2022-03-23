import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { KycLimitRoutes } from './kycLimit.routing';
import { KycLimitComponent } from 'src/app/pages/kyc-limit/kyc-limit.component';



@NgModule({
  declarations: [KycLimitComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(KycLimitRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class KycLimitModule { }
