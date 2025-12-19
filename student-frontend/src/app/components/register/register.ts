import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student-service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  email = signal('');
  password = signal('');
  error = signal('');

  constructor(private service: StudentService, private router: Router) {}
register() {
  this.error.set('');

  this.service.register(this.email(), this.password()).subscribe({
    next: () => {
      alert('Registration successful !!!');   
      this.router.navigate(['/login']);     
    },
    error: err => {
      this.error.set(
        typeof err.error === 'string'
          ? err.error
          : 'Registration failed'
      );
    }
  });
}





}
