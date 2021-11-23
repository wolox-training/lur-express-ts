import request from 'supertest';
import userRepository from '../app/services/users';
import app from '../app';

describe('users', () => {
  beforeEach(() =>
    userRepository.createMany([
      { firstName: 'John', lastName: 'Doe', email: 'example1@wolox.com', password: 'example123' },
      { firstName: 'Jane', lastName: 'Doe', email: 'example2@wolox.com', password: 'example123' }
    ])
  );
  describe('/users GET', () => {
    it('should return all users', (done: jest.DoneCallback) => {
      request(app)
        .get('/users')
        .expect(200)
        .then((res: request.Response) => {
          expect(res.body.length).toBe(2);
          done();
        });
    });
  });
  describe('/users POST', () => {
    it('should create an user', (done: jest.DoneCallback) => {
      request(app)
        .post('/users')
        .send({ firstName: 'Jhon', lastName: 'Doe', email: 'example3@wolox.com', password: 'example123' })
        .expect(201)
        .then(async () => {
          const user = await userRepository.findUser({ email: 'example3@wolox.com' });
          expect(user).not.toBeNull();
          done();
        });
    });
    it('should return an error when the email is already in use', (done: jest.DoneCallback) => {
      request(app)
        .post('/users')
        .send({
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'janedoe@wolox.com',
          password: 'example123'
        })
        .expect(201)
        .then(() => {
          request(app)
            .post('/users')
            .send({
              firstName: 'Jane',
              lastName: 'Doe',
              email: 'janedoe@wolox.com',
              password: 'example123'
            })
            .then((response: request.Response) => {
              expect(response.status).toBe(500);
              expect(response.body).not.toBeNull();
              done();
            });
        });
    });
    it('should return an error when the password does not meet the restrictions', (done: jest.DoneCallback) => {
      request(app)
        .post('/users')
        .send({
          firstName: 'Best',
          lastName: 'Team',
          email: 'bestteam@wolox.com',
          password: '123BT'
        })
        .then((response: request.Response) => {
          expect(response.status).toBe(500);
          expect(response.body).not.toBeNull();
          done();
        });
    });
    it('should return an error when required data is missing', (done: jest.DoneCallback) => {
      request(app)
        .post('/users')
        .send({
          lastName: 'Doe',
          email: 'johndoe@wolox.com',
          password: 'example123'
        })
        .then((response: request.Response) => {
          expect(response.status).toBe(500);
          expect(response.body).not.toBeNull();
          done();
        });
    });
    describe('/users/:id GET', () => {
      it('should return user with id 1', (done: jest.DoneCallback) => {
        request(app)
          .get('/users/1')
          .expect(200)
          .then((res: request.Response) => {
            expect(res.body).toHaveProperty('email');
            expect(res.body).toHaveProperty('id');
            done();
          });
      });
      it('should return error for user with id 5', (done: jest.DoneCallback) => {
        request(app)
          .get('/users/5')
          .expect(404)
          .then((res: request.Response) => {
            expect(res.body).toHaveProperty('message');
            expect(res.body).toHaveProperty('internal_code');
            done();
          });
      });
    });
  });
});
