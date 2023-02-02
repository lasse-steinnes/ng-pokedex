
export interface IPokemonAction{
    enabled:boolean;
    update():void;
    execute():void;    
    enable():void;
    disable():void;
}