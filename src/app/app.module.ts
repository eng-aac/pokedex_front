import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PokemonService } from './services/pokemon.service';
import { TeamService } from './services/team.service';
import { TeamPokemonService } from './services/team-pokemon.service';
import { MessageService } from './services/message.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './component/shared/navbar/navbar.component';
import { FooterComponent } from './component/shared/footer/footer.component';
import { TeamComponent } from './component/team/team.component';
import { CollectionComponent } from './component/collection/collection.component';
import { SearchComponent } from './component/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TeamComponent,
    CollectionComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PokemonService,
    TeamService,
    TeamPokemonService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
