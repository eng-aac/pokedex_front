import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Pokemon } from 'src/app/models/pokemon';
import { Team } from 'src/app/models/team';

import { PokemonService } from 'src/app/services/pokemon.service';
import { TeamService } from 'src/app/services/team.service';
import { MessageService } from 'src/app/services/message.service';

import Swal from 'sweetalert2';
import { TeamPokemonService } from 'src/app/services/team-pokemon.service';
import { TeamPokemon } from 'src/app/models/teamPokemon';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  pokemons: Pokemon[] = [];
  teams: Team[] = [];
  teamPokemons: TeamPokemon[];
  titleForm: string = 'Add your Team';
  isEdit: boolean = false;
  formsTeams:  FormGroup;
  formsTeamPokemons: FormGroup;
  id: number;
  isViewPokemon: boolean = false;
  isTeamsPokemons: boolean = false;
  id_vtp: number = 0;

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
               private _serviceTeamPokemons: TeamPokemonService, private _serviceMessage: MessageService, 
               private formBuilder: FormBuilder ) { }

  ngOnInit(): void {
    this._service.getAll().subscribe((data) => this.pokemons = data);
    this._serviceTeam.getAll().subscribe((data) => this.teams = data);

    this.formsTeams = this.formBuilder.group({
      name_team: ['', Validators.required],
      nickname_player: ['', Validators.required],
      level: ['', Validators.required]
    });

    this.formsTeamPokemons = this.formBuilder.group({
      TeamId: [null, Validators.required],
      PokemonId: [null, Validators.required]
    });
  }

  viewTeam(team: Team){
    this.titleForm = 'Edit your Team';
    this.isEdit = true;
    this.formsTeams.setValue({
      name_team: team.name_team,
      nickname_player: team.nickname_player,
      level: team.level
    })
    
    this.id = team.id;
  }

  viewPokemon(id: number){
    this.isViewPokemon = true;
    this._service.getOne(id).subscribe(data => {
      this.pokemon = data;
    });
  }

  viewPokemons(teamId: number){
    this.id_vtp = teamId;
    this.isTeamsPokemons = true;
    this._serviceTeamPokemons.getAll(teamId).subscribe((data) => {
      this.teamPokemons = data;
      if(this.teamPokemons.length == 0){
        this.isTeamsPokemons = false;
      }
    });
    
  }

  postTeam(){
    this._serviceTeam.post(this.formsTeams.value).subscribe((data) => {
      this.ngOnInit();
      this._serviceMessage.success('Created!', 'Team created, successfully.');
    },(error) => {
      this._serviceMessage.error('Error!', 'Could not create, your team.');
      }
    );
  }

  postTeamPokemons(){
    this._serviceTeamPokemons.post(this.formsTeamPokemons.value).subscribe((data) => {
      this.ngOnInit();
      this._serviceMessage.success('Added!', 'The pokemon was added to your team, successfully.');
    },(error) => {
        this._serviceMessage.error('Error!', 'Pokemon could not be added, to your team.');
      }
    );
  }

  putTeam(){
    this._serviceTeam.update(this.id, this.formsTeams.value).pipe(first()).subscribe((data) => {
        this._serviceMessage.success('Modified!', 'Team modified, successfully.');
        this.cancelTeam();
    }, (error) => {
        this._serviceMessage.error('Error!', 'Could not modify, your team.');
      }
    );
  }

  deleteTeam(team: Team): void{
     Swal.fire({
      title: 'Delete!',
      text: `Are you sure to eliminate the team ${team.name_team} ?`,
      icon: 'warning',
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonColor: '#d33',
      denyButtonColor: '#A4A4A4',
      confirmButtonText: 'Yes, delete!',
      denyButtonText: 'Cancel!',
    }).then((result) => {
      if (result.isConfirmed) {
        this._serviceTeam.delete(team.id).subscribe((data) => {
          this.teams = this.teams.filter(c => c !== team);
          this._serviceMessage.success('Removed!', 'The requested team, has been removed.');
        }, (error) =>  { 
            this._serviceMessage.error('Error!', 'Could not delete, your team.');
          }
        );
      } else if (result.isDenied){
        this._serviceMessage.info('Cancel!', 'Your team´s removal, has canceled.');
      }
    }).catch((error) => {
      this._serviceMessage.error('Error!', 'An error occurred, please try again later.');
    });                                 
  }

  cleanTeam(){
    this.formsTeams.reset();
  }

  cancelTeam(){
    this.titleForm = 'Add your Team';
    this.isEdit = false;
    this.ngOnInit();
  }

  cancelTeamPokemons(){
    this.formsTeamPokemons.reset();
  }

  cancelPokemon(){
    this.isViewPokemon = false;
  }

}
