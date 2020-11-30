import { Component, OnInit } from '@angular/core';

import { Pokemon } from 'src/app/models/pokemon';

import { MessageService } from 'src/app/services/message.service';
import { PokemonService } from 'src/app/services/pokemon.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  pokemons: Pokemon[] = [];

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

  constructor( private _service: PokemonService, private _serviceMessage: MessageService ) { }

  ngOnInit(): void {
    this._service.getAll().subscribe((data) => { 
      this.pokemons = data;
    }, (err) => {
      this._serviceMessage.error('Error!', 'Could not find, your pokemon´s. ' + err);
      throw err;
    });
  }

  deletePokemon(pokemon: Pokemon): void{
    Swal.fire({
      title: 'Delete!',
      text: `Are you sure to eliminate the pokemon ${pokemon.name} ?`,
      icon: 'warning',
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#d33',
      denyButtonColor: '#A4A4A4',
      confirmButtonText: 'Yes, delete!',
      denyButtonText: 'Cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._service.delete(pokemon.id_pokemon).subscribe((data) => {
          this.pokemons = this.pokemons.filter(c => c !== pokemon);
          this._serviceMessage.success('Removed!', 'The requested pokemon, has been removed.');
        }, (err) =>  { 
            this._serviceMessage.error('Error!', 'Could not delete, your pokemon. ' + err);
            throw err;
          }
        );
      } else if (result.isDenied){
        this._serviceMessage.info('Cancel!', 'Your pokemon´s removal, has canceled.');
      }
    }).catch((err) => {
      this._serviceMessage.error('Error!', 'An error occurred, please try again later. ' + err);
      throw err;
    });                                    
  }

}
