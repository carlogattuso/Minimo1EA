import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {schoolService} from "../services/schoolService";
import {Student} from "../models/student";

@Component({
  selector: 'app-add-player',
  templateUrl: './add-player.component.html',
  styleUrls: ['./add-player.component.css']
})
export class AddPlayerComponent implements OnInit {

  students: Student[];
  checked: boolean[] = [];

  constructor(public dialogRef: MatDialogRef<AddPlayerComponent>,
              private schoolService: schoolService) { }

  ngOnInit() {
    this.schoolService.getStudents().subscribe(students =>{
      this.students=students;
      //Initialize the array of booleans bounded to the corresponding checkboxes
      this.students.forEach((student, i)=>{
        this.checked[i] = false;
      });
    });
  }

  closeDialog(){
    //If operation is canceled the dialog closes without returning any students
    this.dialogRef.close()
  }

  addStudents(){
    let newStudents: Student[] = [];
    //Add students to array only if their checkbox is checked
    this.students.forEach((student, i)=>{
      if(this.checked[i]) {
        newStudents.push(student)
      }
      });
    //Return an array of all the students with their checkbox checked
    this.dialogRef.close(newStudents);
  }
}
