# Boas Práticas de Desenvolvimento Angular (v19/v20)

Este guia reúne práticas recomendadas para projetos Angular 19/20, visando **qualidade de código, escalabilidade, performance e segurança**.

---

## 📁 Estrutura e Organização
- **Mantenha uma estrutura modular**: utilize `feature modules` para separar domínios.
- Use **standalone components** sempre que possível para reduzir boilerplate.
- Agrupe arquivos relacionados (componente, HTML, CSS, teste) no mesmo diretório.
- Utilize **barrel files** (`index.ts`) apenas em módulos bem definidos.
- Nomeie arquivos de forma consistente: `feature-name.component.ts`, `feature-name.service.ts`.

---

## 🧑‍💻 Padrões de Código
- Siga o **Angular Style Guide** oficial.
- Prefira **TypeScript estrito** (`"strict": true` no `tsconfig.json`).
- Utilize `public`/`private` para explicitar modificadores de acesso.
- Evite `any`: use `unknown` ou tipagem genérica adequada.
- Use **Signals e RxJS** de forma consciente:
  - Signals → estado local, reatividade simples.
  - RxJS → streams assíncronas e composição complexa.

---

## ⚡ Performance
- Habilite **ChangeDetectionStrategy.OnPush** em componentes que não dependem de estados globais.
- Utilize `trackBy` em *ngFor para evitar recriações desnecessárias de DOM.
- Prefira **lazy loading** para módulos de rotas.
- Use **standalone lazy components** para rotas quando possível.
- Faça `unsubscribe` automático com `takeUntilDestroyed()` ou `async pipe`.
- Habilite **ESBuild + esbuild dev server** no Angular 19 para builds rápidos.

---

## 🔒 Segurança
- Nunca utilize `innerHTML` sem sanitização.
- Utilize `DomSanitizer` com cautela.
- Sempre valide dados no **backend** — Angular é apenas camada de UI.
- Ative **Content Security Policy (CSP)** no servidor.
- Use `HttpClient` com **interceptors** para autenticação segura.

---

## 🎨 Estilo e UI
- Prefira **CSS encapsulado** via `:host` e `::ng-deep` apenas em casos extremos.
- Utilize **Angular Material v19+** ou bibliotecas compatíveis para consistência.
- Prefira **TailwindCSS** quando quiser maior flexibilidade e menor bundle.
- Centralize temas em `theme.scss`.

---

## 🧪 Testes
- Utilize **Jasmine/Karma** para testes unitários ou **Vitest/Jest** para mais performance.
- Cubra **serviços e pipes** com testes unitários.
- Utilize **Cypress ou Playwright** para testes end-to-end.
- Prefira **mocks com TestBed** ao invés de instanciar classes manualmente.

---

## 📦 Versionamento e Deploy
- Utilize **commitlint + conventional commits**.
- Configure **Husky + lint-staged** para rodar lint/prettier antes dos commits.
- Utilize **environments** (`environment.ts`, `environment.prod.ts`) para variáveis.
- Prefira **CI/CD pipelines** (GitHub Actions, GitLab CI, Azure DevOps).
- Habilite **budget warnings** no `angular.json` para controlar tamanho do bundle.

---

## 🏗️ Arquitetura
- Utilize **Smart vs Dumb Components**:
  - Smart → tratam lógica de negócio, comunicação com serviços.
  - Dumb → apenas UI, recebem `@Input` e disparam `@Output`.
- Prefira **injeção de dependência com `inject()`** (Angular 14+) em vez de construtores.
- Centralize estado global com **Signals Store** (Angular 19) ou **NgRx**.
- Documente componentes e serviços com **TSDoc**.

---

## ✅ Checklist Rápido
- [ ] Estrutura modular clara (standalone quando possível).
- [ ] ChangeDetectionStrategy.OnPush aplicado.
- [ ] Lazy loading em rotas.
- [ ] Async pipe em templates.
- [ ] Tipagem TypeScript estrita.
- [ ] Testes unitários e e2e cobrindo casos principais.
- [ ] Sanitização de dados aplicada.
- [ ] Uso correto de Signals e RxJS.
- [ ] CI/CD com lint, testes e build configurados.
- [ ] Documentação de componentes e serviços.

---

📖 **Referências Oficiais:**
- [Angular Docs](https://angular.dev)
- [Angular Style Guide](https://angular.dev/style-guide)
- [RxJS Docs](https://rxjs.dev)
- [Cypress](https://www.cypress.io/) / [Playwright](https://playwright.dev/)

