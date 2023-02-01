import { Component } from '@angular/core';
import { TrainerService } from 'src/app/services/crud/trainers.service';

@Component({
    selector: 'app-login-page',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.css']
})

export class LoginPage{
    constructor(private trainerService: TrainerService){ // make instance of trainerservice on login
    }
    ngOnInit() {
        this.trainerService.getTrainers()
          .subscribe(data => {
            console.log(data)
          })
      }
}