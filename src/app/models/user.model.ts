import { PokemonModel } from "./pokemon.model";
//specifies what the User data set is
export interface User {
    id: number;
    username: string;
    pokemon: PokemonModel[]; //Array<6>
}