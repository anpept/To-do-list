import { Injectable } from '@angular/core';
import { Task } from '../model/Task';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  private tasksCollection: AngularFirestoreCollection<Task>;
  tasks: Observable<Task[]>;

  constructor(private angularFirestore: AngularFirestore) { 

        this.tasksCollection = angularFirestore.collection<Task>('Tasks');
        this.getTasks();
  }

  getTasks(): Observable<any[]>{    
    this.tasks = this.tasksCollection.snapshotChanges().pipe(
      map (actions => actions.map (a => {
        const data = a.payload.doc.data() as Task;
        data['dateStart'] = a.payload.doc.data()['dateStart'].toDate();
        data['dateFinish'] = a.payload.doc.data()['dateFinish'].toDate();
        return data;
      }))
    );        
    return this.tasks;
  }

  addTask(task: Task): Promise<void>{
    return new Promise (async (resolve, reject) => {
      try{
        task.id = this.angularFirestore.createId();
        const data = task;
        const result = await this.tasksCollection.doc(task.id).set(data);
        resolve(result);
      }catch (error){
        reject(error.message);
      }
    });    
  }

  updateTask(taskId: string, newState: string): Promise<void>{
    return new Promise (async (resolve, reject) => {
      try{
        //const data = task;
        const result = await this.tasksCollection.doc(taskId).update({state: newState, dateFinish: new Date()});
        resolve(result);
      }catch (error){
        reject(error.message);
      }
    }); 
  }

  deleteTask(taskId: string): Promise<void>{
    return new Promise (async (resolve, reject) => {
      try{
        const result = await this.tasksCollection.doc(taskId).delete();
        resolve (result);
      } catch (error) {
        reject(error.message);
      }
    });
  }
}
