
import { Component, EventEmitter, Input, Output, OnInit  } from "@angular/core";
import { PokeAction } from "src/app/enums/poke-action.enum";
import { PokemonJson } from "src/app/models/pokemon.model";

@Component({
    selector: 'app-trainer-list',
    templateUrl: 'trainer-list.component.html',
    styleUrls: ['trainer-list.component.css'],
    providers: []
})

export class TrainerList implements OnInit{     
    items:PokemonJson[] = [new PokemonJson("Pikachu"), new PokemonJson("Ditto")];

    ngOnInit(): void {
        //TODO: Fetch data
    }   

    //should be called if a change is made to the items
    update(){
        console.log("Trainer list updated!");
    }
}

// class Item{
//     pokemon:PokemonJson;
//     availableAction:PokeAction;

//     constructor(pokemon:PokemonJson)
//     {
//         this.pokemon = pokemon;
//         this.availableAction = PokeAction.Disabled;
//     }
// }