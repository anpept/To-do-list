import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../model/Task';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.scss']
})
export class TasklistComponent implements OnInit {  
  tasks: Task[];
  sortedTasks;
  showInProcess: boolean = true;
  showPending: boolean =true;
  showFinished: boolean = false;
 

  constructor(private taskService: TaskService){ }

  ngOnInit(){
    this.taskService.getTasks().subscribe(
      tasks => {
        this.tasks = tasks;
        this.sortedTasks = this.tasks.slice()},
        err => console.log(err)      
    );
  }  

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

  delTask(id){
    this.taskService.deleteTask(id);
  }

  changeState(id, newState){
    this.taskService.updateTask(id, newState);    
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
        case 'dateStart': return compare(a.dateStart, b.dateStart, isAsc);
        case 'dateFinish': return compare(a.dateFinish, b.dateFinish, isAsc);
        case 'state': return compare(a.state, b.state, isAsc);
        default: return 0;
      }
    });
  }

  hasTask(state: string): boolean{
    if (this.sortedTasks.length === 0){
      return false;
    } else {
      if (state === 'Finalizado'){
        for (let index = 0; index < this.sortedTasks.length; index++) {
          if (this.sortedTasks[index].state === 'Finalizado'){
            return true;
          }                    
        }
        return false;
      } else {
        for (let index = 0; index < this.sortedTasks.length; index++) {
          if (this.sortedTasks[index].state === state){
            return true;
          }                    
        }
        return false;
      }
    }
  }
}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  console.log ('paso por aquí con dato');
  console.log(a);
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
  


