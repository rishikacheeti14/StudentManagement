import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../services/student-service';
import { Student } from '../../models/student';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-form.html',
  styleUrl: './student-form.css',
})
export class StudentForm implements OnInit {

  id = 0;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: StudentService
  ) {}

  ngOnInit(): void {
   
    this.form = this.fb.group({
      name: ['', Validators.required],
      class: ['', Validators.required],
      section: ['', Validators.required],
    });

 
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.service.getStudents().subscribe(list => {
        const student = list.find(s => s.id === this.id);
        if (student) {
          this.form.patchValue(student);
        }
      });
    }
  }

submit(): void {
  if (this.form.invalid) return;

  const student: Student = {
    id: this.id,
    name: this.form.value.name!,
    class: this.form.value.class!,
    section: this.form.value.section!
  };

  const request$ = this.id
    ? this.service.updateStudent(student)
    : this.service.addStudent(student);

  request$.subscribe(() => {
    this.router.navigate(['/students']);
  });
}

}