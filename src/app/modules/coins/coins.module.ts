import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { CoinsRoutes } from './coins.routing';
import { CoinsManagementComponent } from 'src/app/pages/coins-management/coins-management.component';



@NgModule({
  declarations: [CoinsManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CoinsRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class CoinsModule { }
