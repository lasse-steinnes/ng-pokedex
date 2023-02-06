import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/services/user/user.service";

@Component({
    selector: "app-navigate-button",
    templateUrl: "navigate-button.component.html",
    styleUrls: ["navigate-button.component.css"]
})

export class NavigateButton{
    @Input() content:string = "";
    @Input() route:string = "";

    constructor(private readonly router:Router, private readonly userService:UserService){}

    navigate():void{
        if(this.route === "login")
            this.userService.user = undefined;

        this.router.navigateByUrl(this.route);
    }
}