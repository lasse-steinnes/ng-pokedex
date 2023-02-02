import { Component, Output } from '@angular/core';
import { PokeAction } from 'src/app/other/enums';

@Component({
    selector: 'app-trainer-page',
    templateUrl: 'trainer.page.html',
    styleUrls: ['trainer.page.css']
})

export class TrainerPage{
    //What action should be enabled in this page
    @Output() action:PokeAction = PokeAction.Release;
}