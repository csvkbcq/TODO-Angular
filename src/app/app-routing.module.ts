import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponentComponent } from './Components/todo-component/todo-component.component';

const routes: Routes = [
  { path: '', redirectTo: 'todo', pathMatch: 'full'},
  { path: 'todo', component: TodoComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }