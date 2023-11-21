import {
  createErrorResponse,
  createMessageResponse,
  createResponse,
} from './common';

export const AuthResponse = {
  localLogin: {
    200: createResponse({
      data: {
        user: {
          createdAt: '2023-11-20T22:16:23.574Z',
          updatedAt: '2023-11-20T22:16:23.574Z',
          deletedAt: null,
          id: 2,
          username: 'string1',
          password:
            '$2a$10$B6NbOJ/8qfbJUNyKzoCT5.eckwiJe8nfoGk8ZUndnuYQiS3pqimgi',
          role: 'USER',
        },
        token: {
          accessToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MDA1NTA5OTMsImV4cCI6MTcwMDU1NDU5M30.0VWZoF-nl_XK0k12vpMS47F-SFK7HKmHqVgotpPBczU',
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6IlVTRVIiLCJpYXQiOjE3MDA1NTA5OTMsImV4cCI6MTcwMTE1NTc5M30.EVk1t3Yb7KrTU501ke3VqTV6VKwznwKRa7Y31QJ74Y0',
        },
      },
      statusCode: 200,
      message: '로그인에 성공했습니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '비밀번호가 맞지 않습니다.',
      error: 'BAD REQUEST',
    }),
    404: createErrorResponse({
      statusCode: 404,
      message: '유저를 찾을 수 없습니다.',
      error: 'NOT FOUND',
    }),
  },
  saveUser: {
    200: createMessageResponse({
      statusCode: 200,
      message: '회원가입 되었습니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '이미 회원가입한 유저 입니다.',
      error: 'BAD REQUEST',
    }),
  },
  saveAdmin: {
    200: createMessageResponse({
      statusCode: 200,
      message: '관리자 회원가입이 성공했습니다.',
    }),
    400: createErrorResponse({
      statusCode: 400,
      message: '이미 회원가입한 유저 입니다.',
      error: 'BAD REQUEST',
    }),
  },
};
