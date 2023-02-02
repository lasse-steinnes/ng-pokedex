export interface Poke {
    name: string,
    url: string
}

export interface PokemonModel{
    count: number,
    next: string,
    previous?: any,
    results: Poke[],
} // see this: https://bguppl.github.io/interpreters/practice_sessions/ps1.html
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