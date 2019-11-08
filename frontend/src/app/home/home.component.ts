import { Component, OnInit } from '@angular/core';
import {Subject} from "../models/subject";
import {schoolService} from "../services/schoolService";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {Student} from "../models/student";
import {AddPlayerComponent} from "../add-player/add-player.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  subjects: Subject[];
  currentSubject: Subject;
  currentStudent: Student;

  constructor(private schoolService: schoolService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.updateInfo();
    console.log('HOlaaa');
  }

  updateInfo(){
    this.schoolService.getSubjects().subscribe(subjects=>{this.subjects = subjects});
  }

  public subjectSelect(subject){
    this.currentSubject = subject;
  }

  public studentSelect(student){
    this.currentStudent = student;
  }

  public addPlayer(){
    const dialogRef = this.dialog.open(AddPlayerComponent,{
      width: '50%',
      height: '70%',
    });
    dialogRef.afterClosed().subscribe(data=>{

    });
  }

}
