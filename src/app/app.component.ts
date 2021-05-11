import { Component, OnInit} from '@angular/core';
import { TaskService } from './services/task.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'To Do List - Daw2';
  date: Date;
  tasks;
  sortedTasks;
 

  constructor(private taskService: TaskService){
    
  }

  ngOnInit(){
    this.date = new Date('12/12/2019');
    this.taskService.getTasks().subscribe(
      tasks => {
        console.log(tasks);
        this.tasks = tasks;
        this.sortedTasks = this.tasks.slice()}, 
      err => console.log(err)

    )
  }  

  addTask(task){
    let newId = this.tasks[this.tasks.length - 1].id + 1;
    this.tasks.push({id: newId, task: task, date: new Date, state:"Pendiente"});
    this.sortedTasks = this.tasks.slice();
  }

  delTask(id){
    let index = this.tasks.findIndex((item:any)=> item.id == id, id);
    if (index > -1 ){
      this.tasks.splice(index, 1);
    }
    this.sortedTasks = this.tasks.slice();
  }

  sortData(sort: Sort) {
    const data = this.tasks.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedTasks = data;
      return;
    }
    this.sortedTasks = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'task': return compare(a.task, b.task, isAsc);
        case 'date': return compare(a.date, b.date, isAsc);
        case 'state': return compare(a.state, b.state, isAsc);
        default: return 0;
      }
    });
  }

  
}
function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
