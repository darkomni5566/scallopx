import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthRoutes } from './auth.routing';
import { LoginComponent } from 'src/app/pages/login/login.component';





@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, 
    RouterModule.forChild(AuthRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,

    
  ]
})
export class AuthModule { }
