import React from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[560px] w-full overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/IKzHtP5ThSO83edK/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/90" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950" />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-extrabold leading-tight sm:text-5xl"
          >
            CREDIONE — Бързи и умни кредити за вашите планове
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="mt-4 max-w-xl text-slate-200"
          >
            Модерна платформа за бързо финансиране: потребителски, до заплата, за пенсионери и ипотечен кредит — всичко на едно място.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#calculator" className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold shadow-lg shadow-orange-500/30 transition hover:bg-orange-600">
              Изчисли месечната вноска
            </a>
            <a href="#features" className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:border-white/40">
              Научи повече
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
