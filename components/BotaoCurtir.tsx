'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function BotaoCurtir() {
  const [total, setTotal] = useState<number | null>(null)
  const [carregando, setCarregando] = useState(false)

  // Busca o valor inicial
  useEffect(() => {
    async function carregar() {
      const { data, error } = await supabase
        .from('curtidas')
        .select('total')
        .eq('id', 1)
        .single()

      if (!error && data) setTotal(data.total)
    }
    carregar()
  }, [])

  async function curtir() {
    setCarregando(true)
    const { data, error } = await supabase.rpc('incrementar_curtidas')

    if (error) {
      console.error(error)
    } else {
      setTotal(data)
    }
    setCarregando(false)
  }

  return (
    <button
      onClick={curtir}
      disabled={carregando || total === null}
      className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
    >
      👍 {total ?? '...'} curtidas
    </button>
  )
}