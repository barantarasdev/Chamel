import { PrismaClient } from '@prisma/client';
import { DatabaseService } from './database.service';
import { CreateUserDTO } from '../controllers/user/dto/user-create.dto';
import Chance from 'chance';

const chance = new Chance();
const prisma = new PrismaClient();

describe('Database', () => {
  let database: DatabaseService;

  beforeAll(async () => {
    await prisma.$connect();
    database = new DatabaseService();
  });

  describe('User', () => {
    it('should create a user', async () => {
      const mockCreateUserDto: CreateUserDTO = {
        name: chance.name(),
        email: chance.email(),
        password: chance.string(),
      };

      const createdUser = await database.createUser(mockCreateUserDto);

      expect(createdUser).toEqual({
        id: createdUser.id,
        email: mockCreateUserDto.email,
        name: mockCreateUserDto.name,
      });
    });

    it('should update a user', async () => {
      const mockCreateUserDto: CreateUserDTO = {
        name: chance.name(),
        email: chance.email(),
        password: chance.string(),
      };

      const createdUser = await database.createUser(mockCreateUserDto);
      const updateUserPayload = {
        name: chance.name(),
        email: chance.email(),
      };
      const updatedUser = await database.updateUser({
        dto: updateUserPayload,
        userId: createdUser.id,
      });

      expect(updatedUser).toEqual({ ...updateUserPayload, id: createdUser.id });
    });

    it('should delete a user', async () => {
      const mockCreateUserDto: CreateUserDTO = {
        name: chance.name(),
        email: chance.email(),
        password: chance.string(),
      };

      const createdUser = await database.createUser(mockCreateUserDto);
      const deletedUser = await database.removeUser(createdUser.id);
      const user = await database.getUser(createdUser.id);

      expect(deletedUser).toEqual({ id: createdUser.id });
      expect(user).toBeNull();
    });
  });

  describe('Token', () => {
    it('should create a refresh token', async () => {
      const mockCreateUserDto: CreateUserDTO = {
        name: chance.name(),
        email: chance.email(),
        password: chance.string(),
      };

      const refreshToken = chance.hash();
      const createdUser = await database.createUser(mockCreateUserDto);
      await database.createRefreshToken({
        userId: createdUser.id,
        refreshToken,
      });
      const token = await database.getRefreshTokenByToken(refreshToken);

      expect(token).toBeDefined();
    });

    it('should update a refresh token', async () => {
      const mockCreateUserDto: CreateUserDTO = {
        name: chance.name(),
        email: chance.email(),
        password: chance.string(),
      };

      const refreshToken = chance.hash();
      const newRefreshToken = chance.hash();
      const createdUser = await database.createUser(mockCreateUserDto);
      await database.createRefreshToken({
        userId: createdUser.id,
        refreshToken,
      });
      await database.updateRefreshToken({ refreshToken, newRefreshToken });
      const token = await database.getRefreshTokenByToken(newRefreshToken);

      expect(token).toEqual({
        user: {
          email: mockCreateUserDto.email,
        },
        userId: createdUser.id,
      });
    });

    it('should remove a refresh token', async () => {
      const mockCreateUserDto: CreateUserDTO = {
        name: chance.name(),
        email: chance.email(),
        password: chance.string(),
      };

      const refreshToken = chance.hash();
      const createdUser = await database.createUser(mockCreateUserDto);
      await database.createRefreshToken({
        userId: createdUser.id,
        refreshToken,
      });
      await database.removeRefreshToken(refreshToken);
      const token = await database.getRefreshTokenByToken(refreshToken);

      expect(token).toBeNull();
    });

    it('should add a token to blacklist', async () => {
      const mockCreateUserDto: CreateUserDTO = {
        name: chance.name(),
        email: chance.email(),
        password: chance.string(),
      };

      const refreshToken = chance.hash();
      const createdUser = await database.createUser(mockCreateUserDto);
      await database.createRefreshToken({
        userId: createdUser.id,
        refreshToken,
      });
      await database.addTokenToBlacklist(refreshToken);
      const isBlacklisted = await database.isTokenBlacklisted(refreshToken);

      expect(isBlacklisted).toBeTruthy();
    });
  });
});
