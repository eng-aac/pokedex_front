import { Pokemon } from "./pokemon";

export class Team {
    id: number;
    name_team: string;
    nickname_player: string;
    level: string;
    pokemon_holder: Pokemon;
    pokemon_substitute: Pokemon


    constructor() {
        this.id = this.id;
        this.name_team = this.name_team;
        this.nickname_player = this.nickname_player;
        this.level = this.level;  
        this.pokemon_holder = new Pokemon();
        this.pokemon_substitute = new Pokemon();
    }
}