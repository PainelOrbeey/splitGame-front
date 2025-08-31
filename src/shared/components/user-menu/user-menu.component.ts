import {
  Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, NgZone
} from '@angular/core';
import { CommonModule }      from '@angular/common';
import { DialogModule, Dialog } from 'primeng/dialog';
import { ButtonModule }      from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule }       from '@angular/forms';
import { Router } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector   : 'app-user-menu',
  standalone : true,
  imports    : [
    CommonModule, DialogModule, ButtonModule, InputSwitchModule, FormsModule,AvatarModule,
  ],
  templateUrl: './user-menu.component.html',
  styleUrls  : ['./user-menu.component.scss']
})
export class UserMenuComponent implements AfterViewInit, OnDestroy {

  @Input() username      = 'User';
  @Input() email         = 'user@email.com';
  @Input() saldo         = 0;
  @Input() saldoProtesto = 0;

  @ViewChild('trigger', { read: ElementRef }) triggerRef!: ElementRef<HTMLButtonElement>;
  @ViewChild('menu')                          menuDlg!: Dialog;

  menuVisible = false;
  darkMode    = false;

  private clickListener?: () => void;

  constructor(private ngZone: NgZone, private router: Router) {}

  ngAfterViewInit() {}

  ngOnDestroy() {
    this.removeClickListener();
  }

  reposition(): void {
    const rect = this.triggerRef.nativeElement.getBoundingClientRect();
    const dlg  = this.menuDlg.container as HTMLElement;
    dlg.style.position = 'fixed';
    dlg.style.left     = `${rect.left - 50}px`;
    dlg.style.top = `${rect.bottom + 6}px`;
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

  goToCompany() {
    this.router.navigate(['/company/dashboard']);
  }
  goToAdmin() {
    this.router.navigate(['/admin/dashboard']);
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
    document.documentElement.classList.toggle('dark', this.darkMode);
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
    if (this.menuVisible) {
      this.reposition();
    } else {
      this.removeClickListener();
    }
  }

  logout() {
    this.router.navigate(['/login']);
    this.menuVisible = false;
  }
}
