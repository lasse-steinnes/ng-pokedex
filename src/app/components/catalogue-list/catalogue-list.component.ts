import { Component, OnInit } from "@angular/core";
import { PokemonJson, PokemonModel } from "src/app/models/pokemon.model";
import { PokemonCatalogueService } from "src/app/services/catalogue/catalogue.service";

@Component({
    selector:"app-catalogue-list",
    templateUrl:"catalogue-list.component.html",
    styleUrls: ["catalogue-list.component.css"]
})

export class CatalogueList implements OnInit{    

    items:PokemonModel[] = [];

    constructor(private readonly pokemonCatalogueService: PokemonCatalogueService) {
        
    }    

    get pokemons():PokemonModel[]{return this.pokemonCatalogueService.pokemons;}

    get loading(): boolean { // expose loading: true/false
        return this.pokemonCatalogueService.loading;
    }

    get error(): string {
        return this.pokemonCatalogueService.error;
    }    

    ngOnInit(): void {
        this.pokemonCatalogueService.findAllPokemon();
        //this.items = this.pokemonCatalogueService.pokemons;
    }

    catchPokemon(pokemonName:string)
    {
        //TODO: add pokemon name to user service
        console.log(pokemonName + " added to trainer service!");
    }
}