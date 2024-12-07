import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CategoryComponent } from "../category/category.component";
@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [SidebarComponent, CategoryComponent]
})
export class DashboardComponent {

}
