import { Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { UpdateUserT, UserT } from '../../types/user';
import Chance from 'chance';
import { CreateUserDTO } from './dto/user-create.dto';
import { UserController } from './user.controller';
import { DatabaseService } from '../../database/database.service';

const chance = new Chance();

describe('UserService', () => {
  let service: UserService;
  let database: DatabaseService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, DatabaseService],
    }).compile();

    database = moduleRef.get(DatabaseService);
    service = moduleRef.get(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUser', () => {
    it('should return a user when userId is provided', async () => {
      const { mockUser } = getMockData();
      const userId = mockUser.id;

      jest.spyOn(service, 'getUser').mockResolvedValue(mockUser);

      const user = await service.getUser(userId);

      expect(service.getUser).toHaveBeenCalledWith(userId);
      expect(user).toEqual(mockUser);
    });

    it('should return null when no userId is provided', async () => {
      jest.spyOn(service, 'getUser').mockResolvedValue(null);

      const newUserId = chance.guid();
      const user = await service.getUser(newUserId);

      expect(service.getUser).toHaveBeenCalledWith(newUserId);
      expect(user).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create and return a user', async () => {
      const { mockUser, mockCreateUserDTO } = getMockData();

      jest.spyOn(service, 'createUser').mockResolvedValue(mockUser);

      const user = await service.createUser(mockCreateUserDTO);

      expect(service.createUser).toHaveBeenCalledWith(mockCreateUserDTO);
      expect(user).toEqual(mockUser);
    });
  });

  describe('updateUser', () => {
    it('should update and return the updated user', async () => {
      const { mockUser, mockUpdateUserT } = getMockData();

      jest.spyOn(service, 'updateUser').mockResolvedValue(mockUser);

      const updatedUser = await service.updateUser(mockUpdateUserT);

      expect(service.updateUser).toHaveBeenCalledWith(mockUpdateUserT);
      expect(updatedUser).toEqual(mockUser);
    });
  });

  describe('removeUser', () => {
    it('should remove and return the removed user id', async () => {
      const { mockUser } = getMockData();
      const userId = mockUser.id;

      jest.spyOn(service, 'removeUser').mockResolvedValue({ id: userId });

      const result = await service.removeUser(userId);

      expect(service.removeUser).toHaveBeenCalledWith(userId);
      expect(result).toEqual({ id: userId });
    });

    it('should return null if the user does not exist', async () => {
      jest.spyOn(service, 'removeUser').mockResolvedValue(null);

      const newUserId = chance.guid();
      const result = await service.removeUser(newUserId);

      expect(service.removeUser).toHaveBeenCalledWith(newUserId);
      expect(result).toBeNull();
    });
  });
});

const getMockData = () => {
  const mockUser: UserT = {
    id: chance.guid(),
    name: chance.name(),
    email: chance.email(),
  };
  const { name, email } = mockUser;

  const mockCreateUserDTO: CreateUserDTO = {
    name,
    email,
    password: chance.string(),
  };

  const mockUpdateUserT: UpdateUserT = {
    userId: chance.guid(),
    dto: {
      name: chance.name(),
    },
  };

  return { mockUser, mockCreateUserDTO, mockUpdateUserT };
};
