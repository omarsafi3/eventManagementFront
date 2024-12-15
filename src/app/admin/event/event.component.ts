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
    category: {
      id: 0,
      name: ''
    },
    client: '',
    date: '',
    startTime: '',
    finishTime: '',
    room: {
      id: 0,
      name: '',
      hourlyRate: 0,
      capacity: 0,
      surface: 0
    },
    registration: '',
    staff: '',
    material: ''
  };
  dateTransformer = new DatePipe('en-US');
  staffMembers: any[] = [];
  categories: any[] = [];
  materials: any[] = [];
  rooms2: any[] = [];
  rooms: any[] = [];
  events: any[] = [];
  clients: any[] = [];
  isAdding = false;
  currentStep: number = 1; // Track current step
  totalSteps: number = 3;

  constructor(
    private eventService: EventService,
    private category: CategoryService,
    private material: MaterialService,
    private room: RoomService
  ) {
  }
  nextStep() {
    if (this.currentStep < this.totalSteps) {
      
      this.currentStep++;
      if (this.currentStep === 3) {
        this.fetchAvailableRooms();
      }
      
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  isStepValid(): boolean {
    // Validate the current step based on required fields
    switch (this.currentStep) {
      case 1:
        
        return (
          !!this.event.title && // Ensures title is a non-empty string
          !!this.event.description && // Ensures description is a non-empty string
          !!this.event.category?.id && // Ensures category exists and has a valid id
          !!this.event.client // Ensures client is truthy
        );
      case 2:
        return (
          !!this.event.date && // Ensures date is valid
          !!this.event.startTime && // Ensures startTime is valid
          !!this.event.finishTime // Ensures finishTime is valid
        );
      default:
        return true; // Step 3 (Room selection) is always valid if room is selectable
    }
  }
  isLoadingRooms = false;
  fetchAvailableRooms() {
    const { startTime, finishTime, date } = this.event;

    if (!date || !startTime || !finishTime) {
      window.alert('Please fill out the Date, Start Time, and Finish Time fields to check for available rooms.');
      return;
    }

    const day = this.event.date // Extract day from the date
    this.isLoadingRooms = true;

    this.eventService.getAvailableRooms(startTime, finishTime, day).subscribe(
      (res) => {
        this.rooms = res;
        this.isLoadingRooms = false;
      },
      (err) => {
        console.error('Error fetching available rooms:', err);
        this.isLoadingRooms = false;
      }
    );
  }
  

  ngOnInit() {
    this.loadCategories();
    this.loadMaterials();
    this.loadStaffMembers();
    this.loadEvents();
    this.loadClients();
    this.loadRooms();
    
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
      this.rooms2 = res;
      console.log(this.rooms2);
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
  selectedRoom: any = null;
  createEvent() {
    console.log(this.event);
    this.getRoom(this.event.room.id).subscribe((res: any) => {
      this.selectedRoom = res;
      this.event.room.name = this.selectedRoom.name;
      this.event.room.capacity = this.selectedRoom.capacity;
      this.event.room.hourlyRate = this.selectedRoom.hourlyRate;
      this.event.room.surface = this.selectedRoom.surface;
      this.eventService.create(this.event).subscribe((res: any) => {
        console.log(this.event);
        console.log('Event created successfully', res);
        this.loadEvents(); // Reload events after creation
        this.isAdding = !this.isAdding;
        this.currentStep = 1;
      });
    });
    
   
  }
  getClient(id: number) {
    this.eventService.getClient(id).subscribe((res: any) => {
      return res
    });
  }
  getCategory(id: number) {
    this.category.getCategory(id).subscribe((res: any) => {
      return
    });
  }
  getStaff(id: number) {
    this.eventService.getStaff(id).subscribe((res: any) => {
      return res
    });
  }
  getMaterial(id: number) {
    this.material.getMaterial(id).subscribe((res: any) => {
      return res
    });
  }
  getRoom(id: number) {
    return this.room.getRoom(id);
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
    this.currentStep = 1;
  }


}
