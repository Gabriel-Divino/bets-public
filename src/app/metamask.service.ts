import { Injectable } from '@angular/core';
import {ethers} from "ethers";

@Injectable({
  providedIn: 'root'
})
export class MetamaskService {



  constructor() { }

  async login() : Promise<void>{
    const _window : any = (window as any).ethereum;
    if(!_window){
      const question : boolean = window.confirm("Você Não Possui Carteira Metamask Instalada. Deseja Instalar Agora ?");
      if(question){
        window.open('https://www.metamask.io','_blank'); 
      }
      return;
    }

    const provider : ethers.BrowserProvider = new ethers.BrowserProvider(_window);
    const accounts : string[] | [] = await provider.send('eth_requestAccounts',[]);
    const wallet : string = accounts[0];
    localStorage.setItem('wallet',wallet);

  }


}
