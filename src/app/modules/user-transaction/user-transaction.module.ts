import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserTransactionRoutes } from './user-transaction.routing';
import { UserTransactionListComponent } from 'src/app/pages/user-transaction/user-transaction-list/user-transaction-list.component';



@NgModule({
  declarations: [UserTransactionListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(UserTransactionRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class UserTransactionModule { }
