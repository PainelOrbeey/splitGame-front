import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'app-sidebar-filters',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './sidebar-filters.component.html',
  styleUrl: './sidebar-filters.component.scss',
})
export class SidebarFiltersComponent {
  @Input() visible = false;

  @Input() side: 'left' | 'right' = 'right';

  @Input() width = '320px';

  @Output() visibleChange = new EventEmitter<boolean>();

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
  @HostBinding('class.open') get opened() {
    return this.visible;
  }

  @HostBinding('class.left')
  get isLeft() {
    return this.side === 'left';
  }
}
