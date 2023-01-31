
import { Component, EventEmitter, Input, Output, OnInit  } from "@angular/core";

@Component({
    selector: 'app-pokemon-list',
    templateUrl: 'pokemon-list.component.html',
    styleUrls: ['pokemon-list.component.css']
})

export class PokemonList implements OnInit{
    pokemons:Pokemon[] = [];
    trainer:boolean = true;

    ngOnInit(): void {  
        this.pokemons = [new Pokemon("Ditto"), new Pokemon("Pikachu")];
    }

    isTrainerPage():boolean {
        return false;
    }

    catchPokemon(pokemon:Pokemon){
        console.log(pokemon.name + " catched");
    }

    releasePokemon(pokemon:Pokemon){
        console.log(pokemon.name + " released!");
    }
}

class Pokemon{
    name:string = "";
    imageUrl:string = "";

    constructor(name:string)
    {
        this.name = name;
    }    
}