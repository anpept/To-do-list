import { Component } from '@angular/core';
import { TaskService } from './services/task.service';
import { Task } from './model/Task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'To Do List - Daw2';

  constructor(private taskService: TaskService){ }

  addTask(newTask){
    const task: Task = {
      id: '',
      task: newTask,
      dateStart: new Date,
      dateFinish: new Date('12/12/2099'),
      state: 'Pendiente'
    }    
    this.taskService.addTask(task);
  }
  
}

