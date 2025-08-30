import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MetricsTab {
  label: string;
  value: string;
  icon?: string;
}

@Component({
  selector: 'app-metrics-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metrics-tabs.component.html',
  styleUrls: ['./metrics-tabs.component.scss']
})
export class MetricsTabsComponent {
  @Input() tabs: MetricsTab[] = [];
  @Input() active = '';
  @Output() activeChange = new EventEmitter<string>();

  setActive(tab: string) {
    this.active = tab;
    this.activeChange.emit(tab);
  }
}
