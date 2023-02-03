export interface PokemonRes {
    results: PokemonModel[], // make results from model;
    stats: StatsModel[],
}

export interface PokemonModel{
    name: string,
    url: string,
    id: number,
    img: string,
    // attack: number,
    // spatk: number,
    // def: number,
    // spdef: number,
    // spd: number,
    // hp: number,
}

export interface StatsRes {
    stats: StatsModel[],
}

export interface StatInterface{
    name: string,
    url: string,
}

export interface StatsModel{ // model to get base_stats
    base_stat: number,
    effort: number,
    stat: StatInterface,
}

// {"base_stat":60,"effort":0,"stat":{"name":"hp","url":"https://pokeapi.co/api/v2/stat/1/"}

/*     attack: number,
    defense: number,
    spatk: number,
    def: number,
    spdef: number,
    spd: number,
    
    */
// id: number,
// img: string,

// see this: https://bguppl.github.io/interpreters/practice_sessions/ps1.html
// potentially: http://json2ts.com/
// declare module namespace {
/*
export interface Result {
    name: string;
    url: string;
}

export interface RootObject {
    count: number;
    next: string;
    previous?: any;
    results: Result[];
}}
*/

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