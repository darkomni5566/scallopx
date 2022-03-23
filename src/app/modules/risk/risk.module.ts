import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { RiskRoutes } from './risk.routing';
import { RiskManagementComponent } from 'src/app/pages/risk-management/risk-management.component';



@NgModule({
  declarations: [RiskManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(RiskRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class RiskModule { }
