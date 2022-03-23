import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";


import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { AuthComponent } from './modules/auth/auth/auth.component';
import { UserTransactionComponent } from './modules/user-transaction/user-transaction/user-transaction.component';
import { ActivityComponent } from './modules/activity-log/activity/activity.component';
import { UserManageComponent } from './modules/user-management/user-manage/user-manage.component';
import { KycComponent } from './modules/kyc-management/kyc/kyc.component';
import { TransactionComponent } from './modules/transaction-management/transaction/transaction.component';
import { FeesComponent } from './modules/fees/fees/fees.component';
import { RiskComponent } from './modules/risk/risk/risk.component';
import { ConfigComponent } from './modules/config/config/config.component';
import { NotificationComponent } from './modules/notification/notification/notification.component';
import { TransactionAllComponent } from './modules/transactions-all/transaction-all/transaction-all.component';
import { RoleComponent } from './modules/role/role/role.component';
import { AdminComponent } from './modules/admin/admin/admin.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { CoinsComponent } from './modules/coins/coins/coins.component';
import { KycLimitComponent } from './modules/kyc-limit/kyc-limit/kyc-limit.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SettleComponent } from './modules/settle/settle/settle.component';
import { RegisterUserComponent } from "./modules/register/register-user/register-user.component";
import { KycDashboardComponent } from "./modules/kyc-dashboard/kyc-dashboard/kyc-dashboard.component";


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    NgxSpinnerModule,
    NgxCsvParserModule,
    
    ToastrModule.forRoot({
      // timeOut: 10000,
      // positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    })
  ],
  declarations: [AppComponent, AdminLayoutComponent,AuthComponent,UserTransactionComponent,ActivityComponent, UserManageComponent, KycComponent, TransactionComponent, FeesComponent, RiskComponent,ConfigComponent,NotificationComponent,TransactionAllComponent, RoleComponent, AdminComponent, ResetPasswordComponent,CoinsComponent,KycLimitComponent, PageNotFoundComponent, SettleComponent, RegisterUserComponent, KycDashboardComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
