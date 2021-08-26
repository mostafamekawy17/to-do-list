import { AddTaskComponent } from './components/add-task/add-task.component';
import { Task } from './shared/task.model';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { translateAnimation } from './shared/translate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [translateAnimation]
})
export class AppComponent {
  tasks:Task[] = [];

  constructor(public dialog: MatDialog) {
    let savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
    else {
      this.tasks = []
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '80%',
      data: []
    });
    dialogRef.afterClosed().subscribe((result)=> {
      if(result) {
        this.tasks.push({title: result.title, body: result.body})
      };
      this.saveAll();
    });

  }

  editTask(index) {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '80%',
      data: this.tasks[index]
    });
    dialogRef.afterClosed().subscribe((result)=> {
      this.tasks[index] = {title: result.title, body:result.body}
    });
    this.saveAll();
  }

  onDelete(index) {
    this.tasks.splice(index,1);
  }

  saveAll() {
    localStorage.setItem('tasks',JSON.stringify(this.tasks))
  }
  
}
