


export function VerifyHash(hash : string) : void{
   console.log(hash);
    if(hash){
        const question : boolean = window.confirm(`Ação Realizada com Sucesso. Deseja ver o status da transação ?`);
        if(question){
          window.open(`https://holesky.etherscan.io/tx/${hash}`,'_blank');
        }
      }
}
