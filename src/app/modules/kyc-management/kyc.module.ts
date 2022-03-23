import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { KycRoutes } from './kyc.routing';
import { KycManagementComponent } from 'src/app/pages/kyc-management/kyc-management.component';



@NgModule({
  declarations: [KycManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(KycRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class KycModule { }
