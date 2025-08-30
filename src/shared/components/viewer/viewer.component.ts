import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserMenuComponent } from '../user-menu/user-menu.component';

export interface ViewerField {
  key: string;
  label: string;
  type:
    | 'text'
    | 'email'
    | 'number'
    | 'select'
    | 'date'
    | 'currency'
    | 'badge'
    | 'avatar'
    | 'readonly';
  options?: { value: any; label: string }[];
  editable?: boolean;
  required?: boolean;
  placeholder?: string;
  icon?: string;
  formatter?: (v: any) => string;
  badgeConfig?: Record<string, { class: string; label: string }>;
}

export type MetricFormat =
  | 'currency'
  | 'percent'
  | 'date'
  | 'decimal1'
  | 'default';

export interface ViewerMetric {
  title: string;
  value: any;
  format?: MetricFormat;
  icon?: string;
  delta?: string;
  deltaType?: 'up' | 'down' | 'neutral';
  color?: string;
}

export interface ViewerSection {
  title: string;
  subtitle?: string;
  icon?: string;
  fields: ViewerField[];
}

export interface ViewerConfig {
  title: string;
  subtitle?: string;
  metrics?: ViewerMetric[];
  sections: ViewerSection[];
  actions?: {
    edit?: boolean;
    delete?: boolean;
    custom?: { label: string; action: string; icon?: string; class?: string }[];
  };
}

@Component({
  selector: 'app-generic-viewer',
  standalone: true,
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  imports: [CommonModule, FormsModule, UserMenuComponent],
})
export class GenericViewerComponent implements OnInit, OnChanges {
  @Input() data: any = {};
  @Input() config!: ViewerConfig;
  @Input() visible = true;

  @Output() onSave = new EventEmitter<any>();
  @Output() onClose = new EventEmitter<void>();
  @Output() onAction = new EventEmitter<{ action: string; data: any }>();

  isEditing = false;
  editData: any = {};

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const state =
      (this.router.getCurrentNavigation()?.extras.state as any) ??
      (window.history.state as any) ??
      {};

    if (state.data) this.data = state.data;
    if (state.config) this.config = state.config;

    this.editData = { ...this.data };
    if (state.startEdit) this.isEditing = true;
  }

  ngOnChanges(): void {
    this.editData = { ...this.data };
  }

  save() {
    this.onSave.emit(this.editData);
    this.isEditing = false;
    this.close();
  }

  cancel() {
    this.editData = { ...this.data };
    this.isEditing = false;
  }

  close() {
    this.onClose.emit();
    this.location.back();
  }

  back() {
    this.location.back();
  }

  custom(a: string) {
    this.onAction.emit({ action: a, data: this.editData });
  }

  private avatarField() {
    return this.config.sections
      .flatMap((s) => s.fields)
      .find((f) => f.type === 'avatar');
  }
  hasAvatar() {
    return !!this.avatarField();
  }
  avatarSrc() {
    const f = this.avatarField();
    return f ? this.getValue(f.key) : null;
  }

  getValue(k: string) {
    return this.editData?.[k];
  }
  setValue(k: string, v: any) {
    this.editData[k] = v;
  }

  optionLabel(f: ViewerField, v: any) {
    return f.options?.find((o) => o.value === v)?.label ?? (v ?? '').toString();
  }
  badgeCfg(f: ViewerField, v: any) {
    return f.badgeConfig?.[v] ?? { class: 'default', label: v };
  }

  formatField(f: ViewerField, v: any) {
    if (f.formatter) return f.formatter(v);
    switch (f.type) {
      case 'currency':
        return this.currency(v);
      case 'date':
        return this.date(v);
      default:
        return v != null ? v.toString() : '';
    }
  }

  formatMetric(m: ViewerMetric) {
    const val = m.value;
    switch (m.format) {
      case 'currency':
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(Number(val) || 0);
      case 'decimal1':
        return Number(val).toFixed(1);
      case 'percent':
        return `${val}%`;
      case 'date':
        return this.date(val);
      default:
        return val != null ? val.toString() : '';
    }
  }

  private currency(n: any) {
    const num = Number(n) || 0;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(num);
  }

  private date(d: any) {
    if (!d) return '';
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return d;
    return dt.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }

  initials(n: string) {
    return (n || '')
      .split(' ')
      .map((x) => x[0])
      .join('')
      .toUpperCase();
  }
}
