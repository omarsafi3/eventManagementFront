import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component'; // Make sure your components are correctly imported // Assuming you have a user dashboard component
import { LoginGuard } from './authGuard/loginGuard';  // Corrected import path
import { AuthGuard } from './authGuard/authGuard';
import { CategoryComponent } from './admin/category/category.component';
import { AdminComponent } from './admin/admin.component';
import { MaterialComponent } from './admin/material/material.component';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  {
    path: 'admin',
    component: AdminComponent, // Sidebar and layout wrapper
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'material', component: MaterialComponent },
    ],
  },
  { path: '**', redirectTo: '/login' }
];
