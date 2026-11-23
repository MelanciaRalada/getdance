'use client'

import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { Outfit, DM_Sans } from 'next/font/google'
import { supabase } from '@/lib/supabase'


const outfit = Outfit({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-outfit' })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-dm' })

function traduzErro(msg: string) {
  const m = msg.toLowerCase()
  if (m.includes('already registered')) return 'Este e-mail já tem cadastro. Tente entrar.'
  if (m.includes('password')) return 'A senha precisa ter pelo menos 6 caracteres.'
  if (m.includes('invalid') && m.includes('email')) return 'Esse e-mail não parece válido. Confira e tente de novo.'
  if (m.includes('rate limit')) return 'Muitas tentativas. Espere um pouco e tente de novo.'
  return 'Não foi possível criar a conta. Tente novamente.'
}

const css = `
.cad{--cream:#FFF9F2;--pink:#F0408F;--yellow:#FFC953;--ink:#2A2330;--muted:#7A7280;
  background:var(--cream);color:var(--ink);font-family:var(--font-dm),system-ui,sans-serif;min-height:100vh}
.cad *{box-sizing:border-box}
.cad h1,.cad .logo,.cad .selo{font-family:var(--font-outfit),system-ui,sans-serif;letter-spacing:-.03em;margin:0}
.cad a{color:inherit}
.cad a:focus-visible,.cad button:focus-visible{outline:3px solid var(--ink);outline-offset:3px}
.cad .wrap{max-width:1120px;margin:0 auto;padding:0 24px}

.cad nav{padding:20px 0}
.cad .logo{font-size:28px;font-weight:800;text-decoration:none}
.cad .logo b{color:var(--pink);font-weight:800}
.cad .logo i{color:var(--yellow);font-style:normal;font-size:20px;margin-left:4px}

.cad .grade{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center;padding:40px 0 96px}

.cad .arte{position:relative;aspect-ratio:1;max-width:460px;width:100%;margin:0 auto}
.cad .sol{position:absolute;right:0;top:6%;width:78%;aspect-ratio:1;border-radius:50%;background:var(--yellow)}
.cad .selo{position:absolute;left:4%;top:28%;width:60%;aspect-ratio:1;border-radius:50%;background:var(--pink);
  border:6px solid #fff;box-shadow:14px 14px 0 #E8A9C4;color:#fff;display:flex;flex-direction:column;
  align-items:center;justify-content:center;transform:rotate(-8deg);text-align:center}
.cad .selo small{font-size:15px;font-weight:700;letter-spacing:.3em}
.cad .selo strong{font-size:clamp(30px,4.4vw,46px);font-weight:800;line-height:1}
.cad .selo span{font-size:26px;margin-top:8px}

.cad .eyebrow{color:var(--pink);font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
.cad h1{font-size:clamp(40px,5.5vw,64px);font-weight:800;line-height:1;margin:14px 0 14px}
.cad h1 span{color:var(--pink)}
.cad .sub{color:var(--muted);line-height:1.7;margin:0 0 32px;max-width:420px}

.cad form{display:grid;gap:20px;max-width:420px}
.cad label{display:block;font-size:14px;font-weight:700;margin-bottom:8px}
.cad .campo{position:relative}
.cad input{width:100%;font:inherit;font-size:16px;color:var(--ink);background:#fff;border:2px solid var(--ink);
  border-radius:16px;padding:15px 18px}
.cad input::placeholder{color:#B5AEBB}
.cad input:focus{outline:none;border-color:var(--pink);box-shadow:0 0 0 4px #FFDDEA}
.cad .senha input{padding-right:84px}
.cad .ver{position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:0;
  font:inherit;font-size:13px;font-weight:700;color:var(--pink);cursor:pointer;padding:8px 10px;border-radius:999px}
.cad .dica{font-size:13px;color:var(--muted);margin:8px 0 0}

.cad .btn{width:100%;background:var(--pink);color:#fff;border:0;border-radius:999px;font:inherit;
  font-size:16px;font-weight:700;padding:16px 26px;cursor:pointer;transition:transform .15s}
.cad .btn:hover:not(:disabled){transform:translateY(-2px)}
.cad .btn:disabled{opacity:.6;cursor:not-allowed}

.cad .erro{background:#FFE5D6;border:2px solid var(--ink);border-radius:16px;padding:12px 16px;font-size:14px;font-weight:500;margin:0}
.cad .ok{background:#EDE3FF;border-radius:24px;padding:28px;max-width:420px}
.cad .ok h2{font-family:var(--font-outfit),sans-serif;font-size:28px;font-weight:800;margin:0 0 10px;letter-spacing:-.03em}
.cad .ok p{margin:0 0 20px;line-height:1.6}
.cad .rodape{margin-top:24px;font-size:15px;color:var(--muted)}
.cad .rodape a{color:var(--ink);font-weight:700}

@media (max-width:860px){
  .cad .grade{grid-template-columns:1fr;gap:40px;padding-bottom:64px}
  .cad .arte{display:none}
}
`

export default function Cadastro() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mostrar, setMostrar] = useState(false)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')
  const [enviado, setEnviado] = useState(false)

  async function cadastrar(e: FormEvent) {
    e.preventDefault()
    setErro('')

    if (senha.length < 6) {
      setErro('A senha precisa ter pelo menos 6 caracteres.')
      return
    }

    setCarregando(true)
    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: { emailRedirectTo: `${window.location.origin}/` },
    })
    setCarregando(false)

    if (error) {
      setErro(traduzErro(error.message))
      return
    }
    setEnviado(true)
  }

  return (
    <div className={`cad ${outfit.variable} ${dmSans.variable}`}>
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
            <span className="eyebrow">✳ Crie sua conta</span>
            <h1>
              Entre na <span>pista.</span>
            </h1>

            {enviado ? (
              <div className="ok" role="status">
                <h2>Quase lá!</h2>
                <p>
                  Enviamos um link de confirmação para <strong>{email}</strong>. Abra o e-mail e clique no link para
                  ativar sua conta.
                </p>
                <Link href="/" className="btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                  Voltar ao início
                </Link>
              </div>
            ) : (
              <>
                <p className="sub">Use seu e-mail e escolha uma senha para começar a dançar com a gente.</p>

                <form onSubmit={cadastrar} noValidate>
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
                        autoComplete="new-password"
                        placeholder="Mínimo de 6 caracteres"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        minLength={6}
                        required
                      />
                      <button
                        type="button"
                        className="ver"
                        onClick={() => setMostrar((v) => !v)}
                        aria-pressed={mostrar}
                      >
                        {mostrar ? 'Ocultar' : 'Mostrar'}
                      </button>
                    </div>
                    <p className="dica">Use pelo menos 6 caracteres.</p>
                  </div>

                  {erro && (
                    <p className="erro" role="alert">
                      {erro}
                    </p>
                  )}

                  <button type="submit" className="btn" disabled={carregando || !email || !senha}>
                    {carregando ? 'Criando conta...' : 'Criar conta ↗'}
                  </button>
                </form>

                <p className="rodape">
                  Já tem conta? <Link href="/login">Entrar</Link>
                </p>
              </>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}