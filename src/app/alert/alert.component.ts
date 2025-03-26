import { Component, Input, OnInit } from '@angular/core';
import { BetService } from '../Blockchain/bet.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit{

  _wallet : string | null = null;
  isAdmin : boolean = false;

  constructor(
      private readonly betService : BetService
  ){}

  ngOnInit(): void {
    this._wallet = localStorage.getItem('wallet');
    this.betService.isOwner().then((res : boolean)=>{
      console.log(res);
      this.isAdmin = res;
    })
  }

}
