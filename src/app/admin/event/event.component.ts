import { Component } from '@angular/core';
import { EventService } from './services/event.service';
import { CategoryService } from '../category/services/category.service';
import { MaterialService } from '../material/services/material.service';
import { RoomService } from '../room/services/room.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'], // Fixed typo
  providers: [DatePipe]
})
export class EventComponent {
  event = {
    title: '',
    description: '',
    category: '',
    client: '',
    date: '',
    startTime: '',
    finishTime: '',
    room: '',
    registration: '',
    staff: '',
    material: ''
  };
  dateTransformer = new DatePipe('en-US');
  staffMembers: any[] = [];
  categories: any[] = [];
  materials: any[] = [];
  rooms: any[] = [];
  events: any[] = [];
  clients: any[] = [];
  isAdding = false;

  constructor(
    private eventService: EventService,
    private category: CategoryService,
    private material: MaterialService,
    private room: RoomService
  ) {
  }

  ngOnInit() {
    this.loadCategories();
    this.loadMaterials();
    this.loadRooms();
    this.loadStaffMembers();
    this.loadEvents();
    this.loadClients();
    
  }
  loadStaffMembers() {
    this.eventService.getStaffMembers().subscribe((res: any) => {
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
      this.rooms = res;
    });
  }

  loadEvents() {
    this.eventService.getEvents().subscribe((res: any) => {
      this.events = res;
    });
  }
  loadClients() {
    this.eventService.getClients().subscribe((res: any) => {
      this.clients = res;
      console.log(this.clients);
    });
  }

  createEvent() {
    this.eventService.create(this.event).subscribe((res: any) => {
      console.log(this.event);
      console.log('Event created successfully', res);
      this.loadEvents(); // Reload events after creation
    });
  }
  getClient(id: number) {
    this.eventService.getClient(id).subscribe((res: any) => {
    });
  }
  getCategory(id: number) {
    this.category.getCategory(id).subscribe((res: any) => {
    });
  }
  getStaff(id: number) {
    this.eventService.getStaff(id).subscribe((res: any) => {
    });
  }
  getMaterial(id: number) {
    this.material.getMaterial(id).subscribe((res: any) => {
    });
  }
  getRoom(id: number) {
    this.room.getRoom(id).subscribe((res: any) => {
    });
  }
  deleteEvent(id: number) {
    const confirmed = window.confirm("Are you sure?");
    if (confirmed ){
    this.eventService.deleteEvent(id).subscribe((res: any) => {
      this.loadEvents(); // Reload events after deletion
    })};
  }
  addEvent() {
    this.isAdding = !this.isAdding;
  }
  cancelAdd() {
    this.isAdding = !this.isAdding;
  }


}
