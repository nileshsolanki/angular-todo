import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  

  constructor(private web: WebService) { }

  // domain: string = 'https://ngtaskmanager.herokuapp.com'
  domain: string = 'http://localhost:3000';

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

  updateTask = (taskId: string, listId: string, payload: Object) => {
    return this.web.patch(`${this.domain}/lists/${listId}/tasks/${taskId}`, payload);
  }

  persitIndices = (task: any, prevIdx: number, currIdx: number, total: number) => {
    const payload = {
      task: task,
      currIdx: currIdx,
      start: prevIdx + 1 < currIdx ? prevIdx + 1 : currIdx,
      end:  currIdx > prevIdx - 1 ? currIdx : prevIdx - 1,
      total: total,
      factor: prevIdx - currIdx < 0 ? -1 : 1
    }
    
    return this.web.patch(`${this.domain}/lists/${task._listId}/tasks/save`, payload);
  }



}
