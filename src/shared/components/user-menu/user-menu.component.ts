import {
  Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, NgZone, OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule, Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';

import { ImpersonationService, ImpersonationState } from '../../services/impersonation.service';
import { Subscription } from 'rxjs';

@Component({
  selector   : 'app-user-menu',
  standalone : true,
  imports    : [
    CommonModule, DialogModule, ButtonModule, FormsModule, AvatarModule
  ],
  templateUrl: './user-menu.component.html',
  styleUrls  : ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() username      = 'User';
  @Input() email         = 'user@email.com';
  @Input() saldo         = 0;
  @Input() saldoProtesto = 0;

  @ViewChild('trigger', { read: ElementRef }) triggerRef!: ElementRef<HTMLButtonElement>;
  @ViewChild('menu')                          menuDlg!: Dialog;

  menuVisible = false;
  darkMode    = false;

  impersonation: ImpersonationState | null = null;

  private clickListener?: () => void;
  private sub?: Subscription;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    public impSrv: ImpersonationService
  ) {}

  ngOnInit() {
    // acompanha mudanças do estado de impersonação
    this.sub = this.impSrv.state$.subscribe(s => this.impersonation = s);
    console.log('Impersonation active?', this.impSrv.isActive);
  }

  ngAfterViewInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.darkMode = true;
      document.documentElement.classList.add('dark');
    } else {
      this.darkMode = false;
      document.documentElement.classList.remove('dark');
    }
  }

  ngOnDestroy() {
    this.removeClickListener();
    this.sub?.unsubscribe();
  }

  reposition(): void {
    const rect = this.triggerRef.nativeElement.getBoundingClientRect();
    const dlg  = this.menuDlg.container as HTMLElement;
    dlg.style.position = 'fixed';
    dlg.style.left     = `${rect.left - 50}px`;
    dlg.style.top      = `${rect.bottom + 6}px`;
    dlg.style.borderRadius = '8px';
    dlg.style.visibility = 'visible';
    this.addClickListener();
  }

  addClickListener() {
    this.removeClickListener();
    this.ngZone.runOutsideAngular(() => {
      this.clickListener = () => {
        document.addEventListener('mousedown', this.handleClickOutside, true);
      };
      document.addEventListener('mousedown', this.handleClickOutside, true);
    });
  }

  removeClickListener() {
    document.removeEventListener('mousedown', this.handleClickOutside, true);
  }

  handleClickOutside = (event: MouseEvent) => {
    const trigger = this.triggerRef?.nativeElement;
    const dialog = this.menuDlg?.container as HTMLElement;
    if (
      this.menuVisible &&
      trigger &&
      dialog &&
      !trigger.contains(event.target as Node) &&
      !dialog.contains(event.target as Node)
    ) {
      this.ngZone.run(() => {
        this.menuVisible = false;
        this.removeClickListener();
      });
    }
  };

  toggleTheme() {
    if (this.darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
    if (this.menuVisible) {
      this.reposition();
    } else {
      this.removeClickListener();
    }
  }

  // Navega para o dashboard da company (visual)
  goToCompany() {
    this.router.navigate(['/company/dashboard']);
  }

  // Volta ao admin e garante sair do modo "como empresa"
  goToAdmin() {
    if (this.impSrv.isActive) this.impSrv.stop();
    this.router.navigate(['/admin/dashboard']);
  }

  // Sair do sistema
  logout() {
    this.router.navigate(['/login']);
    this.menuVisible = false;
    // opcional: também encerrar impersonação no logout
    if (this.impSrv.isActive) this.impSrv.stop();
  }

  // Sair do modo "Admin como Empresa X"
  exitImpersonation(event?: Event) {
    if (event) event.stopPropagation();
    this.impSrv.stop();
    this.router.navigate(['/admin/all-companies']);
  }
}
