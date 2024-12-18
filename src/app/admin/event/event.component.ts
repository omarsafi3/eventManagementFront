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
  styleUrls: ['./event.component.css'], 
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
  currentStep: number = 1; 
  totalSteps: number = 3;
  selectedEvent: any; // To hold the selected event
  isViewingDetails: boolean = false; // To control visibility of the modal

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
  viewEventDetails(event: any) {
    this.selectedEvent = event; // Store the event to show in the modal
    this.isViewingDetails = true; // Show the modal
  }

  // Function to close the modal
  closeDetails() {
    this.isViewingDetails = false; // Hide the modal
    this.selectedEvent = null; // Clear the selected event
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  isStepValid(): boolean {
 
    switch (this.currentStep) {
      case 1:
        
        return (
          !!this.event.title && 
          !!this.event.description && 
          !!this.event.category?.id && 
          !!this.event.client 
        );
      case 2:
        return (
          !!this.event.date && 
          !!this.event.startTime && 
          !!this.event.finishTime 
        );
      default:
        return true; 
    }
  }
  isLoadingRooms = false;
  fetchAvailableRooms() {
    const { startTime, finishTime, date } = this.event;

    if (!date || !startTime || !finishTime) {
      window.alert('Please fill out the Date, Start Time, and Finish Time fields to check for available rooms.');
      return;
    }

    const day = this.event.date
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
    });
  }
  selectedRoom: any = null;
  createEvent() {

    this.getRoom(this.event.room.id).subscribe((res: any) => {
      this.selectedRoom = res;
      this.event.room.name = this.selectedRoom.name;
      this.event.room.capacity = this.selectedRoom.capacity;
      this.event.room.hourlyRate = this.selectedRoom.hourlyRate;
      this.event.room.surface = this.selectedRoom.surface;
      this.eventService.create(this.event).subscribe((res: any) => {
        this.loadEvents(); 
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
      this.loadEvents(); 
    })};
  }
  addEvent() {
    this.isAdding = !this.isAdding;
  }
  cancelAdd() {
    this.isAdding = !this.isAdding;
    this.currentStep = 1;
    this.event = {
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
  }


}
