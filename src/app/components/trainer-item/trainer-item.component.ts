import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PokemonModel } from "src/app/models/pokemon.model";
import { UserService } from "src/app/services/user/user.service";

@Component({
    selector: "app-trainer-item",
    templateUrl: "trainer-item.component.html",
    styleUrls: ["trainer-item.component.css"]
})

export class TrainerItem{
    @Input() json?:PokemonModel;
    @Output() onRelease:EventEmitter<PokemonModel> = new EventEmitter<PokemonModel>();

    detailed:boolean = false;

    constructor (
        private readonly userService: UserService
    ) { }

    onReleaseClick(): void {
        if(this.json != undefined)
            this.userService.catchPokemon(this.json.name);
    }
    btnRelease(){     
        this.onReleaseClick();   
        console.log(this.json?.name + " released!");

        if(this.json != undefined)
            this.onRelease.emit(this.json);
        else
            console.log("Json invalid!");
    }

    showDetails(){this.detailed = true}
    hideDetails(){this.detailed = false}
}