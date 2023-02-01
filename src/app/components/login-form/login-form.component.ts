import { Component, EventEmitter, Output } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login/login.service'
import { UserService } from 'src/app/services/user/user.service';


@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent {

    @Output() login: EventEmitter<void> = new EventEmitter();

    constructor(
        private readonly loginService: LoginService,
        private readonly userService: UserService
        ){ }

    public loginSubmit(loginForm: NgForm): void {

        const { username } = loginForm.value;

        console.log(username);
        
        

        this.loginService.login(username)
        .subscribe({
            next: (user: User) => {
                console.log(user)
                this.userService.user = user;
                this.login.emit();
            },
            error: () => {

            }
        })
    }
}