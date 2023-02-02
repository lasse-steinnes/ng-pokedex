
import { Component, EventEmitter, Input, Output, OnInit  } from "@angular/core";
import { PokeAction } from "src/app/enums/poke-action.enum";
import { PokemonJson } from "src/app/models/pokemon.model";
import { PokemonCatalogueService } from "src/app/services/catalogue/catalogue.service";
import { PokemonModel } from "src/app/models/pokemon.model";

@Component({
    selector: 'app-pokemon-list',
    templateUrl: 'pokemon-list.component.html',
    styleUrls: ['pokemon-list.component.css'],
    providers: []
})

export class PokemonList implements OnInit{
    
    /*get

    <li *ngFor = "let pokemon of pokemons" >
    <span> {{ pokemon }} </span>
  </li>
    
    constructor(
            private readonly pokemonCatalogueservice: PokemonCatalogueService)
            { }
    */
    items:Item[] = [];//items to display
    pokemonsOwned:string[] = [];//owned pokemons

    @Input() pokemons: PokemonModel[] = [];
    @Input() action:PokeAction = PokeAction.Disabled;

    get pokeAction(): typeof PokeAction { return PokeAction; }

    ngOnInit(): void {  
        //this.pokemonCatalogueservice.findAllPokemon();

        this.items = [new Item(new PokemonJson("Ditto")), new Item(new PokemonJson("Pikachu"))];
        // this.pokemons = [new Pokemon("Ditto"), new Pokemon("Pikachu")];
         this.pokemonsOwned.push("Pikachu");        

        for(let item of this.items)
        {
            if(this.hasPokemon(item.pokemon.name) && this.action === PokeAction.Release)
            {
                item.availableAction = PokeAction.Release;
            }
            else if(!this.hasPokemon(item.pokemon.name) && this.action === PokeAction.Catch)
            {
                item.availableAction = PokeAction.Catch;
            }
            else
            {
                item.availableAction = PokeAction.Disabled;
            }            
        }
    }

    getAction(pokemon:PokemonJson):PokeAction
    {
        let result = PokeAction.Disabled;

        switch(this.action)
        {
            case PokeAction.Catch:
                if(!this.hasPokemon(pokemon.name))
                    result = PokeAction.Catch;
            break;
            case PokeAction.Release:
                if(this.hasPokemon(pokemon.name))
                    result = PokeAction.Release;
            break;
            default:

            break;
        }

        return result;
    }

    executeAction(item:Item)
    {
        switch(this.getAction(item.pokemon))
        {
            case PokeAction.Catch:
                //TODO: Catch
                console.log("Catching " + item.pokemon.name + " . . .");
                this.pokemonsOwned.push(item.pokemon.name);
                item.availableAction = PokeAction.Disabled;
            break;
            case PokeAction.Release:
                //TODO: Release
                console.log("Releasing " + item.pokemon.name + " . . .");
                let index:number =  this.pokemonsOwned.findIndex(pokemon => pokemon === item.pokemon.name);
                if(index >= 0)
                {
                    delete this.pokemonsOwned[index];
                    item.availableAction = PokeAction.Disabled;
                }
            break;
            default:

            break;           
        }
    }

    hasPokemon(pokemonName:string) {return this.pokemonsOwned.find(pokemon => pokemon === pokemonName) != undefined; }
}

class Item{
    pokemon:PokemonJson;
    availableAction:PokeAction;

    constructor(pokemon:PokemonJson)
    {
        this.pokemon = pokemon;
        this.availableAction = PokeAction.Disabled;
    }
}