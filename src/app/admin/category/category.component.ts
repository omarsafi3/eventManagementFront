import { Component } from '@angular/core';
import { CategoryService } from './services/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  constructor(private categoryService: CategoryService) {}

  categories: any[] = [];
  category = {
    id: 0,
    name: '',
  };
  isEditing = false;
  isAdding = false;
  loadCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  deleteCategory(id: number): void {
    const confirmed = window.confirm("Are you sure?");
    if (confirmed ){
    this.categoryService.deleteCategory(id).subscribe((data) => {
      this.loadCategories();
    });
    }
  }

  addCategory(category): void {
    this.categoryService.createCategory(category).subscribe((data) => {
      this.loadCategories();
      this.isAdding = false;
    });
  }

  updateCategory(category): void {
    this.categoryService.updateCategory(category).subscribe((data) => {
      this.loadCategories();
      this.isEditing = false;  // Reset editing state after successful update
    });
  }

  editCategory(category): void {
    this.isEditing = true;
    this.category = { ...category };  // Create a copy of the category to avoid mutating original
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.category = { id: this.category.id, name: '' };  // Reset the category
  }
  loadAddCategoryForm(): void {
    this.isAdding = true;
  }
  cancelAdd(): void {
    this.isAdding = false;
    this.category = { id: this.category.id, name: '' };
  }
}
