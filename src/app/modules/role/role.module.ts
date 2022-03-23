import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { RoleRoutes } from './role.routing';
import { RoleManagementComponent } from 'src/app/pages/role-management/role-management.component';



@NgModule({
  declarations: [RoleManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(RoleRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class RoleModule { }
