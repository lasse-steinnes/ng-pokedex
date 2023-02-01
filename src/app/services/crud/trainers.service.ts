// service for CRUD operations for trainers

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root' // make service available everywhere.
  })

export class TrainerService {
    envURL : string;

    constructor(private http: HttpClient) { 
        this.envURL = environment.apiTrainers;
    } // make http accessible 

getAllData(): Observable<any> { // function in class TrainerService
    return this.http.get(`${this.envURL}`)
    }
}