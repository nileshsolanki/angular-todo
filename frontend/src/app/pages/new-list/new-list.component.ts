import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private router: Router,
    private location: Location) { }


  errormsgs: string[] = [];
  lists: any[] = null;

  ngOnInit(): void {
    this.taskService.getLists().subscribe((lists: any[]) => this.lists = lists)
  }

  createNewList = (title: string) => {

    if(title.trim() === ''){
      this.pushError('List name cannot be empty');
      return;
    }

    if(this.lists === null){
      this.pushError('Error fetching lists, please try again');
      return;
    }

    if(this.lists.some((list) => list.title === title)){
      this.pushError('List cannot have same name');
      return;
    }


    this.taskService.createList(title).subscribe((response: any) => {
      console.log(response);
      this.router.navigate([`lists/${response._id}/tasks`]);
    })
  }


  cancel = () => {
    this.location.back();
  } 


  pushError(message: string) {
    this.errormsgs.push(message);
    setTimeout(() => this.errormsgs.shift(), 4000);
  }

}
