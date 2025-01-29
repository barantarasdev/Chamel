'use client'

import {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react'
import { socket } from '../../api/socketClient'

interface ContextType {
  user: any | null
  currentCard: any | null
  cards: any[]
  messages: any[]
  messageInputRef: MutableRefObject<HTMLTextAreaElement | null> | null
  handleAddNewCards: (items: any[]) => void
  handleAddNewCurrentCard: (items: any | null) => void
  handleAddNewMessages: (items: any[]) => void
}

export const Context = createContext<ContextType>({
  user: null,
  currentCard: null,
  messageInputRef: null,
  cards: [],
  messages: [],
  handleAddNewCards: () => null,
  handleAddNewCurrentCard: () => null,
  handleAddNewMessages: () => null,
})

export default function Layout({ children }: PropsWithChildren) {
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null)
  const [cards, setCards] = useState<any[]>([])
  const [currentCard, setCurrentCard] = useState<any | null>(null)
  const [messages, setMessages] = useState<any[]>([])
  //mocked
  const [user] = useState<any | null>({ id: 'user1' })

  const handleAddNewCards = (items: any[]) => {
    setCards(items)
  }

  const handleAddNewMessages = (items: any[]) => {
    setMessages(items)
  }

  const handleAddNewCurrentCard = (item: any | null) => {
    setCurrentCard(item)
  }

  useEffect(() => {
    const handleMessage = (e: any) => {
      console.log(e)
      // setMessages((prev) => [...prev, { id: '23123123', text, senderId }])
    }

    socket.on('message', handleMessage)

    return () => {
      socket.off('message', handleMessage)
    }
  }, [])

  return (
    <Context.Provider
      value={{
        messageInputRef,
        cards,
        messages,
        user,
        currentCard,
        handleAddNewCards,
        handleAddNewCurrentCard,
        handleAddNewMessages,
      }}
    >
      <main>{children}</main>
    </Context.Provider>
  )
}
