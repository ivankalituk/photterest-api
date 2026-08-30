import { Prisma } from '@prisma/client';

export const userSelect = {
  id: true,
  nickname: true,
  email: true,
  birth_date: true,
  avatar_url: true,
  google_id: true,
  role: true,
  created_at: true,
  updated_at: true,
} satisfies Prisma.usersSelect;

export const userAuthSelect = {
  ...userSelect,
  password_hash: true,
} satisfies Prisma.usersSelect;
