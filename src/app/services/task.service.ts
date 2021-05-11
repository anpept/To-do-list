import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private items=[];

  constructor(private httpClient: HttpClient) { 
        
  }

  getTasks(){    
    return this.httpClient.get("../../assets/todo.json");
  }
}
