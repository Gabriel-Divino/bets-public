import { Component, OnInit } from '@angular/core';
import { BetService } from '../Blockchain/bet.service';
import { Router } from '@angular/router';
import { AddGameInterface, GamesInterface ,MakeBetInterface } from '../interfaces';
import { VerifyHash } from '../utils';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent implements OnInit {

  contractAddress : string =  "";
  games : GamesInterface[] =  [];
  visible : boolean = false;
  newGames : AddGameInterface = {
    team1 : '',
    team2 : ''
  };

  choice : string[] =  [];

  constructor(
    private readonly router : Router,
    private readonly betService : BetService,
  ){}


  async ngOnInit(): Promise<void> {
      this.visible = true;
      const owner : boolean = await this.betService.isOwner();
      if(!owner){
        this.router.navigate(['/']);
      }
      else{
        this.contractAddress = await this.betService.getContractAddress();
        this.games = await this.betService.getGames();
        for(let game of this.games){
          this.choice[Number(game.id)] = 'n';
        };
       
      }
      this.visible = false;
  }

  async addGame() : Promise<void>{
      this.visible = true;
      try{

        const tx = await this.betService.addGame(this.newGames);
        VerifyHash(tx.hash);

      }catch(e : any){
        window.alert(e.message)
      }

      this.visible = false;
  }

  teamTransform(id :  number,team : string) : any {
    const _team : number = Number(team);
    const game : any = this.games.find((g)=>Number(g.id) == Number(id));
    switch(_team){
      case 0:
        return game.team1;
      case 1:
        return game.team2;
      default:
        return null
    }
  }

  async finalizeBet(id : number) : Promise<void>{

    this.visible = true;
    try{
      const _team : any = this.teamTransform(id,this.choice[id]);
      if(_team == null){
        window.alert('Escolha um Time Vencedor')
      }
      else{
        const q : boolean = window.confirm(`Você Deseja Confirmar a Vitória do ${_team} ?`);
        if(q == true){
          const finalizeGame : MakeBetInterface = {
            id : Number(id),
            team : Number(this.choice[id])
          }
          const tx = await this.betService.finalizeBet(finalizeGame);
          VerifyHash(tx.hash);
        }
      }

    }catch(e : any){
      window.alert(e.message)
    }
    this.visible = false;
  }

}
