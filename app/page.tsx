import type { Metadata } from "next";
import Link from 'next/link';
export const metadata: Metadata = {
  title: "Get Dance | Escola de Dança",
  description: "Encontre seu ritmo na Get Dance!",
};

const modalidades = [
  {
    nome: 'Hip Hop',
    descricao: 'Atitude, ritmo e muita personalidade.',
    emoji: '🔥',
    cor: 'pink',
    nivel: 'Iniciante ao avançado',
  },
  {
    nome: 'Jazz',
    descricao: 'Expressão, técnica e movimentos marcantes.',
    emoji: '⭐',
    cor: 'yellow',
    nivel: 'Todas as idades',
  },
  {
    nome: 'Ballet',
    descricao: 'Leveza, equilíbrio e elegância.',
    emoji: '🩰',
    cor: 'purple',
    nivel: 'Infantil e adulto',
  },
  {
    nome: 'Street Dance',
    descricao: 'Aprenda a dançar do seu próprio jeito.',
    emoji: '🎧',
    cor: 'orange',
    nivel: 'Iniciante ao avançado',
  },
]

export default function Page() {
  return (

    <main className="gd-page">

      <header className="gd-header">
        <a href="#" className="gd-logo">
          get<span>dance.</span>
          <i>✳</i>
        </a>

        <nav className="gd-nav">
          <a href="#horarios">Horários</a>
          <a href="#sobre">Sobre nós</a>
        </nav>

        <a href="/cadastro" className="gd-header-button">
          Quero dançar! ↗
        </a>
      </header>

      <section className="gd-hero" id="inicio">
        <div className="gd-hero-content">
          <span className="gd-tag">
            ✳ SEU RITMO, SUA EXPRESSÃO
          </span>

          <h1>
            A vida fica
            <br />
            melhor quando
            <br />
            a gente <span>dança.</span>
          </h1>

          <p>
            Descubra seu ritmo, conheça pessoas
            incríveis e transforme cada passo
            em uma nova experiência.
          </p>

          <div className="gd-hero-buttons">
            <a href="#aulas" className="gd-primary-button">
              Conheça nossas aulas →
            </a>
          </div>

          <div className="gd-hero-note">
            <span>✦</span> Todo mundo pode dançar. Inclusive você!
          </div>
        </div>

        <div className="gd-hero-art">
          <div className="gd-sun"></div>
          <div className="gd-art-circle">
            <span>LET'S</span>
            <strong>DANCE!</strong>
            <span className="gd-art-star">✳</span>
          </div>
          <div className="gd-dancer">🕺</div>
          <span className="gd-floating gd-float-one">♫</span>
          <span className="gd-floating gd-float-two">✳</span>
          <span className="gd-floating gd-float-three">✦</span>
          <div className="gd-art-caption">
            FEEL THE MUSIC. MOVE YOUR BODY.
          </div>
        </div>
      </section>

      <section className="gd-strip">
        <span>DANCE</span>
        <span>✳</span>
        <span>EXPRESS</span>
        <span>✳</span>
        <span>REPEAT</span>
        <span>✳</span>
        <span>HAVE FUN!</span>
      </section>

      <section className="gd-classes" id="aulas">
        <div className="gd-section-heading">
          <div>
            <span className="gd-tag">ESCOLHA SEU ESTILO</span>
            <h2>Qual é a sua <span>vibe?</span></h2>
          </div>
          <p>
            Tem espaço para todo mundo.
            Encontre a modalidade que combina com você!
          </p>
        </div>

        <div className="gd-class-grid">
          {modalidades.map((aula) => (
            <article
              className={`gd-class-card ${aula.cor}`}
              key={aula.nome}
            >
              <div className="gd-class-emoji">
                {aula.emoji}
              </div>

              <span className="gd-class-level">
                {aula.nivel}
              </span>

              <h3>{aula.nome}</h3>
              <p>{aula.descricao}</p>

              <a href="#matricula">
                Quero conhecer ↗
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="gd-about" id="sobre">
        <div className="gd-about-sticker">
          <span>100%</span>
          <strong>PAIXÃO<br />PELA DANÇA</strong>
          <span>✳</span>
        </div>

        <div>
          <span className="gd-tag">MUITO MAIS QUE DANÇAR</span>
          <h2>
            Aqui, o importante
            é <span>se divertir.</span>
          </h2>
          <p>
            A Get Dance é um espaço para aprender,
            experimentar, fazer amizades e descobrir
            tudo o que a dança pode proporcionar.
            Não importa se você está começando
            agora ou já tem experiência.
          </p>
        </div>
      </section>

      <section className="gd-schedule" id="horarios">
        <span className="gd-tag">ORGANIZE SUA ROTINA</span>
        <h2>Seu próximo passo começa aqui.</h2>
        <p>
          Temos diferentes modalidades e turmas
          para você encontrar seu ritmo.
        </p>
        <a href="/modalidade" className="gd-primary-button">
          Consultar turmas →
        </a>
      </section>

      <section className="gd-enroll" id="matricula">
        <div>
          <span className="gd-tag">VAMOS NESSA?</span>
          <h2>
            Seu lugar é
            <br />
            na pista! <span>♥</span>
          </h2>
          <p>
            Dê o primeiro passo e venha conhecer
            a Get Dance.
          </p>
        </div>

        <a href="https://wa.me/5511915699862?text=Olá! Gostaria de conhecer as aulas de dança." target="_blank" className="gd-enroll-button">
          Fale pelo Whatsapp ↗
        </a>
      </section>

      <footer className="gd-footer">
        <a href="#" className="gd-logo">
          get<span>dance.</span><i>✳</i>
        </a>
        <p>Feito com ritmo e paixão pela dança. ✳</p>
        <span>© 2026 Get Dance</span>
      </footer>

    </main>
  )
}


export function Home() {
  return (
    <main className="p-8">
      <BotaoCurtir />
    </main>
  )
}