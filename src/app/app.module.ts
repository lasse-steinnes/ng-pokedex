import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { PokemonCateloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    PokemonCateloguePage,
    TrainerPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,// allows http requests
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }