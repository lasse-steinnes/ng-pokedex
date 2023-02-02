import { Component, Input, OnInit } from "@angular/core";
import { PokemonJson } from "src/app/models/pokemon.model";


@Component({
    selector: "app-pokemon",
    templateUrl: "pokemon.component.html",
    styleUrls: ["pokemon.component.css"],
    
})

export class Pokemon{
    @Input() json:PokemonJson = new PokemonJson("");

    get id():number { return this.json.id; }
    get name():string { return this.json.name; };
    set name(to:string) { this.json.name = to; }
    get imageUrl():string { return this.json.imageUrl; };
}