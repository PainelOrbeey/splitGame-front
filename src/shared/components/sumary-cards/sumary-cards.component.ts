import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type DeltaType = 'up' | 'down' | 'neutral';

@Component({
  selector: 'app-summary-card',
  templateUrl: './sumary-cards.component.html',
  styleUrls: ['./sumary-cards.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class SummaryCardComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() delta: string = '';
  @Input() deltaType: DeltaType = 'neutral';   // <- agora aceita 'neutral'
  @Input() icon: string = 'pi pi-chart-bar';
}
