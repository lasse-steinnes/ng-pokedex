import { Component } from '@angular/core'
import { LoginService } from 'src/app/services/login/login.service'
import { NgForm } from '@angular/forms'

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent {

    constructor(private readonly loginService: LoginService){ }

    public loginSubmit(loginForm: NgForm): void {

        const { username } = loginForm.value;

        this.loginService.login(username)
        .subscribe({
            next: () => {

            },
            error: () => {

            }
        })
    }
}