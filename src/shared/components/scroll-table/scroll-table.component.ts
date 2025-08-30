import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

interface ColumnDef {
  key: string;
  header: string;
}

@Component({
  selector: 'app-scroll-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-table.component.html',
  styleUrls: ['./scroll-table.component.scss']
})
export class ScrollTableComponent {
  @Input() columns: ColumnDef[] = [];
  @Input() data: any[] = [];
  @Input() cellTpl?: TemplateRef<any>;
  @Input() actionsTpl?: TemplateRef<any>;
}
