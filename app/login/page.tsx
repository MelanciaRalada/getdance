'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Outfit, DM_Sans } from 'next/font/google'
import { supabase } from '@/lib/supabase'

const outfit = Outfit({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-outfit' })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-dm' })

function traduzErro(msg: string) {
  const m = msg.toLowerCase()
  if (m.includes('invalid login')) return 'E-mail ou senha incorretos. Confira e tente de novo.'
  if (m.includes('not confirmed')) return 'Confirme seu e-mail antes de entrar. Procure o link na sua caixa de entrada.'
  if (m.includes('rate limit')) return 'Muitas tentativas. Espere um pouco e tente de novo.'
  return 'Não foi possível entrar. Tente novamente.'
}

const css = `
.log{--cream:#FFF9F2;--pink:#F0408F;--yellow:#FFC953;--ink:#2A2330;--muted:#7A7280;
  background:var(--cream);color:var(--ink);font-family:var(--font-dm),system-ui,sans-serif;min-height:100vh}
.log *{box-sizing:border-box}
.log h1,.log .logo,.log .selo{font-family:var(--font-outfit),system-ui,sans-serif;letter-spacing:-.03em;margin:0}
.log a{color:inherit}
.log a:focus-visible,.log button:focus-visible{outline:3px solid var(--ink);outline-offset:3px}
.log .wrap{max-width:1120px;margin:0 auto;padding:0 24px}

.log nav{padding:20px 0}
.log .logo{font-size:28px;font-weight:800;text-decoration:none}
.log .logo b{color:var(--pink);font-weight:800}
.log .logo i{color:var(--yellow);font-style:normal;font-size:20px;margin-left:4px}

.log .grade{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;padding:40px 0 96px}

.log .arte{position:relative;aspect-ratio:1;max-width:460px;width:100%;margin:0 auto}
.log .sol{position:absolute;right:0;top:6%;width:78%;aspect-ratio:1;border-radius:50%;background:var(--yellow)}
.log .selo{position:absolute;left:4%;top:28%;width:60%;aspect-ratio:1;border-radius:50%;background:var(--pink);
  border:6px solid #fff;box-shadow:14px 14px 0 #E8A9C4;color:#fff;display:flex;flex-direction:column;
  align-items:center;justify-content:center;transform:rotate(-8deg);text-align:center}
.log .selo small{font-size:15px;font-weight:700;letter-spacing:.3em}
.log .selo strong{font-size:clamp(30px,4.4vw,46px);font-weight:800;line-height:1}
.log .selo span{font-size:26px;margin-top:8px}

.log .eyebrow{color:var(--pink);font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
.log h1{font-size:clamp(40px,5.5vw,64px);font-weight:800;line-height:1;margin:14px 0 14px}
.log h1 span{color:var(--pink)}
.log .sub{color:var(--muted);line-height:1.7;margin:0 0 32px;max-width:420px}

.log form{display:grid;gap:20px;max-width:420px}
.log label{display:block;font-size:14px;font-weight:700;margin-bottom:8px}
.log .campo{position:relative}
.log input{width:100%;font:inherit;font-size:16px;color:var(--ink);background:#fff;border:2px solid var(--ink);
  border-radius:16px;padding:15px 18px}
.log input::placeholder{color:#B5AEBB}
.log input:focus{outline:none;border-color:var(--pink);box-shadow:0 0 0 4px #FFDDEA}
.log .senha input{padding-right:84px}
.log .ver{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:0;
  font:inherit;font-size:13px;font-weight:700;color:var(--pink);cursor:pointer;padding:8px 10px;border-radius:999px}

.log .btn{width:100%;background:var(--pink);color:#fff;border:0;border-radius:999px;font:inherit;
  font-size:16px;font-weight:700;padding:16px 26px;cursor:pointer;transition:transform .15s}
.log .btn:hover:not(:disabled){transform:translateY(-2px)}
.log .btn:disabled{opacity:.6;cursor:not-allowed}

.log .erro{background:#FFE5D6;border:2px solid var(--ink);border-radius:16px;padding:12px 16px;font-size:14px;font-weight:500;margin:0}
.log .rodape{margin-top:24px;font-size:15px;color:var(--muted)}
.log .rodape a{color:var(--ink);font-weight:700}

@media (max-width:860px){
  .log .grade{grid-template-columns:1fr;gap:40px;padding-bottom:64px}
  .log .arte{display:none}
}
`

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrar, setMostrar] = useState(false)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  async function entrar(e: FormEvent) {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password: senha })

    if (error) {
      setErro(traduzErro(error.message))
      setCarregando(false)
      return
    }

    router.push('/')
    router.refresh()
  }

  return (
    <div className={`log ${outfit.variable} ${dmSans.variable}`}>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div className="wrap">
        <nav>
          <Link href="/" className="logo">
            get<b>dance.</b>
            <i>✳</i>
          </Link>
        </nav>

        <main className="grade">
          <div className="arte" aria-hidden="true">
            <div className="sol" />
            <div className="selo">
              <small>LET’S</small>
              <strong>DANCE!</strong>
              <span>✳</span>
            </div>
          </div>

          <section>
            <span className="eyebrow">✳ Entrar na conta</span>
            <h1>
              Bom te ver de <span>novo.</span>
            </h1>
            <p className="sub">Entre com seu e-mail e senha para voltar à pista.</p>

            <form onSubmit={entrar} noValidate>
              <div>
                <label htmlFor="email">E-mail</label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="voce@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="senha">Senha</label>
                <div className="campo senha">
                  <input
                    id="senha"
                    type={mostrar ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                  <button type="button" className="ver" onClick={() => setMostrar((v) => !v)} aria-pressed={mostrar}>
                    {mostrar ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
              </div>

              {erro && (
                <p className="erro" role="alert">
                  {erro}
                </p>
              )}

              <button type="submit" className="btn" disabled={carregando || !email || !senha}>
                {carregando ? 'Entrando...' : 'Entrar ↗'}
              </button>
            </form>

            <p className="rodape">
              Ainda não tem conta? <Link href="/cadastro">Criar conta</Link>
            </p>
          </section>
        </main>
      </div>
    </div>
  )
}