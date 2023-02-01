// service for CRUD operations for trainers
/*
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root' // make service available everywhere.
  })

export interface OneTrainer {
    id: number;
    username: string;
    pokemon: string[];
}


export class TrainerService {
    envURL : string;
    envAPI_KEY: string;

    constructor(private http: HttpClient) { 
        this.envURL = environment.apiTrainers;
        this.envAPI_KEY = environment.API_KEY;
      
    } // make http accessible 

    private _httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json; charset=utf-8',
          'x-api-key': environment.API_KEY,
        }),
      };

 getTrainers(): Observable<any> { // function in class TrainerService
    return this.http.get(`${this.envURL}`)
    }

postData(data: any): Observable<any> {
    return this.http.post(`${this.envURL}/post`, data)
    }

public addTrainer(username: string): void {
    console.log('adding trainer');
    this.http
      .post<any>(
        this.envURL,
        { username: username, pokemon: [] },
        this._httpOptions
      )
      .subscribe((data) => {
        this.fetchTrainer(data.username, '/login');
      });
  }

   //Fetches userinfo from the API. Checks if the username exists on the API,
  // otherwise adds the new user to the API.
  public fetchTrainer(username: string, fromUrl: string): void {
    this.http
      .get<Trainer[]>(this.envURL + `?username=` + username)
      .subscribe((trainer) => {
        //trainer doesn't exist
        if (trainer.length === 0) {
          //username doesn't exist, create one.
          this.addTrainer(username);
        }
        //trainer exists
        //else {
        // //set localStorage with user.
        //  this._trainer = trainer[0];
        //  localStorage.setItem('currentTrainer', JSON.stringify(this._trainer));
        //  //navigate to catalogue page if logging in on landing page.
        //  if (fromUrl === '/landing') {
        //    this.router.navigate(['catalogue']);
        //  }
        //}
      });
  }

/*
  // Demo play
submitData(value: any) {
    let body = {
      name: ,
      age: value.age
    }
  }  

this.userService.postData(body)
  .subscribe(response => {
    	console.log(response)
})

{
    "id": 1,
    "username": "ash",
    "pokemon": [
      "bulbasaur",
      "pikachu"
    ]
  } 

}*/ 