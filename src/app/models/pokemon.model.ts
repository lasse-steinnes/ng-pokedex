export interface PokemonRes {
    results: PokemonModel[] // make results from model
}

export interface PokemonModel{
    name: string,
    url: string,
    id: number,
    img: string,
    hp: number,
    atk: number,
    spatk: number,
    def: number,
    spdef: number,
    spd: number,
} 

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