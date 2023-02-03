export interface Pokemon {
    name: string,
    url: string
}

export class PokemonJson{
    id:string = "0";
    name:string = "";
    imageUrl:string = "assets/images/placeholder.png";

// extract id from last /x/ x=id
// then get png from https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/x.png

    constructor(name:string)
    {
        this.name = name;
    }
}

export class DetailedPokemonJson{
    id:string = "";
    name:string = "";
    imageUrl:string = "";

    hhp:number = 0;
    atk:number = 0;
    stk:number = 0;
    def:number = 0;
    sdf:number = 0;    
    spd:number = 0;
}