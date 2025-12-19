import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router ,RouterModule} from '@angular/router';
import { StudentService } from '../../services/student-service';
import { Student } from '../../models/student';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students {
  students = signal<Student[]>([]);

  constructor(private service: StudentService, private router: Router) {
    this.load();
  }

  load() {
    this.service.getStudents().subscribe(res => this.students.set(res));
  }

  edit(s: Student) {
    this.router.navigate(['/edit-student', s.id]);
  }

  delete(id: number) {
    this.service.deleteStudent(id).subscribe(() => this.load());
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
