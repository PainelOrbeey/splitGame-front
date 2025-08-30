// toast-container.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { Toast, ToastService } from '../../service/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss'],
})
export class ToastContainerComponent implements OnInit, OnDestroy {
  toasts: Toast[] = [];
  private sub?: Subscription;
  private hoverStartedAt = new Map<string, number>();
  private remaining = new Map<string, number>();

  constructor(private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.sub = this.toastService.toasts$.subscribe(list => {
      this.toasts = list;
      for (const t of list) {
        if (!this.remaining.has(t.id)) this.remaining.set(t.id, t.duration);
      }
    });
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }

  dismiss(id: string) { this.toastService.dismiss(id); }

  onMouseEnter(t: Toast) {
    if (!t.duration) return;
    this.hoverStartedAt.set(t.id, Date.now());
    this.toastService._pause(t.id);
  }

  onMouseLeave(t: Toast) {
    if (!t.duration) return;
    const start = this.hoverStartedAt.get(t.id);
    if (!start) return;
    const elapsed = Date.now() - start;
    const prev = this.remaining.get(t.id) ?? t.duration;
    const next = Math.max(prev - elapsed, 0);
    this.remaining.set(t.id, next);
    this.toastService._resume(t.id, next);
  }

  icon(type: Toast['type']): string {
    const s = {
      success: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
      info: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="8"/><line x1="12" y1="12" x2="12" y2="16"/></svg>',
      warning: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12" y2="17"/></svg>',
      error: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
    } as const;
    return s[type];
  }
}
