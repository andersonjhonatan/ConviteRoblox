# Convite Roblox — Base Premium de Convites Interativos

Convite digital criado pela **K2 Tech** como uma experiência de aniversário em formato de jogo. A pessoa convidada entra em um servidor temático, consulta os detalhes da festa, coleta cristais em um mapa e prepara a confirmação pelo WhatsApp.

> Este repositório também funciona como uma base reutilizável para novos convites premium. Os dados principais foram centralizados para que tema, nome, idade, evento e RSVP possam ser trocados sem procurar textos espalhados pelo projeto.

## Pré-visualização

[Abrir o Convite Roblox](https://convite-roblox.jose-gomes-3350.chatgpt.site)

## Evolução de qualidade

| Avaliação | Antes | Depois desta evolução |
| --- | ---: | ---: |
| Demonstração de portfólio | 8,3/10 | **9,1/10** |
| Base técnica para novos convites | 7,0/10 | **8,7/10** |
| Modelo Roblox para uso comercial | 6,7/10 | **8,2/10** |

A diferença entre a base técnica e o modelo Roblox existe porque as imagens temáticas ainda precisam de comprovação de licença e o número definitivo de WhatsApp deve ser configurado antes de atender um cliente real.

## O que torna esta base poderosa

- Configuração central em `app/invitation-config.ts`.
- Abertura premium com loading e opção de pular.
- Contagem regressiva calculada a partir de uma única data.
- Minigame interativo com avatar em movimento e progresso acessível.
- RSVP transparente: prepara nome e quantidade e só conclui pelo WhatsApp.
- SEO completo com canonical, Open Graph, Twitter Card, robots e sitemap.
- Web App Manifest e favicon próprio.
- Página de privacidade pronta para o fluxo demonstrativo.
- Cabeçalhos básicos de segurança aplicados na borda.
- Imagens com dimensões definidas e zero avisos no lint.
- TypeScript estrito com verificação dedicada.
- Testes de metadados, rotas públicas e cabeçalhos de segurança.
- Dependências atualizadas e auditoria sem vulnerabilidades conhecidas.
- Inventário de assets e situação de licença documentados.
- Responsividade para desktop, tablet e celular.
- Suporte a teclado e preferência de redução de movimento.

## Personalização rápida

Edite primeiro [`app/invitation-config.ts`](app/invitation-config.ts):

```ts
export const invitationConfig = {
  celebrant: { name: "Miguel", age: 8 },
  event: {
    startsAt: "2026-09-19T16:00:00-03:00",
    endsAt: "2026-09-19T20:00:00-03:00",
    venueName: "Arena Pixel Park",
    address: "Av. das Aventuras, 245 • Recife",
  },
  rsvp: {
    deadline: "12 de setembro de 2026",
    whatsappNumber: "", // DDI + DDD + número, somente dígitos
  },
};
```

Depois:

1. Substitua os arquivos em `public/` por imagens autorizadas do novo tema.
2. Ajuste as cores e cenários em `app/globals.css`.
3. Atualize o título, a descrição e a imagem social no mesmo arquivo de configuração.
4. Preencha o número de WhatsApp do responsável.
5. Registre a origem dos assets em [`ASSET-LICENSES.md`](ASSET-LICENSES.md).
6. Rode as verificações antes de publicar.

## Funcionalidades

- Entrada em formato de loading de jogo.
- Som opcional gerado pelo navegador.
- Navegação por seções.
- Data, horário, endereço e link do mapa.
- Contagem regressiva em tempo real.
- Coleta de cinco cristais.
- Avatar que se move até o item selecionado.
- Mensagem de missão concluída.
- Formulário com nome e quantidade de convidados.
- Confirmação final por WhatsApp.
- Página `/privacidade`.
- Rotas `/robots.txt`, `/sitemap.xml` e `/manifest.webmanifest`.

## Tecnologias

- Next.js 16.3
- React 19
- TypeScript 5
- CSS responsivo
- Vinext + Vite
- Cloudflare Workers / ChatGPT Sites

## Estrutura principal

```text
ConviteRoblox/
├── app/
│   ├── invitation-config.ts  # Nome, evento, RSVP, missões e assets
│   ├── page.tsx               # Experiência interativa
│   ├── globals.css            # Visual, animações e responsividade
│   ├── layout.tsx             # SEO social e metadados
│   ├── manifest.ts
│   ├── robots.ts
│   ├── sitemap.ts
│   └── privacidade/page.tsx
├── public/roblox/             # Imagens temáticas
├── tests/                     # Verificações automatizadas
├── worker/                    # Entrada e cabeçalhos de segurança
├── ASSET-LICENSES.md
├── AUDITORIA.md
└── README.md
```

## Executar localmente

### Requisitos

- Node.js `>=22.13.0`
- npm

```bash
npm ci
npm run dev
```

## Verificações

```bash
npm run lint
npm run typecheck
npm run test
npm audit --omit=dev
```

O processo de construção também valida o pacote de publicação, os metadados, as rotas públicas e os cabeçalhos de segurança.

## Confirmação e privacidade

O projeto não afirma que uma presença foi registrada antes do envio. O formulário prepara a mensagem e abre o WhatsApp; nenhum nome é armazenado pelo site.

Para um produto com painel de convidados, será necessário adicionar banco de dados, autenticação administrativa, política de retenção e mecanismo de exclusão.

## Marca e propriedade intelectual

Roblox e os elementos relacionados pertencem aos seus respectivos titulares. Este é um projeto demonstrativo, não afiliado nem patrocinado pela Roblox Corporation. Antes do uso comercial, confirme a licença de cada imagem listada em [`ASSET-LICENSES.md`](ASSET-LICENSES.md).

## Autoria

Desenvolvido por **Anderson Jhonatan — K2 Tech**.

Repositório: [andersonjhonatan/ConviteRoblox](https://github.com/andersonjhonatan/ConviteRoblox)
