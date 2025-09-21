import { CommonModule } from '@angular/common';
import { Component, NgModule, WritableSignal, inject, signal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories-service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, TranslatePipe, RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories {
  private categoriesService = inject(CategoriesService);
  public translate = inject(TranslateService);
  
  categoriesList:WritableSignal<any[]> = signal([]);
  subCategoriesList:WritableSignal<any[]> = signal([]);
  openCategoryId = signal<string | null>(null);

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoriesList.set(res.data.map((cat: any) => ({ ...cat, hasSubcategories: true })));
      }
    });
  }
  
  toggleCategory(id: string) {
    if (this.openCategoryId() === id) {
      this.openCategoryId.set(null);
      this.subCategoriesList.set([]);
    } else {
      this.categoriesService.getSubCategories(id).subscribe({
        next: (res) => {
          this.subCategoriesList.set(res.data);
          if (res.results === 0) {
            this.categoriesList.update((list) =>
              list.map((cat) => cat._id === id ? { ...cat, hasSubcategories: false } : cat)
            );
          } else {
            this.openCategoryId.set(id);
          }
        },
        error: (err) => console.error(err)
      });
    }
  }
  
  isOpen(id: string) {
    return this.openCategoryId() === id;
  }
}
