import { Component, OnInit } from "@angular/core";
import { PokemonModel } from "src/app/models/pokemon.model";
import { User } from "src/app/models/user.model";
import { PokemonCatalogueService } from "src/app/services/catalogue/catalogue.service";
import { UserService } from "src/app/services/user/user.service";
import { CatalogueItem } from "../catalogue-item/catalogue-item.component";

@Component({
    selector:"app-catalogue-list",
    templateUrl:"catalogue-list.component.html",
    styleUrls: ["catalogue-list.component.css"]
})

export class CatalogueList implements OnInit{    

    items:PokemonModel[] = [];

    constructor(
        private readonly pokemonCatalogueService: PokemonCatalogueService,
        private readonly userService:UserService
        ) {
        
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

    catchPokemon(item:CatalogueItem)
    {
        //TODO: add pokemon name to user service
        console.log(item.pokemonModel?.name + " added to trainer service!");

        if(item.pokemonModel != undefined)
        {
            this.userService.catchPokemon(item.pokemonModel?.name);
        }
    }
}