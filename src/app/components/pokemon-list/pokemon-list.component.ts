
import { Component, EventEmitter, Input, Output, OnInit  } from "@angular/core";

@Component({
    selector: 'app-pokemon-list',
    templateUrl: 'pokemon-list.component.html',
    styleUrls: ['pokemon-list.component.css']
})

export class PokemonList implements OnInit{
    pokemons:Pokemon[] = [];
    action:PokeAction = PokeAction.Catch;

    get pokeAction(): typeof PokeAction { return PokeAction; }

    ngOnInit(): void {  
        this.pokemons = [new Pokemon("Ditto"), new Pokemon("Pikachu")];
        this.action = PokeAction.Catch;
    }

    catchPokemon(pokemon:Pokemon){
        console.log(pokemon.name + " catched");
    }

    releasePokemon(pokemon:Pokemon){
        console.log(pokemon.name + " released!");
    }
}

export enum PokeAction{
    Catch, Release
}


class Pokemon{
    name:string = "";
    imageUrl:string = "";

    constructor(name:string)
    {
        this.name = name;
    }    
}