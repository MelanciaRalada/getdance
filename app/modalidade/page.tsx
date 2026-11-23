import Link from 'next/link'
import { Outfit, DM_Sans } from 'next/font/google'

const outfit = Outfit({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-outfit' })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-dm' })

const numeroWhats = '5511915699862'

const linkWhats = (modalidade: string) =>
  `https://wa.me/${numeroWhats}?text=${encodeURIComponent(
    `Olá! Gostaria de conhecer as aulas de ${modalidade}.`
  )}`

const modalidades = [
  {
    id: 'hip-hop',
    emoji: '🔥',
    cor: '#FFDDEA',
    nivel: 'Iniciante ao avançado',
    nome: 'Hip Hop',
    frase: 'Atitude, ritmo e muita personalidade.',
    texto:
      'Nascido nas ruas dos Estados Unidos nos anos 1970, o hip hop é a dança da atitude. Aqui você solta o corpo, cria o seu groove e ganha confiança a cada aula.',
    aprende: ['Bases e grooves', 'Musicalidade e isolamentos', 'Coreografias com hits atuais'],
    ideal: 'Quem quer energia, ritmo e se divertir sem pressão.',
  },
  {
    id: 'jazz',
    emoji: '⭐',
    cor: '#FFEEC7',
    nivel: 'Todas as idades',
    nome: 'Jazz',
    frase: 'Expressão, técnica e movimentos marcantes.',
    texto:
      'O jazz une técnica, força e expressão. É a modalidade para quem gosta de coreografias com cara de palco, giros, saltos e muito sentimento.',
    aprende: ['Giros, saltos e alongamento', 'Expressão corporal e facial', 'Coreografias de palco'],
    ideal: 'Quem quer técnica sem perder a diversão, em qualquer idade.',
  },
  {
    id: 'ballet',
    emoji: '🩰',
    cor: '#EDE3FF',
    nivel: 'Infantil e adulto',
    nome: 'Ballet',
    frase: 'Leveza, equilíbrio e elegância.',
    texto:
      'A base de muitas outras danças. No ballet você trabalha postura, equilíbrio e coordenação, num ritmo que respeita o tempo de cada aluno, das crianças aos adultos.',
    aprende: ['Postura e alinhamento', 'Barra e exercícios de centro', 'Flexibilidade e coordenação'],
    ideal: 'Quem busca delicadeza, disciplina e consciência corporal.',
  },
  {
    id: 'street-dance',
    emoji: '🎧',
    cor: '#FFE5D6',
    nivel: 'Iniciante ao avançado',
    nome: 'Street Dance',
    frase: 'Aprenda a dançar do seu próprio jeito.',
    texto:
      'Uma mistura de estilos urbanos em uma aula só. O foco é a liberdade: você experimenta, improvisa e descobre o seu estilo junto com a turma.',
    aprende: ['Mix de estilos urbanos', 'Improviso e freestyle', 'Trocas de energia em roda'],
    ideal: 'Quem quer criar o próprio estilo e dançar sem regras rígidas.',
  },
]

