import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Globe, ShieldCheck, TrendingUp } from 'lucide-react'
import Link from 'next/link'

// Definisci un tipo per le props di FeatureCard
interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[rgb(9,9,11)] text-[#fff]">
      <main>
        <section className="container mx-auto h-screen py-40 text-center">
          <h1 className="text-5xl font-bold mb-6 text-[#fff]">
            Soluzioni AI per l'Esportazione delle PMI
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-[#fff]/80">
            SAGIM utilizza l'intelligenza artificiale all'avanguardia per
            aiutare le piccole e medie imprese a espandersi a livello globale,
            semplificare le esportazioni e garantire i loro contratti
            internazionali.
          </p>
          <Link href="/questionario">
            <Button
              size="lg"
              className="bg-[#fff] text-[#000] hover:bg-gray-200"
            >
              Inizia
            </Button>
          </Link>
        </section>

        <section id="features" className="bg-[rgb(39,39,42)] py-20">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center text-[#fff]">
              Le Nostre Caratteristiche
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Globe className="w-12 h-12 mb-4 text-[#fff]" />}
                title="Analisi del Mercato Globale"
                description="Approfondimenti basati sull'IA per identificare i migliori mercati per i tuoi prodotti."
              />
              <FeatureCard
                icon={<TrendingUp className="w-12 h-12 mb-4 text-[#fff]" />}
                title="Automazione del Processo di Esportazione"
                description="Semplifica la documentazione e la conformità con il nostro sistema intelligente."
              />
              <FeatureCard
                icon={<ShieldCheck className="w-12 h-12 mb-4 text-[#fff]" />}
                title="Assicurazione dei Contratti"
                description="Proteggi la tua azienda con opzioni di assicurazione dei contratti valutate dall'IA."
              />
            </div>
          </div>
        </section>

        <section id="about" className="container mx-auto py-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6 text-[#fff]">
                Chi è SAGIM
              </h2>
              <p className="mb-4 text-[#fff]/80">
                SAGIM è all'avanguardia nell'utilizzo dell'intelligenza
                artificiale per rivoluzionare il modo in cui le piccole e medie
                imprese affrontano il commercio internazionale.
              </p>
              <p className="text-[#fff]/80">
                La nostra missione è livellare il campo di gioco, permettendo
                alle PMI di competere a livello globale con gli stessi vantaggi
                delle grandi aziende.
              </p>
            </div>
            <div className="flex-1">
              <div className="aspect-video bg-[rgb(39,39,42)] rounded-lg"></div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[rgb(39,39,42)] py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-[#fff]">
              Pronto a Espanderti Globalmente?
            </h2>
            <p className="mb-8 max-w-2xl mx-auto text-[#fff]/80">
              Unisciti alla piattaforma SAGIM e inizia a espandere la tua
              azienda a livello internazionale oggi stesso. La nostra IA è
              pronta a guidarti in ogni fase del percorso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Inserisci la tua email"
                className="bg-[rgb(39,39,42)] text-[#fff]"
                style={{ borderWidth: '1px', borderColor: 'white' }}
              />
              <Button className="bg-[#fff] text-[#000] hover:bg-gray-200">
                Inizia
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[rgb(9,9,11)] text-[#fff]/70 py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 SAGIM</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-[rgb(39,39,42)] p-8 text-center">
      <div className="mx-auto">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-[#fff]">{title}</h3>
      <p className="text-[#fff]/80">{description}</p>
    </div>
  )
}
