'use client';

import { memo, useCallback, useContext, useEffect } from 'react';
import styles from './styles.module.scss';
import Aside from './components/Aside';
import Content from './components/Content';
import { Context } from '../Layout';

//Mock
const ITEMS = [
  {
    id: '1',
    title:
      'Tarasff sfijs ofs fsdfsd fds kjnsd fsd sf sd fsd fsdh fhsd isfjnsf sdf sd fsdf sd sfduhf sdf hsdh fsdufh sdfh sudfh shdf shf hsdfsdisd fsd sdiofsdffdsi fdsi fdsijdsf dfs sd f dfposk dpsj fdsi jfjsdl fsdlk lsdf nsldnfllsndf',
    messages: [
      {
        id: '1-1',
        text: 'hellofjdsbf fjkdhf dsh fusdhf disfdshuifhds fdsuifh sdiuhf sdhfsdfsdfojisd fjosdjf sdoifj sdjfsdiof sdjo ',
        senderId: 'user1',
      },
      {
        id: '1-2',
        text: 'gfdgdfiojgdf gjdfjgdfjgdfjgdfoigjdiofjgdfigjdfijgdfoigjdfjgojdfojgdfgdfgodjfgdof',
        senderId: 'user2',
      },
      {
        id: '1432',
        text: 'hellofjdsbf fjkdhf dsh fusdhf disfdshuifhds fdsuifh sdiuhf sdh',
        senderId: 'user1',
      },
      {
        id: '1-12312312313123142fs31',
        text: 'hellofjdsbf fjkdhf dsh fusdhf disfdshuifhds fdsuifh sdiuhf sdh',
        senderId: 'user2',
      },
      {
        id: '1-41211111111fds231',
        text: 'hellofjdsbf fjkdhf dsh fusdhf disfdshuifhds fdsuifh sdiuhf sdh',
        senderId: 'user1',
      },
      {
        id: '1-421',
        text: 'hellofjdsbf fjkdhf dsh fusdhf disfdshuifhds fdsuifh sdiuhf sdh',
        senderId: 'user1',
      },
      {
        id: '1423-1fsdfsdf',
        text: 'hellofjdsbf fjkdhf dsh fusdhf disfdshuifhds fdsuifh sdiuhf sdh',
        senderId: 'user1',
      },
      {
        id: 'dfdsfsd',
        text: 'hellofjdsbf fjkdhf dsh fusdhf disfdshuifhds fdsuifh sdiuhf sdh',
        senderId: 'user1',
      },
      {
        id: '1-42fs31',
        text: 'hellofjdsbf fjkdhf dsh fusdhf disfdshuifhds fdsuifh sdiuhf sdh',
        senderId: 'user2',
      },
      {
        id: '1111111-4fds231',
        text: 'hellofjdsbf fjkdhf dsh fusdhf disfdshuifhds fdsuifh sdiuhf sdh',
        senderId: 'user1',
      },
      {
        id: '1-42fsdfsdfds1',
        text: 'hellofjdsbf fjkdhf dsh fusdhf disfdshuifhds fdsuifh sdiuhf sdh',
        senderId: 'user1',
      },
      {
        id: '1423-1',
        text: 'hellofjdsbf fjkdhf dsh fusdhf disfdshuifhds fdsuifh sdiuhf sdh',
        senderId: 'user1',
      },
      {
        id: 'fsfsd',
        text: 'hellofjdsbf fjkdhf dsh fusdhf disfdshuifhds fdsuifh sdiuhf sdh',
        senderId: 'user1',
      },
      {
        id: '1-42fs1231232131fs31',
        text: 'hellofjdsbf fjkdhf dsh fusdhf disfdshuifhds fdsuifh sdiuhf sdh',
        senderId: 'user2',
      },
      {
        id: '1-4fds231',
        text: 'hellofjdsbf fjkdhf dsh fusdhf disfdshuifhds fdsuifh sdiuhf sdh',
        senderId: 'user1',
      },
      {
        id: '1-4fsdfsdsdfdsfsd21',
        text: 'hellofjdsbf fjkdhf dsh fusdhf disfdshuifhds fdsuifh sdiuhf sdh',
        senderId: 'user1',
      },
      {
        id: '142fdfsdfdsf3-1',
        text: 'hellofjdsbf fjkdhf dsh fusdhf disfdshuifhds fdsuifh sdiuhf sdh',
        senderId: 'user1',
      },
      {
        id: '142-1',
        text: 'hellofjdsbf fjkdhf dsh fusdhf disfdshuifhds fdsuifh sdiuhf sdh',
        senderId: 'user1',
      },
      {
        id: '1dasdasda423-1',
        text: 'hellofjdsbf fjkdhf dsh fusdhf disfdshuifhds fdsuifh sdiuhf sdh',
        senderId: 'user1',
      },
      {
        id: '14dadasdas2-1',
        text: 'hellofjdsbf fjkdhf dsh fusdhf disfdshuifhds fdsuifh sdiuhf sdh',
        senderId: 'user1',
      },
      {
        id: '14fdsfsdfsdfsdfsd2-1',
        text: 'hellofjdsbf fjkdhf dsh fusdhf disfdshuifhds fdsuifh sdiuhf sdh',
        senderId: 'user1',
      },
      {
        id: '1dasfdsfsdfdsdasda423-1',
        text: 'hellofjdsbf fjkdhf dsh fusdhf disfdshuifhds fdsuifh sdiuhf sdh',
        senderId: 'user1',
      },
      {
        id: '14dafsdfsdfsdfsdfdsdasdas2-1',
        text: 'hellofjdsbf fjkdhf dsh fusdhf disfdshuifhds fdsuifh sdiuhf sdh',
        senderId: 'user1',
      },
    ],
    isActive: false,
  },
  {
    id: '2',
    title: 'Taras2',
    messages: [
      {
        id: '2-1',
        text: 'hello2',
        senderId: 'user2',
      },
    ],
    isActive: false,
  },
  {
    id: '3',
    title: 'Taras3',
    messages: [
      {
        id: '3-1',
        text: 'hello3',
        senderId: 'user1',
      },
    ],
    isActive: false,
  },
  {
    id: '4',
    title: 'Taras4',
    messages: [
      {
        id: '4-1',
        text: 'hello4',
        senderId: 'user3',
      },
    ],
    isActive: false,
  },
  {
    id: '5',
    title: 'Taras5',
    messages: [
      {
        id: '5-1',
        text: 'hello5',
        senderId: 'user1',
      },
    ],
    isActive: false,
  },
  {
    id: '6',
    title: 'Taras6',
    messages: [
      {
        id: '6-1',
        text: 'hello6',
        senderId: 'user2',
      },
    ],
    isActive: false,
  },
  {
    id: '7',
    title: 'Taras7',
    messages: [
      {
        id: '7-1',
        text: 'hello7',
        senderId: 'user3',
      },
    ],
    isActive: false,
  },
  {
    id: '8',
    title: 'Taras8',
    messages: [
      {
        id: '8-1',
        text: 'hello8',
        senderId: 'user1',
      },
    ],
    isActive: false,
  },
  {
    id: '9',
    title: 'Taras9',
    messages: [
      {
        id: '9-1',
        text: 'hello9',
        senderId: 'user2',
      },
    ],
    isActive: false,
  },
  {
    id: '10',
    title: 'Taras10',
    messages: [
      {
        id: '10-1',
        text: 'hello10',
        senderId: 'user1',
      },
    ],
    isActive: false,
  },
  {
    id: '11',
    title: 'Taras11',
    messages: [
      {
        id: '11-1',
        text: 'hello11',
        senderId: 'user2',
      },
    ],
    isActive: false,
  },
  {
    id: '12',
    title: 'Taras12',
    messages: [
      {
        id: '12-1',
        text: 'hello12',
        senderId: 'user1',
      },
    ],
    isActive: false,
  },
  {
    id: '13',
    title: 'Taras13',
    messages: [
      {
        id: '13-1',
        text: 'hello13',
        senderId: 'user3',
      },
    ],
    isActive: false,
  },
  {
    id: '14',
    title: 'Taras14',
    messages: [
      {
        id: '14-1',
        text: 'hello14',
        senderId: 'user1',
      },
    ],
    isActive: false,
  },
  {
    id: '15',
    title: 'Taras15',
    messages: [
      {
        id: '15-1',
        text: 'hello15',
        senderId: 'user2',
      },
    ],
    isActive: false,
  },
  {
    id: '16',
    title: 'Taras16',
    messages: [
      {
        id: '16-1',
        text: 'hello16',
        senderId: 'user1',
      },
    ],
    isActive: false,
  },
  {
    id: '17',
    title: 'Taras17',
    messages: [
      {
        id: '17-1',
        text: 'hello17',
        senderId: 'user2',
      },
    ],
    isActive: false,
  },
  {
    id: '18',
    title: 'Taras18',
    messages: [
      {
        id: '18-1',
        text: 'hello18',
        senderId: 'user1',
      },
    ],
    isActive: false,
  },
  {
    id: '19',
    title: 'Taras19',
    messages: [
      {
        id: '19-1',
        text: 'hello19',
        senderId: 'user3',
      },
    ],
    isActive: false,
  },
  {
    id: '20',
    title: 'Taras20',
    messages: [
      {
        id: '20-1',
        text: 'hello20',
        senderId: 'user1',
      },
    ],
    isActive: false,
  },
  {
    id: '21',
    title: 'Taras21',
    messages: [
      {
        id: '21-1',
        text: 'hello21',
        senderId: 'user2',
      },
    ],
    isActive: false,
  },
  {
    id: '22',
    title: 'Taras22',
    messages: [
      {
        id: '22-1',
        text: 'hello22',
        senderId: 'user3',
      },
    ],
    isActive: false,
  },
  {
    id: '23',
    title: 'Taras23',
    messages: [
      {
        id: '23-1',
        text: 'hello23',
        senderId: 'user1',
      },
    ],
    isActive: false,
  },
  {
    id: '24',
    title: 'Taras24',
    messages: [
      {
        id: '24-1',
        text: 'hello24',
        senderId: 'user2',
      },
    ],
    isActive: false,
  },
  {
    id: '25',
    title: 'Taras25',
    messages: [
      {
        id: '25-1',
        text: 'hello25',
        senderId: 'user1',
      },
    ],
    isActive: false,
  },
];

function Home() {
  const {
    cards,
    handleAddNewCards,
    handleAddNewMessages,
    handleAddNewCurrentCard,
    messageInputRef,
  } = useContext(Context);

  const handleHashChange = useCallback(() => {
    const hash = window.location.hash;

    if (!hash) {
      handleAddNewMessages([]);
      handleAddNewCurrentCard(null);
    } else {
      const formattedHash = hash.slice(1);
      const foundCard = cards?.find((card) => card.id === formattedHash);

      if (foundCard) {
        handleAddNewCurrentCard(foundCard);
        handleAddNewMessages(foundCard.messages);
      }

      if (messageInputRef?.current) {
        messageInputRef.current.style.height = 'auto';
        messageInputRef.current.value = '';
        messageInputRef.current.focus();
      }
    }
  }, [cards, handleAddNewCurrentCard, handleAddNewMessages, messageInputRef]);

  useEffect(() => {
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [cards, handleHashChange]);

  useEffect(() => {
    if (handleAddNewCards) {
      handleAddNewCards(ITEMS);
    }
  }, [handleAddNewCards]);

  return (
    <section className={styles.home}>
      <Aside />
      <Content />
    </section>
  );
}

export default memo(Home);
