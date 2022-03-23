import { Routes } from "@angular/router";
import { ConfigManagementComponent } from 'src/app/pages/config-management/config-management.component';



export const ConfigRoutes: Routes = [
{ path: "config-management", component: ConfigManagementComponent},
{ path: "config-details", component: ConfigManagementComponent},
];
