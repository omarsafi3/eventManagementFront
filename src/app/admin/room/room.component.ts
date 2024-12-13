import { Component } from '@angular/core';
import { RoomService } from './services/room.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {
  constructor(private roomService: RoomService) {}
  isAdding = false;
  rooms: any[] = [];
  room = {
    name: '',
    surface: 0,
    capacity: 0,
    hourlyRate: 0,
  };
  isEditing = false;
  loadRooms(): void {
    this.roomService.getRooms().subscribe((data) => {
      this.rooms = data;
    });
  }
  ngOnInit(): void {
    this.loadRooms();
  }
  deleteRoom(id: number): void {
    this.roomService.deleteRoom(id).subscribe((data) => {
      this.loadRooms();
    });
  }
  addRoom(room): void {
    this.roomService.createRoom(room).subscribe((data) => {
      this.loadRooms();
      this.isAdding = false;
    });
  }
  updateRoom(room): void {
    this.roomService.updateRoom(room).subscribe((data) => {
      this.loadRooms();
      this.isEditing = false;  // Reset editing state after successful update
    });
  }
  editRoom(room): void {
    this.isEditing = true;
    this.room = { ...room };  // Create a copy of the category to avoid mutating original
  }
  cancelEdit(): void {
    this.isEditing = false;
    this.room = { name: '', surface: 0, capacity: 0, hourlyRate: 0 };  // Reset the category
  }
  loadAddRoomForm(): void {
    this.isAdding = true;
    this.room = { name: '', surface: 0, capacity: 0, hourlyRate: 0 };  // Reset the category
  }
  cancelAdd(): void {
    this.isAdding = false;
    this.room = { name: '', surface: 0, capacity: 0, hourlyRate: 0 };  // Reset the category
  }
  
}
