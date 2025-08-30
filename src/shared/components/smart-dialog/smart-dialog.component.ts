import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface DialogAction {
  label: string;
  type: 'primary' | 'text';
  id: string;
}

@Component({
  selector: 'app-smart-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './smart-dialog.component.html',
  styleUrls: ['./smart-dialog.component.scss'],
})
export class SmartDialogComponent {
  @Input() title = 'Detalhes';
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  @Input() actions: DialogAction[] = [];

  @Output() action = new EventEmitter<string>();

  close() {
    this.updateVisible(false);
  }

  onAction(id: string) {
    this.action.emit(id);
  }

  private updateVisible(v: boolean) {
    this.visible = v;
    this.visibleChange.emit(v);
  }
}
