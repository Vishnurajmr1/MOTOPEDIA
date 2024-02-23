import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css'],
})
export class SearchFieldComponent {
  private fb = inject(FormBuilder);
  searchValue: string = '';
  @Output() sendSearchValue: EventEmitter<string> = new EventEmitter();
  searchForm = this.fb.nonNullable.group({
    searchValue: '',
  });

  onSearchSubmit(): void {
    this.searchValue = this.searchForm.value.searchValue ?? '';
    this.sendSearchValue.emit(this.searchValue);
  }
}
