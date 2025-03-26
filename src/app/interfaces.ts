
export enum Choice{
    team1 = 0,
    team2 = 1
}


export interface BetInterface{

    getOwner : any;
    getGames : any;
    getProvider : any;
    addGame : any;
    makeBet : any;
    getGame : any;
    getBettors : any;
    finalizeBet : any;

}


export interface GamesInterface{
    id : number;
    team1 : string;
    team2: string;
    finished : boolean;
    status : string;
}

export interface AddGameInterface{
    team1 : string,
    team2 : string;
}

export interface MakeBetInterface{
    id : number,
    team : Choice
}

export interface BettorsIterface{
    wallet : string,
    team : number,
    value : number
}