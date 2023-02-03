import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { IPokemonAction } from "src/app/other/interfaces";
import { TrainerService } from "src/app/services/trainer/trainer.service";

@Component({
    selector:"app-catch",
    templateUrl: "catch-and-release.component.html",
    styleUrls: ["catch-and-release.component.css"]
})

export class Catch implements OnInit, IPokemonAction {    
    @Input() pokemon:string = "";
    pokemonAction:string = "Catch";
    enabled:boolean = false;

    get loading(): boolean{
        return this.trainerService.loading
    }

    constructor (
        private readonly trainerService: TrainerService
    ) {}

    //TODO: Inject trainer api service

    ngOnInit(): void {
        this.enable();
    }  

    onCatchClick(): void {
        this.trainerService.addToPokemonArray(this.pokemon)
        .subscribe({
            next: (response: any) => {
                console.log("NEXT", response)
            },
            error: (error: HttpErrorResponse)=> {
                console.log("ERROR", error.message);
            }
        })
    }

    update(){
        //TODO: Check if pokemon is owned, if true disable, if not enable

        //If we now own this pokemon, disable
        this.disable();
    }

    execute(){
        this.onCatchClick()

        this.update();
    }

    enable() {this.enabled = true;}
    disable() {this.enabled = false;}
}