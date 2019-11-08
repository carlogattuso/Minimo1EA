import { Injectable } from '@angular/core';
import {Environment} from "./environment";
import { HttpClient } from '@angular/common/http';
import {Subject} from "../models/subject";
import {Student} from "../models/student";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class schoolService {

  url: Environment;

  constructor(private http: HttpClient) {
    this.url = new Environment();
  }

  getSubjects(): Observable<Subject[]>{
    return this.http.get<Subject[]>(this.url.urlSubject);
  }

  getStudents(): Observable<Student[]>{
    return this.http.get<Student[]>(this.url.urlStudent);
  }
}
