import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import { TrainerService } from 'src/app/services/crud/trainers.service';

@Component({
    selector: 'app-login-page',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.css']
})

export class LoginPage{
    //routes the user from the login page to the pokemon catalogue
    constructor (private readonly router: Router) { } // ,private trainerService: TrainerService 
    /*ngOnInit() {
        this.trainerService.getTrainers()
          .subscribe(data => {
            console.log(data)
          })
      }*/


    handleLogin(): void{
        this.router.navigateByUrl("/pokemon-catalogue")
    }
    
}