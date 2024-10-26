const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');
const prisma = new PrismaClient();

const env = process.env.NODE_ENV;
dotenv.config({ path: `apps/deepthoughts/.env.${env}` });

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'user@mail.com',
      name: 'User',
      password: 'password',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@mail.com',
      name: 'User2',
      password: 'password2',
    },
  });

  await prisma.token.create({
    data: {
      refreshToken: 'refresh-token',
      userId: user.id,
    },
  });

  await prisma.token.create({
    data: {
      refreshToken: 'refresh-token-2',
      userId: user2.id,
    },
  });

  await prisma.message.create({
    data: {
      text: 'Ha-ha-ha',
      senderId: user.id,
      receiverId: user2.id,
    },
  });

  await prisma.message.create({
    data: {
      text: 'Ooo-ooo-ooo',
      senderId: user2.id,
      receiverId: user.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
