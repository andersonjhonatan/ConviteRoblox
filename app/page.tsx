'use client';

import { useEffect, useState } from 'react';
import { CalendarDays, Clock3, MapPin, CheckCircle2, Gamepad2 } from 'lucide-react';

export default function Home() {
  const [loading, setLoading] = useState(0);
  const [entered, setEntered] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (entered) return;
    const timer = setInterval(() => setLoading(v => v >= 100 ? 100 : v + 4), 65);
    return () => clearInterval(timer);
  }, [entered]);

  return (
    <main>
      {!entered && <section className="loader-screen">
        <div className="loader-logo"><span>R</span></div>
        <p className="eyebrow">CONECTANDO AO SERVIDOR...</p>
        <h1>A aventura de Lucas<br/><b>está carregando</b></h1>
        <div className="bar"><i style={{width:`${loading}%`}} /></div>
        <div className="load-meta"><span>CARREGANDO MAPA: ILHAS DA AVENTURA</span><strong>{loading}%</strong></div>
        <button className="play" disabled={loading < 100} onClick={() => setEntered(true)}>{loading < 100 ? 'PREPARANDO...' : 'ENTRAR NO JOGO'}</button>
      </section>}

      <section className="hero">
        <div className="sky"><div className="cloud c1"/><div className="cloud c2"/></div>
        <div className="hud"><span><Gamepad2 size={18}/> LUCAS_WORLD</span><span className="online">● SERVIDOR ONLINE</span></div>
        <div className="hero-copy">
          <p className="tag">MISSÃO ESPECIAL DESBLOQUEADA</p>
          <h2>LUCAS<br/><em>8 ANOS</em></h2>
          <p>Prepare seu avatar. Uma nova aventura vai começar entre ilhas, tesouros e desafios.</p>
          <a href="#missao" className="primary">ACEITAR MISSÃO</a>
        </div>
        <div className="islands" aria-hidden="true">
          <div className="island back"><span>🏝️</span></div>
          <div className="island main-island"><span>🏰</span><b className="avatar">😎</b></div>
          <div className="island side"><span>🌴</span></div>
        </div>
      </section>

      <section id="missao" className="mission section">
        <p className="tag">DETALHES DA MISSÃO</p><h3>VOCÊ FOI CONVOCADO!</h3>
        <p className="intro">Lucas chegou ao nível 8 e precisa da sua equipe para completar a maior aventura do mapa.</p>
        <div className="cards">
          <article><CalendarDays/><small>DATA DA PARTIDA</small><strong>22 AGO</strong><span>Sábado</span></article>
          <article><Clock3/><small>HORÁRIO</small><strong>16:00</strong><span>Até 20:00</span></article>
          <article><MapPin/><small>LOCAL</small><strong>PLAY ARENA</strong><span>Av. das Aventuras, 120</span></article>
        </div>
      </section>

      <section className="map section">
        <p className="tag">MAPA DA AVENTURA</p><h3>ESCOLHA SUA ILHA</h3>
        <div className="map-grid">
          <article><div>🌴</div><b>Ilha Spawn</b><span>Onde a equipe se encontra.</span></article>
          <article><div>💎</div><b>Ilha do Tesouro</b><span>Doces e recompensas raras.</span></article>
          <article><div>🎂</div><b>Ilha do Boss</b><span>O desafio final: o parabéns!</span></article>
        </div>
      </section>

      <section className="rsvp section">
        <div className="quest-box">
          <p className="tag">OBJETIVO PRINCIPAL</p><h3>CONFIRME SUA PRESENÇA</h3>
          <p>Sua vaga no servidor está reservada. Confirme para entrar na equipe do Lucas.</p>
          {!confirmed ? <button className="confirm" onClick={() => setConfirmed(true)}>✓ CONFIRMAR PRESENÇA</button> : <div className="success"><CheckCircle2/> PRESENÇA CONFIRMADA!<small>Você entrou para a equipe.</small></div>}
          <small className="deadline">CONFIRME ATÉ 18 DE AGOSTO</small>
        </div>
      </section>
      <footer>Desenvolvido por Anderson Jhonatan da K2 Tech</footer>
    </main>
  );
}
