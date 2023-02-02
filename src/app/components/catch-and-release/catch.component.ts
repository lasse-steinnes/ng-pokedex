import { Component, Input, OnInit } from "@angular/core";
import { IPokemonAction } from "src/app/other/interfaces";

@Component({
    selector:"app-catch",
    templateUrl: "catch-and-release.component.html",
    styleUrls: ["catch-and-release.component.css"]
})

export class Catch implements OnInit, IPokemonAction {    
    @Input() pokemon:string = "";
    pokemonAction:string = "Catch";
    enabled:boolean = false;

    //TODO: Inject trainer api service

    ngOnInit(): void {
        this.enable();
    }  

    update(){
        //TODO: Check if pokemon is owned, if true disable, if not enable

        //If we now own this pokemon, disable
        this.disable();
    }

    execute(){


        this.update();
    }

    enable() {this.enabled = true;}
    disable() {this.enabled = false;}
}