import React from 'react'
import { motion } from 'framer-motion'

const stats = [
  { label: 'Средно одобрение', value: '22 сек' },
  { label: 'Доволни клиенти', value: '98%' },
  { label: 'Изплатени кредити', value: '120К+' },
  { label: 'Градове в България', value: '80+' },
]

export default function Infographics() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-20 text-white">
      <div className="absolute inset-0 opacity-30" style={{
        background: 'radial-gradient(1200px 400px at 10% 10%, rgba(59,130,246,0.25), transparent), radial-gradient(1000px 400px at 90% 90%, rgba(249,115,22,0.25), transparent)'
      }} />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Данни, които вдъхват доверие</h2>
          <p className="mt-3 text-slate-300">Резултати от реални клиенти и операции.</p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl bg-white/5 p-6 text-center ring-1 ring-white/10 backdrop-blur"
            >
              <div className="text-3xl font-extrabold">{s.value}</div>
              <div className="mt-2 text-sm text-slate-300">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
