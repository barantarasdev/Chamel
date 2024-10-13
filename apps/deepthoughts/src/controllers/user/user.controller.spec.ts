import { Test } from '@nestjs/testing';
import request from 'supertest';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseService } from '../../database/database.service';
import { UpdateUserT, UserT } from '../../types/user';
import Chance from 'chance';
import { INestApplication } from '@nestjs/common';

const chance = new Chance();

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let service: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, DatabaseService],
    }).compile();

    app = moduleRef.createNestApplication();
    service = moduleRef.get(UserService);

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/user/:userId (GET) should return a user', async () => {
    const { mockUser } = getMockData();
    const userId = mockUser.id;

    jest.spyOn(service, 'getUser').mockResolvedValue(mockUser);

    const response = await request(app.getHttpServer()).get(`/user/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it('/user (POST) should create a user', async () => {
    const { mockUser, mockCreateUserDto } = getMockData();

    jest.spyOn(service, 'createUser').mockResolvedValue(mockUser);

    const response = await request(app.getHttpServer())
      .post('/user')
      .send(mockCreateUserDto);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockUser);
  });

  it('/user/:userId (PUT) should update a user', async () => {
    const { mockUser, mockUpdateUserT } = getMockData();
    const updatedUser = { ...mockUser, ...mockUpdateUserT };

    jest.spyOn(service, 'updateUser').mockResolvedValue(updatedUser);

    const response = await request(app.getHttpServer())
      .put(`/user/${mockUser.id}`)
      .send({ name: 'Updated Name' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedUser);
  });

  it('/user/:userId (DELETE) should delete a user', async () => {
    const { mockUser } = getMockData();
    const userId = mockUser.id;

    jest.spyOn(service, 'removeUser').mockResolvedValue({ id: userId });

    const response = await request(app.getHttpServer()).delete(
      `/user/${userId}`
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: userId });
  });
});

const getMockData = () => {
  const mockUser: UserT = {
    id: chance.guid(),
    name: chance.name(),
    email: chance.email(),
  };

  const mockCreateUserDto = {
    name: mockUser.name,
    email: mockUser.email,
  };

  const mockUpdateUserT: UpdateUserT = {
    userId: chance.guid(),
    dto: {
      name: chance.name(),
    },
  };

  return { mockCreateUserDto, mockUser, mockUpdateUserT };
};
