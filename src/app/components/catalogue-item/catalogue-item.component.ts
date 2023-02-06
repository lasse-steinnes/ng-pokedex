import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { PokemonModel, StatsModel } from "src/app/models/pokemon.model";
import { PokemonCatalogueService } from "src/app/services/pokemon-catalogue/pokemon-catalogue.service";
import { UserService } from "src/app/services/user/user.service";

@Component({
    selector: "app-catalogue-item",
    templateUrl: "catalogue-item.component.html",
    styleUrls: ["catalogue-item.component.css"]
})

export class CatalogueItem implements OnInit {
    @Input() json?: PokemonModel;
    private _pokeStats: StatsModel[] = [];
    @Input() isCaught: boolean = false;
    @Output() onCatched: EventEmitter<CatalogueItem> = new EventEmitter<CatalogueItem>();

    private detailed: boolean = false;
    hasFetchedDetails:boolean = false;

    constructor(
        private readonly pokemonCatalogueService:PokemonCatalogueService,
        private readonly userService: UserService
    ) { }

    private get loading(): boolean {
        return this.userService.loading;
    }

    getStat(stat:number){
        return this._pokeStats[stat].base_stat;
    }
    
    btnCatch(): void {
        if(this.json != undefined)
        {
            this.userService.catchPokemon(this.json.name);
            this.isCaught = true;
        }
        else console.log("json undefined");
    }

    ngOnInit(): void {
        //TODO: Is caught?
        this.isCaught = this.userService.pokemonOwned(this.json?.name)
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
            console.log(this.json.id);
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

    showDetails() { this.detailed = true }
    hideDetails() { this.detailed = false }

    get isDetailed() {return this.detailed;}
    get pokemonModel() {return this.json;}
    set setIsCaught(caught:boolean) {this.isCaught = caught;}
}