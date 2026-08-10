"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { invitationConfig as config } from "./invitation-config";

const eventStart = new Date(config.event.startsAt);
const eventEnd = new Date(config.event.endsAt);
const eventTimestamp = eventStart.getTime();
const missions = config.missions;

const formatEventPart = (options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("pt-BR", { ...options, timeZone: config.event.timeZone }).format(eventStart);

const eventDisplay = {
  day: formatEventPart({ day: "2-digit" }),
  month: formatEventPart({ month: "long" }).toLocaleUpperCase("pt-BR"),
  weekday: formatEventPart({ weekday: "long" }).toLocaleUpperCase("pt-BR"),
  year: formatEventPart({ year: "numeric" }),
  startTime: formatEventPart({ hour: "2-digit", minute: "2-digit", hour12: false }),
  endTime: new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: config.event.timeZone,
  }).format(eventEnd),
};

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const emptyCountdown: Countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
const countdownLabels: Record<keyof Countdown, string> = {
  days: "DIAS",
  hours: "HORAS",
  minutes: "MIN",
  seconds: "SEG",
};

export default function Home() {
  const [phase, setPhase] = useState<"loading" | "ready" | "playing">("loading");
  const [progress, setProgress] = useState(0);
  const [soundOn, setSoundOn] = useState(false);
  const [countdown, setCountdown] = useState(emptyCountdown);
  const [collected, setCollected] = useState<number[]>([]);
  const [collecting, setCollecting] = useState<number | null>(null);
  const [heroPosition, setHeroPosition] = useState({ left: "8%", top: "72%" });
  const [rsvpPrepared, setRsvpPrepared] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [partySize, setPartySize] = useState("1");
  const pendingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (phase !== "loading") return;
    const timer = setInterval(() => {
      setProgress((current) => {
        const next = Math.min(100, current + (current < 72 ? 4 : 2));
        if (next === 100) {
          clearInterval(timer);
          setTimeout(() => setPhase("ready"), 280);
        }
        return next;
      });
    }, 70);
    return () => clearInterval(timer);
  }, [phase]);

  useEffect(() => {
    const updateCountdown = () => {
      const distance = Math.max(0, eventTimestamp - Date.now());
      setCountdown({
        days: Math.floor(distance / 86_400_000),
        hours: Math.floor((distance / 3_600_000) % 24),
        minutes: Math.floor((distance / 60_000) % 60),
        seconds: Math.floor((distance / 1_000) % 60),
      });
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (pendingTimer.current) clearTimeout(pendingTimer.current);
    };
  }, []);

  const playTone = (frequency = 520) => {
    if (!soundOn || typeof window === "undefined") return;
    const AudioContextClass = window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.value = frequency;
    oscillator.type = "square";
    gain.gain.setValueAtTime(0.06, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.14);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.addEventListener("ended", () => void context.close());
    oscillator.start();
    oscillator.stop(context.currentTime + 0.15);
  };

  const enterGame = () => {
    setPhase("playing");
    setTimeout(() => document.getElementById("inicio")?.focus(), 150);
  };

  const collectCrystal = (id: number) => {
    if (collected.includes(id) || collecting !== null) return;
    const mission = missions.find((item) => item.id === id);
    if (!mission) return;
    setCollecting(id);
    setHeroPosition({ left: mission.left, top: mission.top });
    playTone(620 + id * 80);
    pendingTimer.current = setTimeout(() => {
      setCollected((current) => [...current, id]);
      setCollecting(null);
    }, 650);
  };

  const collectNext = () => {
    const next = missions.find((mission) => !collected.includes(mission.id));
    if (next) collectCrystal(next.id);
  };

  const submitRsvp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRsvpPrepared(true);
    playTone(880);
  };

  const whatsappText = encodeURIComponent(
    `Olá! Eu, ${guestName.trim()}, gostaria de confirmar ${partySize} ${partySize === "1" ? "presença" : "presenças"} na aventura do ${config.celebrant.name}! 🎮`,
  );
  const whatsappBase = config.rsvp.whatsappNumber
    ? `https://wa.me/${config.rsvp.whatsappNumber}`
    : "https://wa.me/";
  const whatsappUrl = `${whatsappBase}?text=${whatsappText}`;

  return (
    <main className="site-shell">
      {phase !== "playing" && (
        <section className="game-gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
          <div className="gate-grid" aria-hidden="true" />
          <div className="pixel-cloud cloud-one" aria-hidden="true" />
          <div className="pixel-cloud cloud-two" aria-hidden="true" />
          <div className="gate-card">
            <div className="gate-status">
              <span className="status-dot" /> SERVIDOR DA FESTA ONLINE
            </div>
            <div className="gate-avatars" aria-hidden="true">
              <Image unoptimized priority src={config.assets.avatarGirl} alt="" width={420} height={420} className="gate-avatar avatar-left" />
              <Image unoptimized priority src={config.assets.avatarBoy} alt="" width={420} height={420} className="gate-avatar avatar-right" />
            </div>
            <p className="eyebrow">UMA NOVA AVENTURA FOI DESBLOQUEADA</p>
            <h1 className="gate-title" id="gate-title">
              {config.celebrant.name.toLocaleUpperCase("pt-BR")} <span>{config.celebrant.age}</span>
            </h1>
            <p className="gate-subtitle">A jornada pelas ilhas começa agora</p>

            <div className="loading-box">
              <div className="loading-copy">
                <span>{phase === "ready" ? "MUNDO CARREGADO!" : "CARREGANDO MAPA..."}</span>
                <b>{progress}%</b>
              </div>
              <div
                className="loading-track"
                role="progressbar"
                aria-label="Carregamento do convite"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
              >
                <span style={{ width: `${progress}%` }} />
              </div>
              <p>{progress < 45 ? "Gerando ilhas" : progress < 85 ? "Conectando jogadores" : "Preparando missão"}</p>
            </div>

            <button
              type="button"
              className={`play-button ${phase === "ready" ? "is-ready" : ""}`}
              onClick={enterGame}
              disabled={phase !== "ready"}
            >
              <span className="play-icon" aria-hidden="true">▶</span>
              {phase === "ready" ? "ENTRAR NO JOGO" : "AGUARDE..."}
            </button>
            <button type="button" className="skip-gate" onClick={enterGame}>PULAR ABERTURA</button>
            <p className="gate-hint">Melhor experiência com o som ativado</p>
            <span className="sr-only" role="status">{phase === "ready" ? "Convite pronto para abrir" : "Carregando convite"}</span>
          </div>
        </section>
      )}

      <div className="invitation-content" inert={phase !== "playing"} aria-hidden={phase !== "playing"}>
        <a className="skip-link" href="#detalhes">Pular para os detalhes do convite</a>
        <nav className="game-nav" aria-label="Navegação do convite">
          <a className="nav-brand" href="#inicio" aria-label="Voltar ao início">
            <span className="brand-cube" aria-hidden="true" />
            <span>MISSÃO <b>{config.celebrant.name.toLocaleUpperCase("pt-BR")}</b></span>
          </a>
          <div className="nav-actions">
            <button
              type="button"
              onClick={() => setSoundOn((current) => !current)}
              aria-pressed={soundOn}
              aria-label={soundOn ? "Desativar efeitos sonoros" : "Ativar efeitos sonoros"}
            >
              {soundOn ? "🔊 SOM ON" : "🔇 SOM OFF"}
            </button>
            <a href="#presenca">CONFIRMAR</a>
          </div>
        </nav>

        <section className="hero" id="inicio" tabIndex={-1}>
          <div className="hero-backdrop" aria-hidden="true" />
          <div className="hero-vignette" aria-hidden="true" />
          <div className="floating-cube cube-a" aria-hidden="true" />
          <div className="floating-cube cube-b" aria-hidden="true" />
          <div className="floating-cube cube-c" aria-hidden="true" />

          <div className="hero-copy">
            <div className="server-tag"><span /> EVENTO ESPECIAL • 1 DIA APENAS</div>
            <p className="hero-kicker">VOCÊ FOI CONVOCADO PARA A</p>
            <h2>GRANDE <span>AVENTURA</span></h2>
            <div className="name-lockup">
              <small>ANIVERSÁRIO DO</small>
              <strong>{config.celebrant.name.toLocaleUpperCase("pt-BR")}</strong>
              <em>LEVEL {config.celebrant.age}</em>
            </div>
            <p className="hero-description">
              Reúna sua equipe, atravesse as ilhas e desbloqueie uma comemoração lendária.
            </p>
            <div className="hero-actions">
              <a href="#missao" className="primary-action"><span aria-hidden="true">▶</span> INICIAR MISSÃO</a>
              <a href="#detalhes" className="secondary-action">VER DETALHES</a>
            </div>
          </div>

          <div className="hero-characters" aria-label="Avatares em estilo Roblox">
            <Image unoptimized priority src={config.assets.avatarGirl} alt="Avatar feminino em estilo Roblox" width={420} height={420} className="hero-character character-back" />
            <Image unoptimized priority src={config.assets.avatarBoy} alt="Avatar masculino em estilo Roblox" width={420} height={420} className="hero-character character-front" />
            <div className="level-badge">LVL<br /><b>{config.celebrant.age}</b></div>
          </div>

          <a className="scroll-cue" href="#detalhes">
            <span>EXPLORE O MAPA</span>
            <i aria-hidden="true">⌄</i>
          </a>
        </section>

        <section className="details-section" id="detalhes">
          <div className="section-heading">
            <p className="eyebrow">INFORMAÇÕES DA PARTIDA</p>
            <h2>DETALHES DA <span>MISSÃO</span></h2>
            <p>Salve as coordenadas e prepare seu melhor avatar.</p>
          </div>

          <div className="detail-grid">
            <article className="game-card date-card">
              <div className="card-icon" aria-hidden="true">📅</div>
              <p>DATA DO EVENTO</p>
              <strong>{eventDisplay.day}</strong>
              <h3>{eventDisplay.month}</h3>
              <span>{eventDisplay.weekday} • {eventDisplay.year}</span>
            </article>
            <article className="game-card time-card">
              <div className="card-icon" aria-hidden="true">⏱</div>
              <p>HORÁRIO DE INÍCIO</p>
              <strong>{eventDisplay.startTime}</strong>
              <h3>ATÉ {eventDisplay.endTime}</h3>
              <span>ENTRE NO SERVIDOR NO HORÁRIO</span>
            </article>
            <article className="game-card location-card">
              <div className="card-icon" aria-hidden="true">📍</div>
              <p>LOCAL DA AVENTURA</p>
              <strong>ARENA</strong>
              <h3>{config.event.venueShortName.toLocaleUpperCase("pt-BR")}</h3>
              <span>{config.event.address.toLocaleUpperCase("pt-BR")}</span>
              <a href={config.event.mapsUrl} target="_blank" rel="noopener noreferrer">ABRIR LOCALIZAÇÃO ↗</a>
            </article>
          </div>

          <div className="countdown-panel" aria-label="Contagem regressiva para a festa">
            <div>
              <p>O SERVIDOR ABRE EM</p>
              <span>CONTAGEM REGRESSIVA</span>
            </div>
            {(Object.entries(countdown) as Array<[keyof Countdown, number]>).map(([key, value]) => (
              <div className="time-unit" key={key}>
                <strong>{String(value).padStart(2, "0")}</strong>
                <span>{countdownLabels[key]}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mission-section" id="missao">
          <div className="section-heading light-heading">
            <p className="eyebrow">MINIGAME INTERATIVO</p>
            <h2>RECUPERE OS <span>{missions.length} CRISTAIS</span></h2>
            <p>Clique nos cristais: seu avatar vai até cada item e coleta de verdade.</p>
          </div>

          <div className="mission-layout">
            <div className="mission-map" aria-label="Mapa interativo das ilhas">
              <div className="map-hud">
                <span>ILHA 01 • PORTAL DA FLORESTA</span>
                <b>{collected.length}/{missions.length} CRISTAIS</b>
              </div>
              {missions.map((mission) => {
                const isCollected = collected.includes(mission.id);
                return (
                  <button
                    type="button"
                    key={mission.id}
                    className={`crystal crystal-${mission.id} ${isCollected ? "is-collected" : ""}`}
                    style={{ left: mission.left, top: mission.top }}
                    onClick={() => collectCrystal(mission.id)}
                    disabled={isCollected || collecting !== null}
                    aria-label={isCollected ? `${mission.label} coletado` : `Coletar ${mission.label}`}
                  >
                    <span aria-hidden="true">◆</span>
                  </button>
                );
              })}
              <Image
                unoptimized
                src={config.assets.avatarBoy}
                alt="Avatar se movendo pelo mapa"
                width={420}
                height={420}
                className={`map-avatar ${collecting !== null ? "is-moving" : ""}`}
                style={{ left: heroPosition.left, top: heroPosition.top }}
              />
              {collected.length === missions.length && (
                <div className="mission-complete" role="status">
                  <span aria-hidden="true">🏆</span>
                  <strong>MISSÃO CONCLUÍDA!</strong>
                  <p>Você desbloqueou a confirmação de presença.</p>
                  <a href="#presenca">CONFIRMAR AGORA</a>
                </div>
              )}
            </div>

            <aside className="mission-panel">
              <p className="panel-label">PROGRESSO DA EQUIPE</p>
              <div
                className="progress-ring"
                role="progressbar"
                aria-label="Cristais coletados"
                aria-valuemin={0}
                aria-valuemax={missions.length}
                aria-valuenow={collected.length}
                style={{ "--progress": `${collected.length * (360 / missions.length)}deg` } as React.CSSProperties}
              >
                <div><strong>{collected.length}</strong><span>DE {missions.length}</span></div>
              </div>
              <h3>{collected.length === missions.length ? "PORTAL LIBERADO" : "ENCONTRE OS CRISTAIS"}</h3>
              <p>
                {collected.length === missions.length
                  ? "Excelente, jogador! Sua equipe está pronta para a festa."
                  : "Explore o cenário e toque em cada cristal brilhante para completar o mapa."}
              </p>
              <div className="mission-list" aria-label="Progresso das missões">
                {missions.map((mission) => (
                  <span key={mission.id} className={collected.includes(mission.id) ? "done" : ""}>
                    {collected.includes(mission.id) ? "✓" : mission.id + 1}
                  </span>
                ))}
              </div>
              <button type="button" onClick={collectNext} disabled={collected.length === missions.length || collecting !== null}>
                {collecting !== null ? "AVATAR A CAMINHO..." : collected.length === missions.length ? "MISSÃO COMPLETA" : "ENCONTRAR PRÓXIMO"}
              </button>
            </aside>
          </div>
          <p className="asset-note">Cenário demonstrativo inspirado em experiências disponíveis na plataforma Roblox.</p>
        </section>

        <section className="rsvp-section" id="presenca">
          <div className="rsvp-visual" aria-hidden="true">
            <div className="rsvp-image" />
            <Image unoptimized src={config.assets.avatarAlt} alt="" width={420} height={420} />
            <span className="invite-ticket">CONVITE<br /><b>VIP</b></span>
          </div>

          <div className="rsvp-card">
            {!rsvpPrepared ? (
              <>
                <p className="eyebrow">ÚLTIMA FASE</p>
                <h2>A EQUIPE PODE <span>CONTAR COM VOCÊ?</span></h2>
                <p>Prepare sua resposta e envie pelo WhatsApp para concluir a confirmação.</p>
                <form onSubmit={submitRsvp}>
                  <label>
                    NOME DO JOGADOR
                    <input
                      required
                      minLength={2}
                      maxLength={80}
                      value={guestName}
                      onChange={(event) => setGuestName(event.target.value)}
                      placeholder="Digite seu nome"
                      autoComplete="name"
                    />
                  </label>
                  <label>
                    QUANTOS JOGADORES?
                    <select value={partySize} onChange={(event) => setPartySize(event.target.value)}>
                      {Array.from({ length: config.rsvp.maxPartySize }, (_, index) => index + 1).map((amount) => (
                        <option value={String(amount)} key={amount}>{amount} {amount === 1 ? "jogador" : "jogadores"}</option>
                      ))}
                    </select>
                  </label>
                  <button type="submit"><span aria-hidden="true">✓</span> PREPARAR CONFIRMAÇÃO</button>
                </form>
                <small>Confirme até {config.rsvp.deadline}. Seus dados não são armazenados neste site.</small>
              </>
            ) : (
              <div className="success-state" role="status">
                <div className="success-icon" aria-hidden="true">✓</div>
                <p className="eyebrow">RESPOSTA PREPARADA</p>
                <h2>FALTA SÓ <span>ENVIAR!</span></h2>
                <p>{guestName}, abra o WhatsApp e envie a mensagem para concluir sua confirmação.</p>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">CONFIRMAR PELO WHATSAPP</a>
                <button type="button" onClick={() => setRsvpPrepared(false)}>ALTERAR RESPOSTA</button>
              </div>
            )}
          </div>
        </section>

        <footer>
          <span className="footer-cube" aria-hidden="true" />
          <p>Desenvolvido por Anderson Jhonatan da K2 Tech</p>
          <a href="/privacidade">Privacidade</a>
          <small>Projeto temático demonstrativo, não afiliado nem patrocinado pela Roblox Corporation.</small>
        </footer>
      </div>
    </main>
  );
}
