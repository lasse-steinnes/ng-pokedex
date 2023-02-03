import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { PokemonJson, PokemonModel } from "src/app/models/pokemon.model";
import { User } from "src/app/models/user.model";
import { TrainerService } from "src/app/services/trainer/trainer.service";

import { PokemonModel } from "src/app/models/pokemon.model";

@Component({
    selector: "app-catalogue-item",
    templateUrl: "catalogue-item.component.html",
    styleUrls: ["catalogue-item.component.css"]
})

export class CatalogueItem implements OnInit{    
    @Input() json?: PokemonModel;
    @Output() onCatched:EventEmitter<string> = new EventEmitter<string>();
    isCaught:boolean = false;
    detailed:boolean = false;


    constructor(
        private readonly trainerService: TrainerService
    ) { }
    
    onCatchClick(): void {
        this.trainerService.addToPokemonArray(this.json?.name)
        .subscribe({
            next: (response: User) => {
                console.log("NEXT", response)
            },
            error: (error: HttpErrorResponse)=> {
                console.log("ERROR", error.message);
            }
        })
    }

    btnCatch():void{
        this.onCatchClick();
        console.log(this.json?.name + " catched!");

        
        if(this.json?.name != undefined)
        {
            this.onCatched.emit(this.json.name);
            this.isCaught = true;
        }
        else
        {
            console.log("Pokemon data invalid!");
        }
    }

    ngOnInit(): void {
        //TODO: Is caught?
    }

    showDetails(){this.detailed = true}
    hideDetails(){this.detailed = false}
}