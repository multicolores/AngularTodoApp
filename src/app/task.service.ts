import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Task } from './interface/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  private apiTasksUrl = 'http://localhost:8080/api/tasks';

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiTasksUrl)
    .pipe(
      catchError(this.handleError<Task[]>('getTasks', []))
    );
  }

  createTask(newTask: Task): Observable<Task> {
    return this.http.post<Task>(this.apiTasksUrl, newTask, this.httpOptions).pipe(
      catchError(this.handleError<Task>('create new task error'))
    );
  }

  deleteTask(id: number): Observable<Task> {
    const url = `${this.apiTasksUrl}/${id}`;
    return this.http.delete<Task>(url, this.httpOptions).pipe(catchError(this.handleError<Task>('deleteData')));
  }

  putTask(id: number, updatedTask: Task):Observable<Task>{
    const url = `${this.apiTasksUrl}/${id}`;
    return this.http.put<Task>(url, updatedTask, this.httpOptions).pipe(catchError(this.handleError<Task>('putData')));
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
