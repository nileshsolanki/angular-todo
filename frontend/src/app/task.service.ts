import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  

  constructor(private web: WebService) { }

  domain: string = 'http://localhost:3000'

  getLists = () => {
    return this.web.get( `${this.domain}/lists` );
  }


  createList = (title: string) => {
    return this.web.post(`${this.domain}/lists`, {title});
  }

  getTasks = (listId: string) => {
    return this.web.get(`${this.domain}/lists/${listId}/tasks` );
  }

  createTask = (listId: string, payload: Object) => {
    return this.web.post(`${this.domain}/lists/${listId}/tasks`, payload);
  }

  toggleCompletionStatus(taskId: string, listId: string, payload: Object) {
    return this.web.patch(`${this.domain}/lists/${listId}/tasks/${taskId}`, payload );
  }



}
