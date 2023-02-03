import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PokemonJson } from "src/app/models/pokemon.model";

@Component({
    selector: "app-trainer-item",
    templateUrl: "trainer-item.component.html",
    styleUrls: ["trainer-item.component.css"]
})

export class TrainerItem{
    @Input() json:PokemonJson = new PokemonJson("");
    @Output() onRelease:EventEmitter<PokemonJson> = new EventEmitter<PokemonJson>();

    btnRelease(){        
        console.log(this.json.name + " released!");
        this.onRelease.emit(this.json);
    }
}