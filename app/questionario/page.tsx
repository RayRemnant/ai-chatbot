'use client'

import React, { useState, useEffect, useRef } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import { IconArrowElbow, IconPlus } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import Link from 'next/link'

import { analyzeWithLLM } from '@/lib/regolo'

const questions = [
  'Come si chiama la tua azienda?',
  'Quale é la tua Ragione Sociale (P.IVA)?',
  'In che settore operi?',
  'Da quanti anni è aperta e attiva la azienda?',
  'Su quali piattaforme social media è attualmente presente la vostra azienda?',
  'Avete già condotto campagne di marketing sui social media per mercati internazionali? Se sì, quali?',
  "Quali sono le vostre maggiori preoccupazioni riguardo l'esportazione in nuovi mercati?",
  'Quale prodotto e/o prodotti vorresti esportare?',
  "Vuoi spostare la produzione all'estero? Perché?",
  'Vuoi trovare nuovi fornitori per il tuo mercato? Perché?'
]

export default function Component() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [currentAnswer, setCurrentAnswer] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [currentQuestionIndex, isTypingComplete])

  useEffect(() => {
    if (isTypingComplete && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isTypingComplete])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentAnswer.trim() === '') return
    setAnswers(prev => [...prev, currentAnswer])
    const question = questions[currentQuestionIndex]
    analyzeWithLLM(question, currentAnswer)
    setCurrentAnswer('')
    setCurrentQuestionIndex(prev => prev + 1)
    setIsTypingComplete(false)
  }

  const handleTypingComplete = () => {
    setIsTypingComplete(true)
  }

  return (
    <div
      style={{ backgroundColor: 'rgba(39, 39, 42, 0.5)' }}
      className="relative flex h-[calc(100vh_-_theme(spacing.16))] overflow-hidden"
    >
      <div className="pb-[200px] pt-4 md:pt-10 w-full">
        <div className="mx-auto max-w-2xl px-4 z-10 relative">
          <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
            <h1 className="text-2xl font-bold mb-6">Questionario</h1>
            <div
              ref={scrollAreaRef}
              className="h-[60vh] overflow-hidden"
              style={{ scrollBehavior: 'smooth' }}
            >
              <div className="space-y-12">
                {questions
                  .slice(0, currentQuestionIndex + 1)
                  .map((question, index) => (
                    <div
                      key={index}
                      className={`transition-all duration-500 ${
                        index === currentQuestionIndex
                          ? 'opacity-100'
                          : 'opacity-50'
                      }`}
                    >
                      <div className="space-y-2">
                        <TypeAnimation
                          sequence={[question, () => handleTypingComplete()]}
                          wrapper="p"
                          cursor={false}
                          repeat={0}
                          speed={50}
                          className="text-sm"
                        />
                        {index === currentQuestionIndex && (
                          <div
                            className={`mt-2 transition-opacity duration-500 ease-in-out ${
                              isTypingComplete ? 'opacity-100' : 'opacity-0'
                            }`}
                          >
                            <form onSubmit={handleSubmit}>
                              <div className="relative">
                                <Input
                                  ref={inputRef}
                                  type="text"
                                  value={currentAnswer}
                                  onChange={e =>
                                    setCurrentAnswer(e.target.value)
                                  }
                                  placeholder="Scrivi la tua risposta qui..."
                                  className="pr-10 resize-none bg-transparent ring-0 focus-visible:ring-0 focus:ring-0 placeholder-blue-200"
                                />
                                <div className="absolute right-0 top-[6px] sm:right-4">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        type="submit"
                                        className="size-6 px-0"
                                      >
                                        <IconArrowElbow />
                                        <span className="sr-only">
                                          Send message
                                        </span>
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      Send message
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              </div>
                            </form>
                          </div>
                        )}
                      </div>
                      {index < currentQuestionIndex && (
                        <div className="mt-2">
                          <Input
                            type="text"
                            value={answers[index]}
                            disabled
                            className="bg-gray-800 text-gray-300"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                {currentQuestionIndex >= questions.length && (
                  <div className="mx-auto max-w-2xl px-4">
                    <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
                      <h2 className="text-xl font-bold mb-2 text-center">
                        Questionario completato!
                      </h2>
                      <Link href="/ai" className={cn(buttonVariants())}>
                        <span className="hidden sm:block">
                          Chatta col tuo AI personalizzato
                        </span>
                        <span className="sm:hidden">Deploy</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-full z-0 fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]"></div>
    </div>
  )
}
