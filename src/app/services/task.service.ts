import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../model/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  

  constructor(private httpClient: HttpClient) { 
        
  }

  getTasks(){    
    return this.httpClient.get<Task[]>("../../assets/todo.json");
  }
}
