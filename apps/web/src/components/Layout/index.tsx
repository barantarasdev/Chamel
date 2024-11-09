'use client';

import {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  useRef,
  useState,
} from 'react';
import { CardI, MessageI, UserI } from '../../types';

interface ContextType {
  user: UserI | null;
  currentCard: CardI | null;
  cards: CardI[];
  messages: MessageI[];
  messageInputRef: MutableRefObject<HTMLTextAreaElement | null> | null;
  handleAddNewCards: (items: CardI[]) => void;
  handleAddNewCurrentCard: (items: CardI | null) => void;
  handleAddNewMessages: (items: MessageI[]) => void;
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
});

export default function Layout({ children }: PropsWithChildren) {
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);
  const [cards, setCards] = useState<CardI[]>([]);
  const [currentCard, setCurrentCard] = useState<CardI | null>(null);
  const [messages, setMessages] = useState<MessageI[]>([]);
  //mocked
  const [user] = useState<UserI | null>({ id: 'user1' });

  const handleAddNewCards = (items: CardI[]) => {
    setCards(items);
  };

  const handleAddNewMessages = (items: MessageI[]) => {
    setMessages(items);
  };

  const handleAddNewCurrentCard = (item: CardI | null) => {
    setCurrentCard(item);
  };

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
  );
}
