'use client'

import { useChat } from '@ai-sdk/react'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const MAX_MESSAGES = 20

export function Chat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messageCount, setMessageCount] = useState(0)
  const [chatAvailable, setChatAvailable] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, error } = useChat({
    onError: (err) => {
      if (err.message?.includes('API key') || err.message?.includes('401') || err.message?.includes('not configured')) {
        setChatAvailable(false)
      }
    },
  })

  const isLoading = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (messageCount >= MAX_MESSAGES || !inputValue.trim() || isLoading) return
    setMessageCount((c) => c + 1)
    const text = inputValue
    setInputValue('')
    await sendMessage({ text })
  }

  const limitReached = messageCount >= MAX_MESSAGES

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-50 w-[360px] max-w-[calc(100vw-2rem)]"
          >
            <Card className="bg-surface border-border-subtle flex flex-col h-[480px] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent-green" />
                  <span className="text-sm font-medium">Sprinter Studio AI</span>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {!chatAvailable ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-sm text-text-muted text-center">Chat coming soon. Check back later!</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-sm text-text-muted text-center">
                      Ask about our ventures, methodology, or the AI venture studio model.
                    </p>
                  </div>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
                          m.role === 'user'
                            ? 'bg-accent-green text-background'
                            : 'bg-surface-raised text-foreground'
                        }`}
                      >
                        {m.parts
                          ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
                          .map((p) => p.text)
                          .join('') || ''}
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-surface-raised rounded-lg px-3 py-2">
                      <Loader2 className="w-4 h-4 animate-spin text-text-muted" />
                    </div>
                  </div>
                )}
                {error && chatAvailable && (
                  <p className="text-xs text-destructive text-center">Something went wrong. Try again.</p>
                )}
                <div ref={messagesEndRef} />
              </div>

              {chatAvailable && (
                <form onSubmit={onSubmit} className="p-3 border-t border-border-subtle">
                  {limitReached ? (
                    <p className="text-xs text-text-muted text-center py-2">
                      Message limit reached for this session. Refresh to start over.
                    </p>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask about Sprinter Studio..."
                        className="flex-1 bg-surface-raised border border-border-subtle rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-accent-green placeholder:text-text-muted"
                        disabled={isLoading}
                      />
                      <Button
                        type="submit"
                        size="icon"
                        className="bg-accent-green text-background hover:bg-accent-green/90 shrink-0"
                        disabled={isLoading || !inputValue.trim()}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </form>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed bottom-4 right-4 z-50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className="h-12 w-12 rounded-full bg-accent-green text-background hover:bg-accent-green/90 shadow-lg"
        >
          {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        </Button>
      </motion.div>
    </>
  )
}
