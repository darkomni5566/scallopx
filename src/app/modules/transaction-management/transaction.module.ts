import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { TransactionRoutes } from './transaction.routing';
import { TransactionManagementComponent } from 'src/app/pages/transaction-management/transaction-management.component';



@NgModule({
  declarations: [TransactionManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(TransactionRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class TransactionModule { }
