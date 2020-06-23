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

  ngOnInit(): void {
  }

  createNewList = (title: string) => {
    this.taskService.createList(title).subscribe((response: any) => {
      console.log(response);
      this.router.navigate([`lists/${response._id}/tasks`]);
    })
  }


  cancel = () => {
    this.location.back();
  } 

}
