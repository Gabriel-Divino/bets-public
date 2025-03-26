import { Injectable } from '@angular/core';
import {ethers} from "ethers";
import { AddGameInterface, BetInterface , BettorsIterface, GamesInterface , MakeBetInterface} from '../interfaces';

const ABI = require('./abi.json');

@Injectable({
  providedIn: 'root'
})
export class BetService {

  
  private readonly nodeUrl : string = "";
  private readonly contractAddress : string = "0x125C356910F27FdafbB3e67A608378D5C6A97d0A";
  private provider : ethers.JsonRpcProvider = new ethers.JsonRpcProvider(this.nodeUrl);
  private contract : ethers.Contract | BetInterface  = new ethers.Contract(this.contractAddress,ABI,this.provider);
  private wallet : string | null = localStorage.getItem('wallet');

  constructor(
    
  ) { }


  async contractWithSigner() : Promise<ethers.Contract | BetInterface> {
    
    const _provider = new ethers.BrowserProvider((window as any).ethereum);
    const accounts = await _provider.send('eth_requestAccounts',[]);
    console.log(accounts[0]);
    const signer = await _provider.getSigner(accounts[0]);
    const _contract : ethers.Contract = new ethers.Contract(this.contractAddress,ABI,signer);
    return _contract;
  }

  async isOwner() : Promise<boolean>{
      const owner = await this.contract.getOwner();
      if(owner.toLocaleLowerCase() == this.wallet)
        return true;
      return false;
  }

  async getGames() : Promise<GamesInterface[]>{
      const games : GamesInterface[] = await this.contract.getGames();
      return games;
  }

  async getContractAddress() : Promise<string>{
    const address : string = await this.contract.getProvider();
    return address;
  }

  async addGame(games : AddGameInterface) : Promise<any> {
    const _contract : ethers.Contract | BetInterface = await this.contractWithSigner();
    const tx  : any = await _contract.addGame(games.team1,games.team2);
    const reicept : any = await tx.wait();
    return reicept;
  }

  async makeBet(game : MakeBetInterface) : Promise<any>{
    const _contract : ethers.Contract | BetInterface = await this.contractWithSigner();
    const value : bigint = ethers.parseEther('0.01');
    const tx  : any = await _contract.makeBet(game.id,game.team,{value : value});
    const reicept : any = await tx.wait();
    return reicept; 
  }

  async getGame(id : number) : Promise<GamesInterface> {
    const game  : GamesInterface = await this.contract.getGame(id);
    return game;
  }

  async getBettors(id : number) : Promise<BettorsIterface[]> {
    const bettors : BettorsIterface[] = await this.contract.getBettors(id);
    return bettors;
  }

  async finalizeBet(game : MakeBetInterface) : Promise<any> {
    const _contract : ethers.Contract | BetInterface = await this.contractWithSigner();
    const tx : any = await _contract.finalizeBet(game.id,game.team);
    const reicept : any = await tx.wait();
    return reicept;
  }


}
