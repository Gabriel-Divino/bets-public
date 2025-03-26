import { Component, OnInit } from '@angular/core';
import { MetamaskService } from '../metamask.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  wallet : string | null = null;
  

  constructor(
    private readonly metamaskService : MetamaskService,
  ){}

  ngOnInit(): void {
    this.wallet = localStorage.getItem('wallet');
  }

  async login() : Promise<void>{
    await this.metamaskService.login();
    this.wallet = localStorage.getItem('wallet');
    window.location.reload();
  }

  logOut() : void{
    localStorage.clear();
    window.location.reload();
  }

}
