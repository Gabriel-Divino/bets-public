import { Component, OnInit } from '@angular/core';
import { BetService } from '../Blockchain/bet.service';
import { ActivatedRoute } from '@angular/router';
import { BettorsIterface, GamesInterface } from '../interfaces';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {

  visible : boolean = false;
  game : GamesInterface =  {} as GamesInterface;
  bettors : BettorsIterface[] =  [];

  constructor(
    private readonly betService : BetService,
    private readonly route : ActivatedRoute
  ){}

  async ngOnInit(): Promise<void> {
    this.visible = true;
    this.route.paramMap.subscribe(async(params : any)=>{
      const gameId : number = parseInt(params.get('id'));

      console.log(gameId);
      console.log(typeof(gameId));
      this.game = await this.betService.getGame(gameId);
      this.bettors = await this.betService.getBettors(gameId);
      this.visible = false;
    })
  }

  teamTransform(team : number) : string{
    const _team : number = Number(team);
    switch(_team){
      case 0:
        return this.game.team1;
      case 1:
        return this.game.team2;
      default:
        return "";
    }
  }

}
