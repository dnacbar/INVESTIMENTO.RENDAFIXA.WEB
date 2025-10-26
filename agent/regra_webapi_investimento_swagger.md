# 📘 INVESTIMENTO.RENDAFIXA.WEBAPI

Este documento descreve as **regras e endpoints** da API com base no contrato OpenAPI fornecido.

---

## 🏷️ Informações Gerais
- **Nome:** INVESTIMENTO.RENDAFIXA.WEBAPI
- **Versão:** 1.0
- **Padrão:** OpenAPI 3.0.1
- **Formato:** JSON

---

## 📌 Endpoints

### 1. **ConsultaAnaliticaInvestimento**
#### `POST /ConsultaAnaliticaInvestimento/ConsultaSomaDeInvestimentoQueNaoEstaLiquidado`
- **Descrição:** Retorna a soma de todos os investimentos não liquidados.
- **Request Body:** *Não requer parâmetros.*
- **Resposta:** `200 OK` → Valor agregado dos investimentos não liquidados.

---

### 2. **ConsultaCliente**
#### `POST /ConsultaCliente/ListaClienteComInvestimentoAtivo`
- **Descrição:** Retorna a lista de clientes que possuem investimentos ativos.
- **Request Body:** *Não requer parâmetros.*
- **Resposta:** `200 OK` → Lista de clientes com investimento ativo.

---

### 3. **ConsultaInvestimento**

#### `POST /ConsultaInvestimento/ConsultaInvestimentoQueNaoEstaLiquidado`
- **Descrição:** Consulta informações de um investimento não liquidado.
- **Request Body:** `ConsultaInvestimentoSignature`
```json
{
  "investimento": "uuid",
  "investidor": "uuid",
  "docFederal": "string | null"
}
```
- **Resposta:** `200 OK`

#### `POST /ConsultaInvestimento/ListaInvestimentoQueNaoEstaLiquidado`
- **Descrição:** Lista todos os investimentos não liquidados de um investidor.
- **Request Body:** `ListaInvestimentoQueNaoEstaLiquidadoSignature`
```json
{
  "investidor": "uuid",
  "docFederal": "string | null"
}
```
- **Resposta:** `200 OK`

---

### 4. **ConsultaPosicao**

#### `POST /ConsultaPosicao/ConsultaPosicao`
- **Descrição:** Consulta posição de um investimento específico.
- **Request Body:** `ConsultaPosicaoSignature`
```json
{
  "investimento": "uuid"
}
```
- **Resposta:** `200 OK`

---

### 5. **ManipulaInvestimento**

#### `POST /ManipulaInvestimento/AdicionaInvestimento`
- **Descrição:** Adiciona um novo investimento para um investidor.
- **Request Body:** `AdicionaInvestimentoSignature`
```json
{
  "investidor": "uuid",
  "documentoFederal": "string | null",
  "valorInicial": 0.0,
  "taxaRendimento": 0.0,
  "taxaAdicional": 0.0,
  "dataInicial": "2025-09-21T00:00:00Z",
  "dataFinal": "2025-12-21T00:00:00Z",
  "indexador": 1,
  "isentoImposto": true,
  "usuario": "string | null"
}
```
- **Resposta:** `200 OK`

---

## 📑 Esquemas de Dados (Schemas)

### 🔹 `AdicionaInvestimentoSignature`
| Campo            | Tipo    | Obrigatório | Descrição |
|------------------|---------|-------------|-----------|
| investidor       | string(uuid) | ✅ | Identificador do investidor. |
| documentoFederal | string (nullable) | ❌ | Documento federal. |
| valorInicial     | number(double) | ✅ | Valor inicial aplicado. |
| taxaRendimento   | number(double) | ✅ | Taxa base de rendimento. |
| taxaAdicional    | number(double) | ✅ | Taxa adicional. |
| dataInicial      | string(date-time) | ✅ | Data de início. |
| dataFinal        | string(date-time) | ✅ | Data de vencimento. |
| indexador        | EnumIndexador | ✅ | Indexador financeiro. |
| isentoImposto    | boolean | ✅ | Indica se é isento de imposto. |
| usuario          | string (nullable) | ❌ | Usuário responsável. |

---

### 🔹 `ConsultaInvestimentoSignature`
| Campo      | Tipo    | Obrigatório |
|------------|---------|-------------|
| investimento | string(uuid) | ✅ |
| investidor   | string(uuid) | ✅ |
| docFederal   | string (nullable) | ❌ |

---

### 🔹 `ListaInvestimentoQueNaoEstaLiquidadoSignature`
| Campo      | Tipo    | Obrigatório |
|------------|---------|-------------|
| investidor | string(uuid) | ✅ |
| docFederal | string (nullable) | ❌ |

---

### 🔹 `ConsultaPosicaoSignature`
| Campo      | Tipo    | Obrigatório |
|------------|---------|-------------|
| investimento | string(uuid) | ✅ |

---

### 🔹 `EnumIndexador`
Valores possíveis:
- `1`
- `2`
- `3`
- `4`
- `5`
- `6`

---

## ✅ Regras de Uso
- Todos os endpoints utilizam **método POST**.
- Corpo da requisição deve ser **JSON válido**.
- Todos os `uuid` devem ser fornecidos em formato válido (`xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`).
- Datas devem estar no padrão **ISO 8601 (date-time)**.
- Os esquemas não permitem propriedades adicionais além das definidas.

---

📖 **Fonte:** OpenAPI 3.0.1 (Swagger)