import { Component } from '@angular/core';
import { UserSidebarComponent } from './user-sidebar/user-sidebar.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [UserSidebarComponent, RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}
