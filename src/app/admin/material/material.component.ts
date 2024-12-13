import { Component } from '@angular/core';
import { CategoryService } from '../category/services/category.service';
import { MaterialService } from './services/material.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-material',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './material.component.html',
  styleUrl: './material.component.css'
})
export class MaterialComponent {
  constructor(private materialService: MaterialService) {}
  isAdding = false;
  materials: any[] = [];
  material = {
    id: 0,
    name: '',
    quantity: 0,
    hourlyRate: 0,
  };
  isEditing = false;
  loadMaterials(): void {
    this.materialService.getMaterials().subscribe((data) => {
      this.materials = data;
    });
  }
  ngOnInit(): void {
    this.loadMaterials();
  }
  deleteMaterial(id: number): void {
    this.materialService.deleteMaterial(id).subscribe((data) => {
      this.loadMaterials();
    });
  }
  addMaterial(material): void {
    this.materialService.addMaterial(material).subscribe((data) => {
      this.loadMaterials();
      this.isAdding = false;
    });
  }
  updateMaterial(material): void {
    this.materialService.updateMaterial(material).subscribe((data) => {
      this.loadMaterials();
      this.isEditing = false;  // Reset editing state after successful update
    });
  }
  editMaterial(material): void {
    this.isEditing = true;
    this.material = { ...material };  // Create a copy of the category to avoid mutating original
  }
  cancelEdit(): void {
    this.isEditing = false;
    this.material = { id: 0, name: '', quantity: 0, hourlyRate: 0 };  // Reset the category
  }
  loadAddMaterialForm(): void {
    this.isAdding = true;
    this.material = { id: 0, name: '', quantity: 0, hourlyRate: 0 };  // Reset the category
  }
  cancelAdd(): void {
    this.isAdding = false;
    this.material = { id: 0, name: '', quantity: 0, hourlyRate: 0 };  // Reset the category
  }

}
