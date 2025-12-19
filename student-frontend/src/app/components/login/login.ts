import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = signal('');
  password = signal('');
  error = signal('');

  constructor(private service: StudentService, private router: Router) {}

  login() {
  this.service.login(this.email(), this.password()).subscribe({
    next: res => {
      localStorage.setItem('token', res.token);

      alert('Login successful !!');   

      this.router.navigate(['/students']); 
    },
    error: () => this.error.set('Invalid credentials'),
  });
}

}
