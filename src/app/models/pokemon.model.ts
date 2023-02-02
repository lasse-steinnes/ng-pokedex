export interface Pokemon {
    name: string,
    url: string
}

export class PokemonJson{
    id:number = 0;
    name:string = "";
    imageUrl:string = "";

// extract id from last /x/ x=id
// then get png from https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/x.png

    constructor(name:string)
    {
        this.name = name;
    }
}