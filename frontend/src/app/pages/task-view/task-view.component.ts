import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }
  lists : any[] = [];
  tasks : any[] = [];

  ngOnInit(): void {

    document.getElementById('btn_newtask').addEventListener('mousedown', (e)=> console.log(e))

    this.route.params.subscribe( params => {
      const listId: string = params.listId;
      this.fetchLists();
      this.fetchTasks(listId);
    })
  } 

  fetchLists = () => {
    this.taskService.getLists().subscribe( (lists : any[]) => {
      this.lists = lists;
      console.log(this.lists)
    })
  }


  fetchTasks = (listId: string) => {
    this.taskService.getTasks(listId).subscribe((tasks: any[]) => {
      this.tasks = tasks;
    })

    
    
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  handleTaskClick = (task: any) => {
    this.taskService
    .toggleCompletionStatus(task._id, task._listId, {completed: !task.completed})
    .subscribe( (list) => {
      task.completed = !task.completed;
      const idx = this.lists.findIndex( (listitem) => {
        return listitem._id == task._listId;
      })

      this.lists[idx] = list;
    })
  }

}
