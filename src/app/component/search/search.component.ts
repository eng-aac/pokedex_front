import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import Swal from 'sweetalert2';

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

  constructor( private _service: PokemonService ) { }

  ngOnInit(): void {
  }

  browseOne(pokemon_name: any) {
    this.error = true;
    this.message = 'Processing...';

    pokemon_name = pokemon_name.trim();

    if(pokemon_name === '' || !pokemon_name || pokemon_name == null){
      this.browsing = false;
      setTimeout(() => {
        this.message = 'This is the name or id, was invalid !!';
      }, 200);
    } else {
      this._service.browse(pokemon_name).subscribe((data) => {
        this.pokemon = data;
        this.message = 'This is Correct !!';
        this.browsing = true;
      }, (error) =>  { this.browsing = false;
  
                      setTimeout(() => {
                        this.message = 'This is the process was invalid !!';
                      }, 200);
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
    this._service.post(pokemon).subscribe(data => {
      this.pokemon_name = '';
      this.error = false;
      this.browsing = false;

      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: `Pokemon ${pokemon.name} added to Collection, successfully.`,
        showConfirmButton: false,
        timer: 2000
      });
    });
  }

}
