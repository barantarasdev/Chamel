const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config({ path: `apps/deepthoughts/.env.test` });
const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@mail.com',
      name: 'User1',
      password: 'password1',
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
      refreshToken: 'refresh-token1',
      userId: user1.id,
    },
  });

  await prisma.token.create({
    data: {
      refreshToken: 'refresh-token2',
      userId: user2.id,
    },
  });

  await prisma.message.create({
    data: {
      text: 'Hello1',
      senderId: user1.id,
      receiverId: user2.id,
    },
  });

  await prisma.message.create({
    data: {
      text: 'Hello2',
      senderId: user2.id,
      receiverId: user2.id,
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
