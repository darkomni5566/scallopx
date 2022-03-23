import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { SettleRoutes } from './settle.routing';
import { SettlementManagementComponent } from 'src/app/pages/settlement-management/settlement-management.component';



@NgModule({
  declarations: [SettlementManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(SettleRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class SettleModule { }
