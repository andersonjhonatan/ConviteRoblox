import Link from "next/link";

export const metadata = {
  title: "Privacidade | Convite Roblox",
  description: "Como os dados informados no convite demonstrativo são tratados.",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <div className="privacy-card">
        <p className="eyebrow">K2 TECH • TRANSPARÊNCIA</p>
        <h1>Privacidade</h1>
        <p>
          Este convite é uma demonstração de portfólio. O nome e a quantidade informados no formulário
          permanecem somente no seu navegador e são usados para preparar a mensagem do WhatsApp.
        </p>
        <h2>O que este site não faz</h2>
        <ul>
          <li>Não grava respostas em banco de dados.</li>
          <li>Não instala ferramentas de rastreamento ou publicidade.</li>
          <li>Não envia seus dados sem uma ação sua no WhatsApp.</li>
        </ul>
        <p>
          Em uma versão comercial com armazenamento de confirmações, esta página deverá ser atualizada
          com a finalidade, o prazo de retenção e o canal de atendimento do responsável pelo evento.
        </p>
        <Link href="/">← Voltar para o convite</Link>
      </div>
    </main>
  );
}
