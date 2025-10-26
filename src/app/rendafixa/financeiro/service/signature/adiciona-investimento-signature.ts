// Signature para AdicionaInvestimento
import { EnumIndexador } from '../../model/enum/enum-indexador';

export interface AdicionaInvestimentoSignature {
  investidor: string;
  docFederal?: string | null;
  vlInicial: number;
  diasCarencia: number;
  txRendimento: number;
  txAdicional: number;
  dtInicial: string;
  dtFinal: string;
  indexador: EnumIndexador;
  isentoImposto: boolean;
  usuario?: string | null;
  liquidezDiaria: boolean;
}

