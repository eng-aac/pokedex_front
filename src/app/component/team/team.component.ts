import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { Pokemon } from 'src/app/models/pokemon';
import { Team } from 'src/app/models/team';

import { PokemonService } from 'src/app/services/pokemon.service';
import { TeamService } from 'src/app/services/team.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  pokemons: Pokemon[] = [];
  teams: Team[] = [];
  titleForm: string = 'Add your Pokemon';
  isEdit: boolean = false;
  formsTeams:  FormGroup;
  id: number;
  isViewPokemon: boolean = false;

  pokemon: Pokemon = {
    id_pokemon: 0,
    name: '',
    type: '',
    base_experience: 0,
    sampleImage: ''
  }

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

  constructor( private _service: PokemonService, private _serviceTeam: TeamService,  
               private formBuilder: FormBuilder, private rutaActiva: ActivatedRoute ) { }

  ngOnInit(): void {
    this._service.getAll().subscribe((data) => this.pokemons = data);
    this._serviceTeam.getAll().subscribe((data) => this.teams = data);

    this.formsTeams = this.formBuilder.group({
      name_team: ['', Validators.required],
      nickname_player: ['', Validators.required],
      level: ['', Validators.required],
      pokemon_holder: ['null', Validators.required],
      pokemon_substitute: ['null', Validators.required],
    })
  }

  viewTeam(team: Team){
    this.titleForm = 'Edit your Pokemon';
    this.isEdit = true;
    this.formsTeams.setValue({
      name_team: team.name_team,
      nickname_player: team.nickname_player,
      level: team.level,
      pokemon_holder: team.pokemon_holder,
      pokemon_substitute: team.pokemon_substitute
    })
    
    this.id = team.id;
  }

  viewPokemon(id: number){
    this.isViewPokemon = true;
    this._service.getOne(id).subscribe(data => {
      this.pokemon = data;
    })
  }

  postTeam(){
    this._serviceTeam.post(this.formsTeams.value).subscribe(data => {
     this.ngOnInit();

      Swal.fire({
        icon: 'success',
        title: 'Created!',
        text: 'Team created, successfully.',
        showConfirmButton: false,
        timer: 2000
      });
    });
  }

  putTeam(){
    this._serviceTeam.update(this.id, this.formsTeams.value).subscribe(data => {
        Swal.fire({
          icon: 'success',
          title: 'Modified!',
          text: 'Team modified, successfully.',
          showConfirmButton: false,
          timer: 2000
        })

        this.cancelTeam();
    },
    
    error => {
      alert(error);
    });
  }

  deleteTeam(team: Team): void{
    Swal.fire({
      title: 'Delete',
      text: `Are you sure to eliminate the team ${team.name_team} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.value) {
        this._serviceTeam.delete(team.id).subscribe(data => {
          this.teams = this.teams.filter(c => c !== team);
        });

        Swal.fire({
          icon: 'success',
          title: 'Removed!',
          text: 'The requested team, has been removed.',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

  cleanTeam(){
    this.formsTeams.reset();
  }

  cancelTeam(){
    this.titleForm = 'Add your Pokemon';
    this.isEdit = false;
    this.ngOnInit();
  }

  cancelPokemon(){
    this.isViewPokemon = false;
  }

}
