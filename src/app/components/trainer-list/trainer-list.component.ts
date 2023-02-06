import { Component, OnInit  } from "@angular/core";
import { PokemonModel } from "src/app/models/pokemon.model";
import { PokemonCatalogueService } from "src/app/services/catalogue/catalogue.service";
import { UserService } from "src/app/services/user/user.service";

@Component({
    selector: 'app-trainer-list',
    templateUrl: 'trainer-list.component.html',
    styleUrls: ['trainer-list.component.css'],
    providers: []
})

export class TrainerList implements OnInit{     
    items?:PokemonModel[];

    ngOnInit(): void {
        //TODO: Fetch data
        this.items = this.userService.ownedPokemons;
    }   

    //should be called if a change is made to the items
    update(){
        this.items = this.userService.ownedPokemons;
    }

    constructor(private readonly pokemonCatalogueService:PokemonCatalogueService, private readonly userService:UserService) {
        this.pokemonCatalogueService.findAllPokemon();
    }    

    get pokemons():PokemonModel[]{return this.pokemonCatalogueService.pokemons;}

    get loading(): boolean { // expose loading: true/false
        return this.pokemonCatalogueService.loading;
    }

    get error(): string {
        return this.pokemonCatalogueService.error;
    }    

    catchPokemon(pokemonName:string)
    {
        //TODO: add pokemon name to user service
        console.log(pokemonName + " added to trainer service!");
    }
}