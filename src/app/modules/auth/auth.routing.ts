import { Routes } from "@angular/router";
import { AuthGuard } from "src/app/authguard/auth/auth.guard";
import { LoginComponent } from "src/app/pages/login/login.component";

export const AuthRoutes: Routes = [
  { path: "login", component:  LoginComponent},
];
