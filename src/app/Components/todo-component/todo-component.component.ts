import { Component, OnInit } from '@angular/core';
import { Todo, TodoForm } from '../../TodoModel';
import { TodoServiceService } from '../../Services/todo-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-component',
  templateUrl: './todo-component.component.html',
  styleUrls: ['./todo-component.component.css']
})
export class TodoComponentComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: TodoForm = { title: '', description: '' };
  editTodo: Todo | null = null;
  todoForm: TodoForm = { title: '', description: '' };

  constructor(private todoService: TodoServiceService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos(): void {
    this.todoService.getAllTodos()
      .subscribe(
        (todos: Todo[]) => {
          this.todos = todos;
        },
        (error) => {
          console.error('Error fetching todos:', error);
          this.toastrService.error('Failed to load todos');
        }
      );
  }

  upsertTodo(): void {
    if (this.editTodo) {
      const updatedTodo: Todo = { ...this.editTodo, ...this.todoForm };
      this.todoService.editTodo(updatedTodo)
        .subscribe(
          () => {
            console.log(updatedTodo);
            this.toastrService.success('Todo updated successfully');
            this.getAllTodos();
            this.resetForm();
          },
          (error) => {
            console.error('Error updating todo:', error);
            console.log(updatedTodo);
            this.toastrService.error('Failed to update todo');
          }
        );
    } else {
      // Otherwise, create a new todo
      this.todoService.addTodo(this.todoForm)
        .subscribe(
          () => {
            this.toastrService.success('Todo added successfully');
            this.getAllTodos();
            this.resetForm();
          },
          (error) => {
            console.error('Error adding todo:', error);
            this.toastrService.error('Failed to add todo');
          }
        );
    }
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id)
      .subscribe(
        () => {
          this.toastrService.success('Todo deleted successfully');
          this.getAllTodos();
        },
        (error) => {
          console.error('Error deleting todo:', error);
          this.toastrService.error('Failed to delete todo');
        }
      );
  }

  editExistingTodo(todo: Todo): void {
    this.editTodo = { ...todo };
    this.todoForm = { title: todo.title, description: todo.description };
  }

  resetForm(): void {
    this.newTodo = { title: '', description: '' };
    this.editTodo = null;
    this.todoForm = { title: '', description: '' };
  }
}
