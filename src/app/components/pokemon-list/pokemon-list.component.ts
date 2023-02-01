
import { Component, EventEmitter, Input, Output, OnInit  } from "@angular/core";
import { PokeAction } from "src/app/other/enums";

@Component({
    selector: 'app-pokemon-list',
    templateUrl: 'pokemon-list.component.html',
    styleUrls: ['pokemon-list.component.css']
})

export class PokemonList implements OnInit{
    pokemons:Pokemon[] = [];
    pokemonsOwned:string[] = [];

    @Input() action:string = PokeAction.Disabled;
    storedAction:string = PokeAction.Disabled;

    get pokeAction(): typeof PokeAction { return PokeAction; }

    ngOnInit(): void {  
        this.pokemons = [new Pokemon("Ditto"), new Pokemon("Pikachu")];
        this.pokemonsOwned.push("Pikachu");

        for(let pokemon of this.pokemons)
        {
            if(this.hasPokemon(pokemon.name) && this.action === PokeAction.Release)
            {
                pokemon.action = PokeAction.Release;
            }
            else if(!this.hasPokemon(pokemon.name) && this.action === PokeAction.Catch)
            {
                pokemon.action = PokeAction.Catch;
            }
            else
            {
                pokemon.action = PokeAction.Disabled;
            }            
        }

        console.log(this.action);
    }

    calculateAction(pokemon:Pokemon)
    {

    }

    executeAction(pokemon:Pokemon){
        console.log(pokemon.name + " " + pokemon.action);
        
    }

    hasPokemon(pokemonName:string) {return this.pokemonsOwned.find(pokemon => pokemon === pokemonName) != undefined; }
}




class Pokemon{
    json:PokemonJson;
    action:string = "";

    constructor(name:string)
    {
        this.json = new PokemonJson(name);
    }  
    
    get name() { return this.json.name; }
    get imageUrl() { return this.json.imageUrl; }
}

class PokemonJson{
    name:string = "";
    imageUrl:string = "";

    constructor(name:string)
    {
        this.name = name;
    }
}