import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ImpersonationState {
  companyId: string;
  companyName: string;
  startedAt: string; // ISO
  adminUser?: { name: string; email: string };
}

const LS_KEY = 'impersonation_state';

@Injectable({ providedIn: 'root' })
export class ImpersonationService {
  private _state$ = new BehaviorSubject<ImpersonationState | null>(this.read());
  readonly state$ = this._state$.asObservable();

  get current() { return this._state$.value; }
  get isActive() { return !!this._state$.value; }

  start(company: { id: string; name: string }, adminUser?: { name: string; email: string }) {
    const payload: ImpersonationState = {
      companyId: company.id,
      companyName: company.name,
      startedAt: new Date().toISOString(),
      adminUser
    };
    localStorage.setItem(LS_KEY, JSON.stringify(payload));
    document.body.classList.add('impersonating');
    this._state$.next(payload);
  }

  stop() {
    localStorage.removeItem(LS_KEY);
    document.body.classList.remove('impersonating');
    this._state$.next(null);
  }

  private read(): ImpersonationState | null {
    try {
      const raw = localStorage.getItem(LS_KEY);
      const parsed = raw ? JSON.parse(raw) as ImpersonationState : null;
      if (parsed) document.body.classList.add('impersonating');
      return parsed;
    } catch { return null; }
  }
}
