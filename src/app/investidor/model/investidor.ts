import { ListaInvestimentoQueNaoEstaLiquidadoSignature } from "../../financeiro/service/signature/lista-investimento-que-nao-esta-liquidado-signature";
import { ListaClienteComInvestimentoAtivoResult } from "../service/result/lista-cliente-com-investimento-ativo-result";

export class Investidor {
    public idInvestidor = '';
    public documentoFederal = '';

    public verificaSeEstaVazio(): boolean {
        return this.idInvestidor === '' && this.documentoFederal === '';
    }
    
    public static converteInvestidor(result: ListaClienteComInvestimentoAtivoResult): Investidor {
        const investidor = new Investidor();

        investidor.documentoFederal = result.docFederal;
        investidor.idInvestidor = result.investidor;
        return investidor;
    }

    public converteListaInvestimentoQueNaoEstaLiquidadoSignature(): ListaInvestimentoQueNaoEstaLiquidadoSignature {
        return {
            investidor: this.idInvestidor,
            docFederal: this.documentoFederal
        } as ListaInvestimentoQueNaoEstaLiquidadoSignature;
    }
}
