import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-navigate-button",
    template: "<button (click)='navigate()'> {{content}} </button>",
    styleUrls: ["navigate-button.component.css"]
})

export class NavigateButton{
    @Input() content:string = "";
    @Input() route:string = "";

    constructor(private readonly router:Router){}

    navigate():void{
        this.router.navigateByUrl(this.route);
    }
}