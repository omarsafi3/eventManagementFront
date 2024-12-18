import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserSidebarComponent } from '../user-sidebar/user-sidebar.component';
import { CommonModule, DatePipe } from '@angular/common';
import { EventsService } from './services/events.service';
import { CategoryService } from '../../admin/category/services/category.service';
import { MaterialService } from '../../admin/material/services/material.service';
import { RoomService } from '../../admin/room/services/room.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [UserSidebarComponent, CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css',
})
export class EventsComponent {
  dateTransformer = new DatePipe('en-US');
  staffMembers: any[] = [];
  categories: any[] = [];
  materials: any[] = [];
  rooms2: any[] = [];
  rooms: any[] = [];
  events: any[] = [];
  clients: any[] = [];
  participant = {
    id: '',
    fullName: '',
    email: '',
  };
  amountPaid = 0;
  constructor(
    private router: Router,
    private eventsService: EventsService,
    private category: CategoryService,
    private material: MaterialService,
    private room: RoomService
  ) {}
  ngOnInit() {
    this.loadCategories();
    this.loadMaterials();
    this.loadStaffMembers();
    this.loadEvents();
    this.loadClients();
    this.loadRooms();
    this.getUserId();
  }
  getUserId() {
    this.eventsService.getUserId().subscribe((res: any) => {
      localStorage.setItem('userId', res.id);
      localStorage.setItem('name', res.fullName);
      localStorage.setItem('email', res.email);
      this.participant.email = res.email;
      this.checkParticipation(); // Check participation status after loading user details


    });
  }
  checkParticipation() {
    this.events.forEach((event) => {
      // Initialize flag as false for each event
      event.isParticipating = false;
  
      // Check if the event has registration data
      if (event.registrationWrapper && event.registrationWrapper.registration) {
        // Check each registration for matching participant email
        event.registrationWrapper.registration.forEach((registration: any) => {
          if (registration.participant.email === this.participant.email) {
            console.log('User is already registered for this event');
            event.isParticipating = true; // User is already registered for this event
          }
        });
      }
    });
  }
  
  loadStaffMembers() {
    this.eventsService.getStaffMembers().subscribe((res: any) => {
      this.staffMembers = res;
    });
  }

  loadCategories() {
    this.category.getCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }

  loadMaterials() {
    this.material.getMaterials().subscribe((res: any) => {
      this.materials = res;
    });
  }

  loadRooms() {
    this.room.getRooms().subscribe((res: any) => {
      this.rooms2 = res;
      console.log(this.rooms2);
    });
  }

  loadEvents() {
    this.eventsService.getEvents().subscribe((res: any) => {
      this.events = res;

    });
  }
  loadClients() {
    this.eventsService.getClients().subscribe((res: any) => {
      this.clients = res;
      console.log(this.clients);
    });
  }
  registerEvent(eventId: any) {
    this.participant.id = localStorage.getItem('userId');
    this.participant.fullName = localStorage.getItem('name');
    this.participant.email = localStorage.getItem('email');
    console.log(this.participant)
    this.eventsService.registerEvent(eventId, this.participant).subscribe((res: any) => {
      console.log(res);
      window.location.reload();
    });
  }
}
