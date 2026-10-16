'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  CircleHelp,
  ClipboardCheck,
  ForkKnifeCrossed,
  Leaf,
  LockKeyhole,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

type Facility = { id: string; name: string; region: string; status: string; slots: number }

const facilities: Facility[] = [
  { id: 'estate', name: 'The Harvest Estate', region: 'Hudson Valley · NY', status: 'Prime availability', slots: 12 },
  { id: 'loft', name: 'Copper & Rye Loft', region: 'SoHo · NY', status: 'Limited windows', slots: 5 },
  { id: 'orchard', name: 'Orchard House', region: 'Berkshires · MA', status: 'Select dates', slots: 8 },
]

const seasonalData = [
  { month: 'SEP', value: 74, label: '74%' },
  { month: 'OCT', value: 92, label: '92%' },
  { month: 'NOV', value: 86, label: '86%' },
  { month: 'DEC', value: 61, label: '61%' },
]

export default function Page() {
  const [facility, setFacility] = useState(facilities[0].id)
  const [headcount, setHeadcount] = useState(86)
  const [consented, setConsented] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [showPolicy, setShowPolicy] = useState(false)
  const activeFacility = facilities.find((item) => item.id === facility) ?? facilities[0]
  const estimatedRange = useMemo(() => {
    const low = headcount * 145
    const high = headcount * 190
    return `$${low.toLocaleString()} – $${high.toLocaleString()}`
  }, [headcount])

  function handleAction() {
    if (!consented) {
      document.getElementById('consent')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-[#3D2314] text-[#F5E7C8]">
      <div className="mx-auto max-w-[1440px] px-5 py-5 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between border-b border-[#CC5500]/60 pb-5">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center border border-[#D99A28] bg-[#4B2A18] text-[#F0B84B]">
              <ForkKnifeCrossed aria-hidden="true" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E1A33A]">Sovereign Harvest</p>
              <p className="font-serif text-lg tracking-tight text-[#FFF2D1]">Catering Console</p>
            </div>
          </div>
          <div className="hidden items-center gap-3 text-right sm:flex">
            <div className="size-2 rounded-full bg-[#9DB55B] shadow-[0_0_10px_#9DB55B]" />
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#BFA17E]">Console status</p>
              <p className="text-xs font-medium text-[#EED7A6]">Local operations · ready</p>
            </div>
          </div>
        </header>

        <section className="grid gap-10 border-b border-[#CC5500]/60 py-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end lg:py-14">
          <div>
            <div className="mb-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#E1A33A]"><Leaf aria-hidden="true" /> Autumn 2026 intake</div>
            <h1 className="max-w-3xl font-serif text-5xl leading-[.96] tracking-[-0.04em] text-[#FFF4D7] sm:text-7xl">Gather well.<br /><span className="text-[#E3A63D]">Host memorably.</span></h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-[#D4B692] sm:text-base">A private planning desk for exceptional corporate hospitality, built around the season&apos;s most generous ingredients and the places that make them sing.</p>
          </div>
          <div className="border-l border-[#CC5500] pl-6 lg:mb-1">
            <p className="text-xs uppercase tracking-[0.2em] text-[#BFA17E]">Quote protocol / 01</p>
            <p className="mt-3 max-w-sm font-serif text-2xl leading-tight text-[#F9E8C0]">Shape your gathering. We&apos;ll compose the table.</p>
            <div className="mt-6 flex items-center gap-3 text-xs text-[#CDA77A]"><LockKeyhole aria-hidden="true" /> No account required · 4 minute intake</div>
          </div>
        </section>

        <section className="grid gap-6 py-8 lg:grid-cols-[1.6fr_.8fr] lg:py-10">
          <div className="border border-[#CC5500]/80 bg-[#472918]/70 p-5 sm:p-7">
            <div className="mb-7 flex items-start justify-between gap-4">
              <div><p className="eyebrow">01 / Operations matrix</p><h2 className="mt-2 font-serif text-3xl text-[#FFF0CF]">Select your setting</h2></div>
              <span className="hidden border border-[#8D6D43] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-[#D6B47B] sm:block">Multi-facility quote</span>
            </div>
            <div className="grid gap-3">
              {facilities.map((item) => (
                <button key={item.id} type="button" onClick={() => setFacility(item.id)} className={`group flex items-center justify-between border p-4 text-left transition ${facility === item.id ? 'border-[#D99A28] bg-[#5A321C]' : 'border-[#8A4A26] bg-[#402416] hover:border-[#D99A28]'}`} aria-pressed={facility === item.id}>
                  <span className="flex items-center gap-4"><span className={`grid size-9 place-items-center border ${facility === item.id ? 'border-[#D99A28] text-[#F0B84B]' : 'border-[#8D6D43] text-[#BFA17E]'}`}><MapPin aria-hidden="true" /></span><span><span className="block font-serif text-lg text-[#FFECC5]">{item.name}</span><span className="mt-1 block text-xs text-[#BD9A70]">{item.region}</span></span></span>
                  <span className="text-right"><span className={`block text-[10px] uppercase tracking-[0.15em] ${item.id === 'loft' ? 'text-[#E1A33A]' : 'text-[#9DB55B]'}`}>{item.status}</span><span className="mt-1 block text-xs text-[#BFA17E]">{item.slots} dates held</span></span>
                </button>
              ))}
            </div>
            <div className="mt-8 border-t border-[#8A4A26] pt-7">
              <div className="flex items-end justify-between"><div><p className="eyebrow">Headcount calculator</p><p className="mt-2 text-sm text-[#D4B692]">Expected guests</p></div><p className="font-serif text-4xl text-[#F0B84B]">{headcount}<span className="ml-2 text-sm text-[#BD9A70]">guests</span></p></div>
              <input aria-label="Expected guests" type="range" min="20" max="240" step="1" value={headcount} onChange={(event) => setHeadcount(Number(event.target.value))} className="mt-6 w-full accent-[#D99A28]" />
              <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.16em] text-[#A9825C]"><span>20 intimate</span><span>240 expansive</span></div>
            </div>
          </div>

          <aside className="border border-[#B48134] bg-[#3A2114] p-5 sm:p-7">
            <div className="flex items-center justify-between"><p className="eyebrow">Seasonal supply</p><Sparkles className="text-[#D99A28]" aria-hidden="true" /></div>
            <h2 className="mt-2 font-serif text-2xl text-[#FFF0CF]">Availability pulse</h2>
            <div className="mt-7 flex h-40 items-end gap-3 border-b border-[#8A4A26] pb-0">
              {seasonalData.map((item) => <div key={item.month} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><span className="text-[10px] text-[#E1A33A]">{item.label}</span><div className="w-full max-w-10 bg-[#A94C25]" style={{ height: `${item.value}%` }} /><span className="pb-2 text-[10px] tracking-[0.15em] text-[#BD9A70]">{item.month}</span></div>)}
            </div>
            <div className="mt-6 flex gap-3"><div className="mt-1 size-2 shrink-0 rounded-full bg-[#9DB55B]" /><p className="text-xs leading-5 text-[#CDA77A]">Peak harvest is holding strong for October. Hudson Valley farms are currently accepting new menus.</p></div>
            <div className="mt-6 border-t border-[#8A4A26] pt-5"><div className="flex justify-between text-xs text-[#BFA17E]"><span>Working estimate</span><span className="font-medium text-[#F0B84B]">{estimatedRange}</span></div><p className="mt-2 text-[10px] leading-4 text-[#997453]">Planning range reflects seasonal ingredients and service style. Final quote follows menu review.</p></div>
          </aside>
        </section>

        <section id="consent" className="border border-[#CC5500]/80 bg-[#4A2918] p-5 sm:p-7">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
            <div><div className="flex items-center gap-3"><div className="grid size-10 place-items-center border border-[#D99A28] text-[#F0B84B]"><ShieldCheck aria-hidden="true" /></div><div><p className="eyebrow">02 / Consent field</p><h2 className="mt-1 font-serif text-2xl text-[#FFF0CF]">Keep the conversation considered.</h2></div></div><p className="mt-4 max-w-xl text-xs leading-6 text-[#CDA77A]">Your details are used only to prepare this hospitality brief and coordinate a response from Sovereign Harvest. We do not sell, rent, or share planning information with third parties.</p></div>
            <div>
              <label className="flex cursor-pointer items-start gap-3 border border-[#9A6D3F] bg-[#3C2316] p-4"><input type="checkbox" checked={consented} onChange={(event) => setConsented(event.target.checked)} className="mt-0.5 size-4 accent-[#D99A28]" /><span className="text-xs leading-5 text-[#E7CAA0]">I agree to the <button type="button" className="underline decoration-[#D99A28] underline-offset-4" onClick={() => setShowPolicy(!showPolicy)}>privacy policy</button> and consent to a planning response.</span></label>
              {showPolicy && <p className="mt-3 border-l-2 border-[#D99A28] pl-3 text-[11px] leading-5 text-[#BFA17E]">We retain inquiry details for 90 days, use access-controlled systems, and honor deletion requests. This console makes no external network requests.</p>}
              <button type="button" onClick={handleAction} className="mt-3 flex w-full items-center justify-between bg-[#D99A28] px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[#3D2314] transition hover:bg-[#E7B84C]"><span>{submitted ? 'Brief queued locally' : 'Request a considered quote'}</span>{submitted ? <Check aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}</button>
              {!consented && <p className="mt-2 flex items-center gap-2 text-[10px] text-[#E1A33A]"><CircleHelp aria-hidden="true" /> Consent is required before any action.</p>}
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-4 py-8 text-[10px] uppercase tracking-[0.18em] text-[#8F6948] sm:flex-row sm:items-center sm:justify-between"><span>SHC / Operations desk / 2026</span><span className="flex items-center gap-2"><ClipboardCheck aria-hidden="true" /> All calculations run locally in your browser</span></footer>
      </div>
    </main>
  )
}

