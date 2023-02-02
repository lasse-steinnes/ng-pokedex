

import { Component, Input, OnInit } from "@angular/core";
import { IPokemonAction } from "src/app/other/interfaces";

@Component({
    selector: "app-release",
    templateUrl: "catch-and-release.component.html",
    styleUrls: ["catch-and-release.component.css"]
})

export class Release implements OnInit, IPokemonAction{
    @Input() pokemon:string = "";
    pokemonAction:string = "Release";
    enabled:boolean = false;

    //TODO: Inject trainer api service

    ngOnInit(): void {
        //TODO: Check if we own this pokemon, 
        this.enable();
    }  

    update(){
        //TODO: Check if pokemon is owned, if true disable, if not enable

        //If we now do not own this pokemon, disable
        this.disable();
    }

    execute(){



        this.update();
    }

    enable() {this.enabled = true;}
    disable() {this.enabled = false;}

}