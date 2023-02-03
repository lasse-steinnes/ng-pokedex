import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PokemonModel } from "src/app/models/pokemon.model";

@Component({
    selector: "app-trainer-item",
    templateUrl: "trainer-item.component.html",
    styleUrls: ["trainer-item.component.css"]
})

export class TrainerItem{
    @Input() json?:PokemonModel;
    @Output() onRelease:EventEmitter<PokemonModel> = new EventEmitter<PokemonModel>();

    detailed:boolean = false;

    btnRelease(){        
        console.log(this.json?.name + " released!");

        if(this.json != undefined)
            this.onRelease.emit(this.json);
        else
            console.log("Json invalid!");
    }

    showDetails(){this.detailed = true}
    hideDetails(){this.detailed = false}
}