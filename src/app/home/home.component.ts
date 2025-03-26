import { Component, OnInit } from '@angular/core';
import { BetService } from '../Blockchain/bet.service';
import { Choice, GamesInterface, MakeBetInterface } from '../interfaces';
import { VerifyHash } from '../utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit{

  games : GamesInterface[] = [];
  visible : boolean = false;
  bet : MakeBetInterface = {
    id : 0,
    team : Choice.team1
  }

  constructor(
    private readonly betService : BetService
  ){}

  ngOnInit(): void {
    this.visible = true;
    this.betService.getGames().then((_games : GamesInterface[])=>{
      console.log(_games);
      this.games = _games;
      this.visible = false;
    })
  }

  async makeBet(id : number,choice : number) : Promise<void>{
    this.visible = true;
    this.bet =  {
      id : id,
      team : choice
    };

    console.log(this.bet);
    try{
      const tx = await this.betService.makeBet(this.bet);
      VerifyHash(tx.hash);
    }catch(e : any){
      window.alert(e.message);
    }
    this.visible = false;
  }



}
