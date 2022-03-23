import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { RegisterRoutes } from './register-user.routing';
import { RegisterComponent } from 'src/app/pages/register/register.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';



@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(RegisterRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule, 
    NgxIntlTelInputModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class RegisterModule { }
