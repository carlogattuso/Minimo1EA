import { Component, OnInit } from '@angular/core';
import {Subject} from "../models/subject";
import {schoolService} from "../services/schoolService";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {Student} from "../models/student";
import {AddPlayerComponent} from "../add-player/add-player.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  subjects: Subject[];
  currentSubject: Subject;
  currentStudent: Student;
  subjectForm: FormGroup;
  studentForm: FormGroup;
  subjectName: String;
  student: Student;
  students: Student[];
  validation_messages: any;



  constructor(private schoolService: schoolService, private router: Router,
              public dialog: MatDialog, private formBuilder: FormBuilder) {

    this.subjectForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/[A-Z][^#&<>"~;$^%{}?]{1,20}$/)]))
    });

    this.studentForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/[^A-Z][a-zA-Z][^#&<>"~;$^%{}?]{1,20}$/)])),

      address: new FormControl('', Validators.compose([
        Validators.required])),

      phoneHome: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/\(?([0-9]{2})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)])),

      phoneWork: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/\(?([0-9]{2})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)]))
    });
  }

  ngOnInit() {
    let student = new Student();
    this.updateInfo();
    this.validation_messages = {
      name: [
        { type: 'required', message: 'Name is required' },
        { type: 'pattern', message: 'Name must be in capital letter and have between 1 and 20 characters' },
        { type: 'error', message: 'Subject Name must be unique' }
      ],
      address: [
        { type: 'required', message: 'Address is required' }
      ],
      phoneHome: [
        { type: 'required', message: 'Phone Home is required' },
        { type: 'pattern', message: 'Number must be valid' },
        { type: 'error', message: 'Internal Server Error' }
      ],
      phoneWork: [
        { type: 'required', message: 'Phone Work is required' },
        { type: 'pattern', message: 'Number must be valid' },
      ]
    };
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
      console.log(data);
      if(data) {
        data.forEach(async(student) => {
          await this.schoolService.enrollStudent(this.currentSubject._id, student._id).toPromise();
          this.updateInfo();
        })
      }
    });
  }

  public addSubject(){
    let subject = new Subject();
    console.log(this.subjectName);
    subject.name = this.subjectName;
    console.log(this.subjectName);
    this.schoolService.addSubject(subject)
      .subscribe( res => {
          console.log('Res:'+ res);
          this.updateInfo();
        },
        err => {
          console.log(err);
          HomeComponent.handleError(err);
        });
  }

  public getByStudies(studies){
    console.log(studies);
    this.schoolService.getStudentsByStudies(studies).subscribe(students=>{this.students = students});
  }

  private static handleError(err: HttpErrorResponse) {
    if ( err.status === 500 ) {
      alert('Ha ocurrido un error al crear la asignatura');
    }
  }

}
