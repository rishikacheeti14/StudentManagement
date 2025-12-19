import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private apiUrl = 'http://localhost:5044/api/students';
  private authUrl = 'http://localhost:5044/api/auth';

  constructor(private http: HttpClient) {}

  
  login(email: string, password: string) {
    return this.http.post<any>(`${this.authUrl}/login`, { email, password });
  }

register(email: string, password: string) {
  return this.http.post(
    `${this.authUrl}/register`,
    { email, password },
    { responseType: 'text' } 
  );
}


  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: { Authorization: `Bearer ${token}` },
    };
  }

 
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl, this.getAuthHeaders());
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, student, this.getAuthHeaders());
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(
      `${this.apiUrl}/${student.id}`,
      student,
      this.getAuthHeaders()
    );
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      this.getAuthHeaders()
    );
  }
  
}
