import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PokemonModel, StatsModel } from "src/app/models/pokemon.model";
import { PokemonCatalogueService } from "src/app/services/pokemon-catalogue/pokemon-catalogue.service";
import { UserService } from "src/app/services/user/user.service";

@Component({
    selector: "app-trainer-item",
    templateUrl: "trainer-item.component.html",
    styleUrls: ["trainer-item.component.css"]
})

export class TrainerItem{
    @Input() json?:PokemonModel;
    private _pokeStats: StatsModel[] = [];
    @Output() onRelease:EventEmitter<PokemonModel> = new EventEmitter<PokemonModel>();

    detailed:boolean = false;
    hasFetchedDetails:boolean = false;

    constructor ( private readonly pokemonCatalogueService:PokemonCatalogueService, private readonly userService:UserService ) { }

    getStat(stat:number){
        return this._pokeStats[stat].base_stat;
    }

    btnRelease():void {       
        if(this.json != undefined)
        {
            this.userService.catchPokemon(this.json.name);
            this.onRelease.emit(this.json);
        }
        else
            console.log("Json invalid!");
    }

    btnShowDetails():void {
        if(this.hasFetchedDetails)
            this.showDetails();
        else
            this.fetchDetails();
    }

    fetchDetails():void{
        if(this.json != undefined)
        {
            this.pokemonCatalogueService.findSpecs(this.json.id).subscribe({
                next: (stats: StatsModel[]) => { // in completion return array 
                    console.log(stats)    
                   this._pokeStats = stats; //s[0].base_stat; // stats    
                   console.log(this._pokeStats)
                    this.showDetails();
                },
                error: (error: HttpErrorResponse) => { // when something goes wrong
                    console.log("ERROR : " + error.message);
                } 
            })
        }
    }

    showDetails(){ this.detailed = true }
    hideDetails(){ this.detailed = false }
}