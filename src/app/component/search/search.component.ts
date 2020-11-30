import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Pokemon } from 'src/app/models/pokemon';

import { MessageService } from 'src/app/services/message.service';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  
  pokemon: Pokemon = {
    id_pokemon: 0,
    name: '',
    type: '',
    base_experience: 0,
    sampleImage: ''
  }

  pokemon_name: any = '';
  browsing: boolean = false;
  error: boolean = false;
  message: string = '';
  isPokemon: boolean = true;
  messagePokemon: string = 'Click to add your Collection.'

  background_colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#F4E7DA',
    rock: '#D5D5D4',
    fairy: '#FCEAFF',
    poison: '#98D7A5',
    bug: '#F8D5A3',
    dragon: '#97B3E6',
    psychic: '#EAEDA1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
  }

  constructor( private router: Router, private _service: PokemonService, 
               private _serviceMessage: MessageService ) { }

  ngOnInit(): void {
  }

  browseOne(pokemon_name: any) {
    this.isPokemon = true;
    this.messagePokemon = 'Click to add your Collection.';
    this.error = true;
    this.message = 'Processing...';

    pokemon_name = pokemon_name.trim();

    if(pokemon_name === '' || !pokemon_name || pokemon_name == null){
      this.browsing = false;
      setTimeout(() => {
        this.message = 'The name/id entered, is invalid !!';
      }, 200);
    } else {
      this._service.browse(pokemon_name).subscribe((data) => {
        this.pokemon = data;
        this.message = 'This is Correct !!';
        this.browsing = true;
        this.getOnePokemon();
      }, (err) =>   {  this.browsing = false;
  
                        setTimeout(() => {
                          this.message = 'This process, was invalid !! ' + err;
                        }, 200);

                        throw err;
                    }
      );   
    }        
  }

  clean(){
    this.pokemon_name = '';
    this.error = false;
  }

  comeBack(){
    this.pokemon_name = '';
    this.error = false;
    this.browsing = false;
  }

  postPokemon(pokemon: Pokemon){
    this._service.post(pokemon).subscribe(() => {
      this.pokemon_name = '';
      this.error = false;
      this.browsing = false;
      this.router.navigate(['collection']);
      this._serviceMessage.success('Added!', `Pokemon ${pokemon.name} added to Collection, successfully.`);
    }, (err) =>  { 
        this._serviceMessage.error('Error!', 'Could not add, your pokemon. ' + err);
        throw err;
      }
    );
  }

  getOnePokemon(){
    this._service.getOne(this.pokemon.id_pokemon).subscribe((data) => {
        if(data){
          this.isPokemon = false;
          this.messagePokemon = 'This Pokemon is already in your Collection.';
        }
    }, (err) =>  { 
        this.isPokemon = true;
        this.messagePokemon = 'Click to add your Collection.';
      }
    );
  }

}