const css = `
.gd{--cream:#FFF9F2;--pink:#F0408F;--yellow:#FFC953;--ink:#2A2330;--muted:#7A7280;
  background:var(--cream);color:var(--ink);font-family:var(--font-dm),system-ui,sans-serif;min-height:100vh}
.gd *{box-sizing:border-box}
.gd h1,.gd h2,.gd h3,.gd .logo{font-family:var(--font-outfit),system-ui,sans-serif;letter-spacing:-.03em;margin:0}
.gd a{color:inherit;text-decoration:none}
.gd a:focus-visible{outline:3px solid var(--ink);outline-offset:3px}
.gd .wrap{max-width:1120px;margin:0 auto;padding:0 24px}

.gd nav{display:flex;align-items:center;justify-content:space-between;padding:20px 0}
.gd .logo{font-size:28px;font-weight:800}
.gd .logo b{color:var(--pink);font-weight:800}
.gd .logo i{color:var(--yellow);font-style:normal;font-size:20px;margin-left:4px}
.gd .links{display:flex;gap:32px;font-weight:700;font-size:14px}
.gd .btn{display:inline-block;background:var(--pink);color:#fff;font-weight:700;font-size:15px;
  padding:14px 26px;border-radius:999px;transition:transform .15s}
.gd .btn:hover{transform:translateY(-2px)}

.gd .eyebrow{color:var(--pink);font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
.gd .hero{padding:72px 0 56px;display:flex;justify-content:space-between;align-items:flex-end;gap:32px;flex-wrap:wrap}
.gd .hero h1{font-size:clamp(44px,7vw,84px);line-height:1;font-weight:800;margin-top:16px;max-width:760px}
.gd .hero h1 span,.gd .fim h2 span{color:var(--pink)}
.gd .hero p{color:var(--muted);line-height:1.7;max-width:300px;margin:0}

.gd .faixa{background:var(--yellow);padding:22px 0;overflow:hidden}
.gd .faixa div{display:flex;justify-content:space-around;gap:24px;font-family:var(--font-outfit),sans-serif;
  font-weight:800;letter-spacing:.14em;color:#5b3a12;white-space:nowrap}
.gd .faixa em{color:var(--pink);font-style:normal}

.gd .lista{padding:72px 0 24px;display:grid;gap:96px}
.gd .mod{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;scroll-margin-top:24px}
.gd .mod:nth-child(even) .cartao{order:2}
.gd .cartao{border-radius:32px;aspect-ratio:1/.9;position:relative;display:flex;align-items:center;justify-content:center}
.gd .cartao .emoji{font-size:clamp(88px,14vw,150px);line-height:1}
.gd .cartao .nivel{position:absolute;left:24px;bottom:24px;background:#fff;border-radius:999px;
  padding:8px 16px;font-size:13px;font-weight:700}
.gd .mod h2{font-size:clamp(40px,5vw,64px);font-weight:800;line-height:1}
.gd .frase{font-family:var(--font-outfit),sans-serif;font-size:22px;font-weight:600;margin:12px 0 20px;color:var(--pink)}
.gd .texto{color:var(--muted);line-height:1.75;margin:0 0 24px;max-width:480px}
.gd h3{font-size:16px;font-weight:700;margin-bottom:12px}
.gd ul{list-style:none;padding:0;margin:0 0 24px;display:flex;flex-wrap:wrap;gap:10px}
.gd li{background:#fff;border:2px solid var(--ink);border-radius:999px;padding:8px 16px;font-size:14px;font-weight:500}
.gd .ideal{font-size:15px;line-height:1.6;margin:0 0 28px;max-width:480px}
.gd .ideal strong{font-weight:700}

.gd .fim{text-align:center;padding:96px 0 104px}
.gd .fim h2{font-size:clamp(36px,5.5vw,64px);font-weight:800;line-height:1.05;margin-bottom:28px}
.gd footer{text-align:center;color:var(--muted);font-size:13px;padding:0 0 40px}

@media (max-width:760px){
  .gd .links{display:none}
  .gd .mod{grid-template-columns:1fr;gap:28px}
  .gd .mod:nth-child(even) .cartao{order:0}
  .gd .lista{gap:72px}
  .gd .faixa div{justify-content:flex-start}
}
`

export default function Modalidades() {
  return (
    <div className={`gd ${outfit.variable} ${dmSans.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="wrap">
        <nav>
          <Link href="/" className="logo">
            get<b>dance.</b>
            <i>✳</i>
          </Link>
          <div className="links">
            <Link href="/#horarios">Horários</Link>
            <Link href="/#sobre">Sobre nós</Link>
          </div>
          <Link href="/cadastro" className="btn">
            Quero dançar! ↗
          </Link>
        </nav>

        <header className="hero">
          <div>
            <span className="eyebrow">✳ Escolha seu estilo</span>
            <h1>
              Qual é a sua <span>vibe?</span>
            </h1>
          </div>
          <p>Tem espaço para todo mundo. Veja o que cada modalidade traz e encontre a que combina com você.</p>
        </header>
      </div>

      <div className="faixa" aria-hidden="true">
        <div>
          <span>DANCE</span>
          <em>✳</em>
          <span>EXPRESS</span>
          <em>✳</em>
          <span>REPEAT</span>
          <em>✳</em>
          <span>HAVE FUN!</span>
        </div>
      </div>

      <main className="wrap">
        <div className="lista">
          {modalidades.map((m) => (
            <section key={m.id} id={m.id} className="mod">
              <div className="cartao" style={{ background: m.cor }}>
                <span className="emoji" aria-hidden="true">
                  {m.emoji}
                </span>
                <span className="nivel">{m.nivel}</span>
              </div>

              <div>
                <h2>{m.nome}</h2>
                <p className="frase">{m.frase}</p>
                <p className="texto">{m.texto}</p>

                <h3>O que você vai aprender</h3>
                <ul>
                  {m.aprende.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <p className="ideal">
                  <strong>Ideal para:</strong> {m.ideal}
                </p>

                <a href={linkWhats(m.nome)} target="_blank" rel="noopener noreferrer" className="btn">
                  Quero experimentar ↗
                </a>
              </div>
            </section>
          ))}
        </div>

        <section className="fim">
          <h2>
            Todo mundo pode dançar.
            <br />
            Inclusive <span>você.</span>
          </h2>
        </section>
      </main>

      <footer>© getdance. Feel the music. Move your body.</footer>
    </div>
  )
}