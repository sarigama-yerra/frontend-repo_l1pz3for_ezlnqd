import React from 'react'
import Hero from './components/Hero'
import Features from './components/Features'
import Calculator from './components/Calculator'
import Infographics from './components/Infographics'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Features />
      <Calculator />
      <Infographics />
      <footer className="bg-slate-950 py-10 text-center text-slate-300">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm">© {new Date().getFullYear()} CREDIONE — Бързи кредити. Всички права запазени.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
