import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TrainerService } from 'src/app/services/crud/trainers.service';

@Component({
    selector: 'app-login-page',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.css']
})

export class LoginPage{

    constructor (private readonly router: Router, private trainerSevice: TrainerService) { }

    handleLogin(): void{
        this.router.navigateByUrl("/trainer")
    }
    
    ngOnInit() {
        this.trainerService.getTrainers()
          .subscribe(data => {
            console.log(data)
          })
      }
}