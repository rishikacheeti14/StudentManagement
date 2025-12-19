import { Routes } from '@angular/router';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { Students } from './components/students/students';
import { StudentForm } from './components/student-form/student-form';

export const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'students', component: Students },
  { path: 'add-student', component: StudentForm },
  { path: 'edit-student/:id', component: StudentForm },
];
