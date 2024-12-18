import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-user-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent {
  user: string = '';
  constructor(private router: Router) {}
  ngOnInit() {
    // Fetch the user information from localStorage or another source
    this.user = localStorage.getItem('username') || 'Guest';
  }
  logout() {
    // Clear relevant tokens and navigate to the login page
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
