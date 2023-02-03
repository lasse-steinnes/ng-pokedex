import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PokemonModel } from "src/app/models/pokemon.model";
import { User } from "src/app/models/user.model";
import { TrainerService } from "src/app/services/trainer/trainer.service";
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
        private readonly trainerService: TrainerService,
        private readonly userService: UserService
    ) { }

    onReleaseClick(): void {
        console.log(this.json?.name)
        this.trainerService.caughtPokemon(this.json?.name)
            .subscribe({
                next: (user: User) => {
                    console.log("NEXT", user)
                   // this.isCaught = this.userService.alreadyCaught(this.json?.name)
                },
                error: (error: HttpErrorResponse) => {
                    console.log("ERROR", error.message);
                }
            })
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