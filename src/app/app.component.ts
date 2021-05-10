import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'To Do List - Daw2';

  addTask(task){
    alert('La tarea es: ' + task);
  }
}
