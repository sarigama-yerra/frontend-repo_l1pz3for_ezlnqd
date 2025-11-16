import React from 'react'
import { Wallet, CreditCard, ShieldCheck, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Wallet,
    title: 'Мигновено одобрение',
    desc: 'Алгоритми за скоринг дават отговор за секунди с минимални документи.',
  },
  {
    icon: CreditCard,
    title: 'Гъвкави планове',
    desc: 'Срок и вноски според вашия доход. Прозрачни условия без скрити такси.',
  },
  {
    icon: ShieldCheck,
    title: 'Сигурност и защита',
    desc: 'Шифровани данни и двойна проверка на самоличността за спокойствие.',
  },
  {
    icon: Sparkles,
    title: 'Модерно изживяване',
    desc: 'Изчистен интерфейс, бърз процес и приятни анимации за леко усещане.',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Защо CREDIONE?</h2>
          <p className="mt-3 text-slate-600">Бърз, сигурен и прозрачен достъп до финансиране.</p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group rounded-2xl border border-slate-200 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-orange-500 to-blue-600 p-3 text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
