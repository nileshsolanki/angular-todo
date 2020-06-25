import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  errormsgs: string[] = [];

  constructor(
    private taskService: TaskService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {}


  createNewTask = (taskDesc: string) => {

    if(taskDesc.trim() === ''){
      this.pushError('Task description cannot be empty');
      return;
    }

    this.route.params.subscribe( params => {
      const listId: string = params.listId;
      this.taskService.createTask(listId, {title: taskDesc}).subscribe( (task: any) => {
        console.log(task);
        this.router.navigate(['lists', listId, 'tasks'])
      })
    })
    
  }


  pushError(message: string) {
    this.errormsgs.push(message);
    setTimeout(() => this.errormsgs.shift(), 4000);
  }

}
