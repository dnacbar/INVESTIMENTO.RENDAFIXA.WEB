import { ListaInvestimentoComResgateDisponivelSignature } from './../../financeiro/service/signature/lista-investimento-com-resgate-disponivel-signature';
import { ListaInvestimentoSignature } from "../../financeiro/service/signature/lista-investimento-signature";
import { ListaResgateDoInvestidorSignature } from "../../financeiro/service/signature/lista-resgate-do-investidor-signature";
import { ListaClienteComInvestimentoAtivoResult } from "../service/result/lista-cliente-com-investimento-ativo-result";

export class Investidor {
    public idInvestidor = '';
    public documentoFederal = '';

    public verificaSeEstaVazio(): boolean {
        return this.idInvestidor === '' && this.documentoFederal === '';
    }
    
    public static converteInvestidor(result: ListaClienteComInvestimentoAtivoResult): Investidor {
        const investidor = new Investidor();
        if (!result)
            return investidor;

        investidor.documentoFederal = result?.docFederal;
        investidor.idInvestidor = result?.investidor;
        return investidor;
    }

    public converteEmListaInvestimentoSignature(): ListaInvestimentoSignature {
        return {
            investidor: this.idInvestidor,
            docFederal: this.documentoFederal
        } as ListaInvestimentoSignature;
    }

    public converteEmListaInvestimentoComResgateDisponivelSignature(): ListaInvestimentoComResgateDisponivelSignature {
        return {
            investidor: this.idInvestidor,
            docFederal: this.documentoFederal
        } as ListaInvestimentoComResgateDisponivelSignature;
    }

    public converteEmListaResgateDoInvestidorSignature(): ListaResgateDoInvestidorSignature{
        return {
            investidor: this.idInvestidor,
            docFederal: this.documentoFederal
        } as ListaResgateDoInvestidorSignature;
    }
}
