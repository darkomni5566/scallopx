import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './authguard/auth/auth.guard';
import { AuthComponent } from './modules/auth/auth/auth.component';
import { UserTransactionComponent } from './modules/user-transaction/user-transaction/user-transaction.component';
import { ActivityComponent } from './modules/activity-log/activity/activity.component';
import { UserManageComponent } from './modules/user-management/user-manage/user-manage.component';
import { KycComponent } from './modules/kyc-management/kyc/kyc.component';
import { TransactionComponent } from './modules/transaction-management/transaction/transaction.component';
import { ConfigComponent } from './modules/config/config/config.component';
import { RiskComponent } from './modules/risk/risk/risk.component';
import { FeesComponent } from './modules/fees/fees/fees.component';
import { NotificationComponent } from './modules/notification/notification/notification.component';
import { TransactionAllComponent } from './modules/transactions-all/transaction-all/transaction-all.component';
import { RoleComponent } from './modules/role/role/role.component';
import { AdminComponent } from './modules/admin/admin/admin.component';
import { CoinsComponent } from './modules/coins/coins/coins.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { KycLimitComponent } from "./modules/kyc-limit/kyc-limit/kyc-limit.component";
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SettleComponent } from "./modules/settle/settle/settle.component";
import { RegisterUserComponent } from "./modules/register/register-user/register-user.component";
import { KycDashboardComponent } from "./modules/kyc-dashboard/kyc-dashboard/kyc-dashboard.component";


const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import ("./layouts/admin-layout/admin-layout.module").then(m => m.AdminLayoutModule)
      }
    ]
  }, {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import ("./layouts/auth-layout/auth-layout.module").then(m => m.AuthLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadChildren: () => import ("./modules/auth/auth.module").then(m => m.AuthModule)

      }
    ]
  },
  {
    path: '',
    component: UserTransactionComponent,
    children: [
      {
        path: '',
        loadChildren: () => import ("./modules/user-transaction/user-transaction.module").then(m => m.UserTransactionModule)

      }
    ]
  },
  {
    path: '',
    component: ActivityComponent,
    children: [
      {
        path: '',
        loadChildren: () => import ("./modules/activity-log/activity.module").then(m => m.ActivityLogModule)

      }
    ]
  },
  {
    path: '',
    component: UserManageComponent,
    children: [
      {
        path: '',
        loadChildren: () => import ("./modules/user-management/user-manage.module").then(m => m.UserManageModule)

      }
    ]
  },
  {
    path: '',
    component: KycComponent,
    children: [
      {
        path: '',
        loadChildren: () => import ("./modules/kyc-management/kyc.module").then(m => m.KycModule)
      }
    ]
  },
  {
    path: '',
    component: TransactionComponent,
    children: [
      {
        path: '',
        loadChildren: () => import ("./modules/transaction-management/transaction.module").then(m => m.TransactionModule)
      }
    ]
  },
  {
    path: '',
    component: ConfigComponent,
    children: [
      {
        path: '',
        loadChildren: () => import ("./modules/config/config.module").then(m => m.ConfigModule)
      }
    ]
  },
  {
    path: '',
    component: RiskComponent,
    children: [
      {
        path: '',
        loadChildren: () => import ("./modules/risk/risk.module").then(m => m.RiskModule)
      }
    ]
  },
  {
    path: '',
    component: FeesComponent,
    children: [
      {
        path: '',
        loadChildren: () => import ("./modules/fees/fees.module").then(m => m.FeesModule)
      }
    ]
  },
  {
    path: '',
    component: NotificationComponent,
    children: [
      {
        path: '',
        loadChildren: () => import ("./modules/notification/notification.module").then(m => m.NotificationModule)
      }
    ]
  },
  {
    path: '',
    component: TransactionAllComponent,
    children: [
      {
        path: '',
        loadChildren: () => import ("./modules/transactions-all/transactions.module").then(m => m.TransactionAllModule)

      }
    ]
  },
  {
    path: '',
    component: RoleComponent,
    children: [
      {
        path: '',
        loadChildren: () => import ("./modules/role/role.module").then(m => m.RoleModule)
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () => import ("./modules/admin/admin.module").then(m => m.AdminModule)
      }
    ]
  },
  {
    path: '',
    component: KycLimitComponent,
    children: [
      {
        path: '',
        loadChildren: () => import ("./modules/kyc-limit/kycLimit.module").then(m => m.KycLimitModule)

      }
    ]
  },
  {
    path: '',
    component: CoinsComponent,
    children: [
      {
        path: '',
        loadChildren: () => import ("./modules/coins/coins.module").then(m => m.CoinsModule)

      }
    ]
  },
  {
    path: '',
    component: SettleComponent,
    children: [
      {
        path: '',
        loadChildren: () => import ("./modules/settle/settle.module").then(m => m.SettleModule)

      }
    ]
  },
  {
    path: '',
    component: RegisterUserComponent,
    children: [
      {
        path: '',
        loadChildren: () => import ("./modules/register/register-user.module").then(m => m.RegisterModule)

      }
    ]
  },
  {
    path: '',
    component: KycDashboardComponent,
    children: [
      {
        path: '',
        loadChildren: () => import ("./modules/kyc-dashboard/kyc-dashboard.module").then(m => m.KycDashboardModule)

      }
    ]
  },


  {path:'reset-password',component:ResetPasswordComponent}, 
  {path:'config',component:PageNotFoundComponent},
  {path:'page-not-found',component:PageNotFoundComponent},
  {path: "**",redirectTo: "page-not-found"},

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule {}
