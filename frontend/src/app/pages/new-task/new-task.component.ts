import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {

  constructor(
    private taskService: TaskService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {}


  createNewTask = (taskDesc: string) => {
    this.route.params.subscribe( params => {
      const listId: string = params.listId;
      this.taskService.createTask(listId, {title: taskDesc}).subscribe( (task: any) => {
        console.log(task);
        this.router.navigate(['lists', listId, 'tasks'])
      })
    })
    
  }




}
