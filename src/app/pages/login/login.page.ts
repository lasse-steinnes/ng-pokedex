import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: 'login.page.html',
    styleUrls: ['login.page.css']
})

export class LoginPage{

    constructor (private readonly router: Router) { }
    //routes the user from the login page to the pokemon catalogue
    handleLogin(): void{
        this.router.navigateByUrl("/pokemon-catalogue")
    }
    
}