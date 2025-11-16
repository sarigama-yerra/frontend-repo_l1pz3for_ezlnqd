import React, { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const loanTypes = [
  { key: 'consumer', label: 'Потребителски' },
  { key: 'payday', label: 'До заплата' },
  { key: 'pension', label: 'За пенсионери' },
  { key: 'mortgage', label: 'Ипотечен' },
]

const ranges = {
  consumer: { min: 500, max: 30000, step: 100, periodMin: 6, periodMax: 84 },
  payday: { min: 100, max: 1500, step: 50, periodMin: 1, periodMax: 3 },
  pension: { min: 300, max: 10000, step: 50, periodMin: 3, periodMax: 60 },
  mortgage: { min: 20000, max: 500000, step: 1000, periodMin: 60, periodMax: 360 },
}

function formatCurrency(v) {
  return new Intl.NumberFormat('bg-BG', { style: 'currency', currency: 'BGN', maximumFractionDigits: 0 }).format(v)
}

export default function Calculator() {
  const [type, setType] = useState('consumer')
  const [amount, setAmount] = useState(ranges.consumer.min)
  const [months, setMonths] = useState(12)
  const [insurance, setInsurance] = useState(true)
  const [autopay, setAutopay] = useState(false)

  const settings = ranges[type]

  const rateBase = useMemo(() => {
    switch (type) {
      case 'payday':
        return 0.25 // 25% за краткосрочен заем
      case 'pension':
        return 0.12
      case 'mortgage':
        return 0.045
      default:
        return 0.15
    }
  }, [type])

  const rate = useMemo(() => {
    let r = rateBase
    if (insurance) r -= 0.01
    if (autopay) r -= 0.005
    return Math.max(r, 0.01)
  }, [rateBase, insurance, autopay])

  const monthly = useMemo(() => {
    const monthlyRate = rate / 12
    if (type === 'payday') {
      // проста лихва кратък срок
      const total = amount * (1 + monthlyRate * months)
      return total / months
    }
    // анюитетна формула
    const pow = Math.pow(1 + monthlyRate, months)
    const res = (amount * monthlyRate * pow) / (pow - 1)
    return isFinite(res) ? res : 0
  }, [amount, months, rate, type])

  return (
    <section id="calculator" className="relative bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Кредитен калкулатор</h2>
          <p className="mt-3 text-slate-600">Изберете вид кредит, сума и срок. Вижте вноската в реално време.</p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {/* Controls */}
          <motion.div layout className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5">
            <div className="flex flex-wrap gap-2">
              {loanTypes.map((t) => (
                <motion.button
                  key={t.key}
                  onClick={() => {
                    setType(t.key)
                    setAmount(ranges[t.key].min)
                    setMonths(Math.max(12, ranges[t.key].periodMin))
                  }}
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${
                    type === t.key ? 'bg-gradient-to-r from-orange-500 to-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.label}
                </motion.button>
              ))}
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium text-slate-700">Сума</label>
              <div className="mt-2 flex items-center gap-4">
                <input
                  type="range"
                  min={settings.min}
                  max={settings.max}
                  step={settings.step}
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                  className="w-full accent-orange-500"
                />
                <div className="w-40 rounded-lg border bg-white p-2 text-center font-semibold">{formatCurrency(amount)}</div>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium text-slate-700">Срок (месеци)</label>
              <div className="mt-2 flex items-center gap-4">
                <input
                  type="range"
                  min={settings.periodMin}
                  max={settings.periodMax}
                  step={1}
                  value={months}
                  onChange={(e) => setMonths(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
                <div className="w-40 rounded-lg border bg-white p-2 text-center font-semibold">{months} м.</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="flex items-center justify-between rounded-xl border p-3">
                <span className="text-sm font-medium">Застраховка плащания</span>
                <input type="checkbox" checked={insurance} onChange={(e) => setInsurance(e.target.checked)} />
              </label>
              <label className="flex items-center justify-between rounded-xl border p-3">
                <span className="text-sm font-medium">Автоматично плащане</span>
                <input type="checkbox" checked={autopay} onChange={(e) => setAutopay(e.target.checked)} />
              </label>
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div layout className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 via-blue-600 to-orange-500 p-6 text-white shadow-xl">
            <div className="relative z-10">
              <h3 className="text-xl font-semibold">Месечна вноска</h3>
              <div className="mt-2 text-5xl font-extrabold tracking-tight">{formatCurrency(monthly)}</div>
              <p className="mt-2 text-white/80">
                Годишна лихва ~ {(rate * 100).toFixed(1)}%. Обща сума за връщане: {formatCurrency(monthly * months)}.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-xl bg-white/10 p-3">
                  <div className="text-white/60">Вид кредит</div>
                  <div className="font-semibold">{loanTypes.find((l) => l.key === type)?.label}</div>
                </div>
                <div className="rounded-xl bg-white/10 p-3">
                  <div className="text-white/60">Сума</div>
                  <div className="font-semibold">{formatCurrency(amount)}</div>
                </div>
                <div className="rounded-xl bg-white/10 p-3">
                  <div className="text-white/60">Срок</div>
                  <div className="font-semibold">{months} месеца</div>
                </div>
                <div className="rounded-xl bg-white/10 p-3">
                  <div className="text-white/60">Опции</div>
                  <div className="font-semibold">{[insurance && 'Застраховка', autopay && 'Автоплащане'].filter(Boolean).join(', ') || 'Няма'}</div>
                </div>
              </div>

              <button className="mt-8 w-full rounded-xl bg-white/90 px-5 py-3 font-bold text-blue-700 transition hover:bg-white">
                Кандидатствай сега
              </button>
            </div>

            {/* Animated orbs */}
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 0.25, scale: 1 }}
                transition={{ duration: 1.2 }}
                className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="pointer-events-none absolute -bottom-10 -left-10 h-56 w-56 rounded-full bg-orange-200"
              />
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
