import { Routes } from "@angular/router";
import { UserTransactionListComponent } from "src/app/pages/user-transaction/user-transaction-list/user-transaction-list.component";


export const UserTransactionRoutes: Routes = [
  { path: "user-transaction", component: UserTransactionListComponent},
  { path: "transaction-detail/:id", component: UserTransactionListComponent},

];
