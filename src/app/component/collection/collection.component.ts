import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Pokemon } from 'src/app/models/pokemon';
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

  constructor( private router: Router, private _service: PokemonService ) { }

  ngOnInit(): void {
    this._service.getAll().subscribe((data) => this.pokemons = data);
  }

  deletePokemon(pokemon: Pokemon): void{
    Swal.fire({
      title: 'Delete',
      text: `Are you sure to eliminate the pokemon ${pokemon.name} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.value) {
        this._service.delete(pokemon.id_pokemon).subscribe(data => {
          this.pokemons = this.pokemons.filter(c => c !== pokemon);
        });

        Swal.fire({
          icon: 'success',
          title: 'Removed!',
          text: 'The requested pokemon, has been removed.',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

}
