import { PrismaClient } from '@prisma/client';
import { DatabaseService } from './database.service';
import { CreateUserDTO } from '../controllers/user/dto/user-create.dto';
import Chance from 'chance';
import { UpdateUserDTO } from '../controllers/user/dto/user-update.dto';

const chance = new Chance();
const prisma = new PrismaClient();

describe('Database', () => {
  let database: DatabaseService;

  beforeAll(async () => {
    await prisma.$connect();
    database = new DatabaseService();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('User', () => {
    it('should create a user', async () => {
      const { mockCreateUserDto } = getMockData();
      const { email, name } = mockCreateUserDto;

      const user = await database.createUser(mockCreateUserDto);

      expect(user).toEqual({
        id: user.id,
        email,
        name,
      });
    });

    it('should get a user by id', async () => {
      const { mockCreateUserDto } = getMockData();
      const { email, name } = mockCreateUserDto;

      const createdUser = await database.createUser(mockCreateUserDto);
      const user = await database.getUser(createdUser.id);

      expect(user).toEqual({
        id: createdUser.id,
        email,
        name,
      });
    });

    it('should update a user', async () => {
      const { mockUpdateUserDto, mockCreateUserDto } = getMockData();
      const { email, name } = mockUpdateUserDto;

      const createdUser = await database.createUser(mockCreateUserDto);
      const userId = createdUser.id;
      const updatedData = {
        userId,
        dto: mockUpdateUserDto,
      };
      const updatedUser = await database.updateUser(updatedData);

      expect(updatedUser).toEqual({
        id: userId,
        name,
        email,
      });
    });

    it('should delete a user', async () => {
      const { mockCreateUserDto } = getMockData();

      const { id: userId } = await database.createUser(mockCreateUserDto);
      const deletedUser = await database.removeUser(userId);
      const user = await database.getUser(userId);

      expect(deletedUser).toEqual({ id: userId });
      expect(user).toBeNull();
    });
  });
});

const getMockData = () => {
  const mockCreateUserDto: CreateUserDTO = {
    name: chance.name(),
    email: chance.email(),
    password: chance.string(),
  };

  const mockUpdateUserDto: UpdateUserDTO = {
    name: chance.name(),
    email: chance.email(),
    password: chance.string(),
  };

  return { mockCreateUserDto, mockUpdateUserDto };
};
