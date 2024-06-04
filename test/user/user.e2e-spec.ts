import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from '../../src/user/user.module';
import { request } from 'express';
import { CreateUserDto } from '../../src/user/dto/create-user.dto/create-user.dto';

describe('[Feature] User - /user', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // it('Create [POST /]', () => {
  //   return request(app.getHttpServer())
  //     .post('/user')
  //     .send(user as CreateUserDto)
  //     .expect(HttpStatus.CREATED)
  //     .then(({ body }) => {
  //       const expectedUser = jasmine.objectContaining({
  //         ...user,
  //       });
  //       expect(body).toEqual(expectedUser);
  //     });
  // });
  it.todo('Create [POST /]');
  it.todo('Get all [GET /]');
  it.todo('Get one [GET /:id]');
  it.todo('Update one [PATCH /:id]');
  it.todo('Delete one [DELETE /:id]');

  afterAll(async () => {
    await app.close();
  });
});
