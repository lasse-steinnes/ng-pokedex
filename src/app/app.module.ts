import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginPage } from './pages/login/login.page';
import { PokemonCateloguePage } from './pages/pokemon-catalogue/pokemon-catalogue.page';
import { TrainerPage } from './pages/trainer/trainer.page';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { TrainerList } from './components/trainer-list/trainer-list.component';
import { CatalogueList } from './components/catalogue-list/catalogue-list.component';
import { CatalogueItem } from './components/catalogue-item/catalogue-item.component';
import { TrainerItem } from './components/trainer-item/trainer-item.component';
import { NavigateButton } from './components/navigate-button/navigate-button.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    PokemonCateloguePage,
    TrainerPage,
    LoginFormComponent,
    TrainerList,
    TrainerItem,
    CatalogueList,
    CatalogueItem,
    NavigateButton

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,// allows http requests
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }  