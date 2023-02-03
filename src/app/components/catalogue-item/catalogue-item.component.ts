import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { PokemonModel } from "src/app/models/pokemon.model";
import { User } from "src/app/models/user.model";
import { TrainerService } from "src/app/services/trainer/trainer.service";
import { UserService } from "src/app/services/user/user.service";

@Component({
    selector: "app-catalogue-item",
    templateUrl: "catalogue-item.component.html",
    styleUrls: ["catalogue-item.component.css"]
})

export class CatalogueItem implements OnInit {
    @Input() json?: PokemonModel;

    @Output() onCatched: EventEmitter<string> = new EventEmitter<string>();
    isCaught: boolean = false;
    detailed: boolean = false;
    constructor(
        private readonly trainerService: TrainerService,
        private userService: UserService
    ) { }

    get loading(): boolean {
        return this.trainerService.loading;

    }


    onCatchClick(): void {
        console.log(this.json?.name)
        this.trainerService.caughtPokemon(this.json?.name)
            .subscribe({
                next: (user: User) => {
                    console.log("NEXT", user)
                    this.isCaught = this.userService.alreadyCaught(this.json?.name)
                },
                error: (error: HttpErrorResponse) => {
                    console.log("ERROR", error.message);
                }
            })
    }

    btnCatch(): void {
        this.onCatchClick();

        if (!this.isCaught) {
            console.log(this.json?.name + " catched!");
        }

        if (this.json?.name != undefined){
            this.onCatched.emit(this.json.name);
            this.isCaught = true;
        }
        else
        {
            console.log("Pokemon data invalid!");
        }
    }

    ngOnInit(): void {
        //TODO: Is caught?
        this.isCaught = this.userService.alreadyCaught(this.json?.name)
    }

    showDetails() { this.detailed = true }
    hideDetails() { this.detailed = false }
}