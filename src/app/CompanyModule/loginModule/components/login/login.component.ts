import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  errors = { email: '', password: '' };
  showPassword = false;
  loginError: string | null = null;
  showDialog = false;

  constructor(private router: Router) {}

  handleLogin() {
    this.loginError = null;
    this.errors = { email: '', password: '' };
    let hasError = false;

    if (!this.email) {
      this.errors.email = 'O email é obrigatório';
      hasError = true;
    }
    if (!this.password) {
      this.errors.password = 'A senha é obrigatória';
      hasError = true;
    }
    if (hasError) return;

    // Aqui você chamaria seu service (authService.login)
    // Simulação:
    if (this.email === 'admin' && this.password === 'admin') {
      localStorage.setItem('token', 'fake-token');
      this.router.navigate(['/select-company']);
    } else {
      this.loginError = 'Credenciais inválidas. Tente novamente.';
    }
  }
}
