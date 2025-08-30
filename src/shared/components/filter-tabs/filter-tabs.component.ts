import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-tabs',
  templateUrl: './filter-tabs.component.html',
  styleUrls: ['./filter-tabs.component.scss'],
  imports: [FormsModule,CommonModule],
  standalone: true
})
export class FilterTabsComponent {
 @Input() tabs: { label: string; value: string }[] = [];
  @Input() selected: string = '';
  @Output() selectedChange = new EventEmitter<string>();

  @Input() search: string = '';
  @Output() searchChange = new EventEmitter<string>();

  @Input() searchPlaceholder: string = 'Buscar…';

  @Output() export = new EventEmitter<void>();
  @Output() filterClick = new EventEmitter<void>();

  selectTab(value: string) {
    this.selectedChange.emit(value);
  }
}
