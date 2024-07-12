import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constant';
import { EditTodo, Todo, TodoForm } from '../TodoModel';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {
  updateTodo(editTodo: Todo) {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'http://localhost:3000/todos'; // Replace with your API endpoint

  
  constructor(private http: HttpClient) { }

  getAllTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(API_ENDPOINTS.GET_TODOS);
  }

  addTodo(todo: TodoForm): Observable<any> {
    return this.http.post(API_ENDPOINTS.CREATE_TODO, todo);
  }

  editTodo(todo: Todo): Observable<any> {
    const url = API_ENDPOINTS.UPDATE_TODO(todo.Id);
    return this.http.put(url, todo);
  }

  deleteTodo(Id: number): Observable<any> {
    const url = API_ENDPOINTS.DELETE_TODO(Id);
    return this.http.delete(url);
  }
}
