import { ListaResgateDoInvestidorResult } from "../service/result/lista-resgate-do-investidor-result";
import { AdicionaResgateSignature } from "../service/signature/adiciona-resgate-signature";

export class Resgate {
    public idInvestimento = '';
    public idResgate = 0;
    public nmValorResgate = 0;
    public nmValorImposto = 0;
    public nmValorIof = 0;
    public nmValorIrrf = 0;
    public nmValorDisponivel = 0;
    public nmValorAnterior = 0;
    public dtResgate = new Date();
    public boCarregandoResgate = false;

    public converteEmSignatureAdicionaResgate(): AdicionaResgateSignature {
        return {
            investimento: this.idInvestimento,
            valor: this.nmValorResgate,
            usuario: 'WEBSERVICE'
        };
    }

    public static converteResgate(result: ListaResgateDoInvestidorResult): Resgate {
        const retorno = new Resgate();

        if (!result)
            return retorno;

        retorno.idInvestimento = result?.investimento;
        retorno.idResgate = result?.resgate;
        retorno.nmValorResgate = result?.valor;
        retorno.nmValorDisponivel = result?.valorDisponivel;
        retorno.nmValorAnterior = result?.valorAnterior;
        retorno.nmValorImposto = result?.valorImposto;
        retorno.nmValorIof = result?.valorIof;
        retorno.nmValorIrrf = result?.valorIrrf;
        retorno.dtResgate = new Date(result.dtResgate);;

        return retorno;
    }
}
