import { ListaClienteComInvestimentoAtivoResult } from "../service/result/lista-cliente-com-investimento-ativo-result";

export class Investidor {
    public idInvestidor = '';
    public documentoFederal = '';

    public verificaSeEstaVazio(): boolean {
        return this.idInvestidor === '' && this.documentoFederal === '';
    }
    
    public static converteEmInvestidor(result: ListaClienteComInvestimentoAtivoResult): Investidor {
        const investidor = new Investidor();
        if (!result)
            return investidor;

        investidor.documentoFederal = result?.docFederal;
        investidor.idInvestidor = result?.investidor;
        return investidor;
    }
}
