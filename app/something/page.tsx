'use client'

import React, { useState, useEffect, useRef } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { IconArrowElbow, IconPlus } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

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
    setCurrentAnswer('')
    setCurrentQuestionIndex(prev => prev + 1)
    setIsTypingComplete(false)
  }

  const handleTypingComplete = () => {
    setIsTypingComplete(true)
  }

  return (
    <div
      style={{ backgroundColor: 'rgba(39, 39, 42, 0.5)', height: '100vh' }}
      className="flex justify-center content-center"
    >
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
          <h1 className="text-2xl font-bold mb-6 text-white">
            AI Questionnaire
          </h1>
          <div
            ref={scrollAreaRef}
            className="h-[60vh]  pr-4 overflow-hidden"
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
                        className="text-sm text-white"
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
                                onChange={e => setCurrentAnswer(e.target.value)}
                                placeholder="Type your answer here..."
                                className="pr-10"
                              />
                              <div className="absolute right-0 top-[13px] sm:right-4">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button type="submit" size="icon">
                                      <IconArrowElbow />
                                      <span className="sr-only">
                                        Send message
                                      </span>
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Send message</TooltipContent>
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
                    <h2 className="text-xl font-bold mb-2 text-white">
                      Questionnaire Completed!
                    </h2>
                    <p className="text-sm text-gray-300">
                      Thank you for answering all the questions.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
