import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [RouterModule]
})
export class SidebarComponent implements OnInit {
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
