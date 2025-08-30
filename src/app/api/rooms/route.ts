import { getToken } from 'next-auth/jwt';

import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }

  const rooms = await prisma.user.findMany({
    select: {
      rooms: true,
    },
    where: {
      id: token.id,
    },
  });

  return new Response(JSON.stringify(rooms), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}


export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { name, description } = await request.json();

  if (!name || name.trim() === '') {
    return new Response('Room name is required', { status: 400 });
  }

  const newRoom = await prisma.room.create({
    data: {
      name,
      description: description?.trim() === '' ? null : description,
      ownerId: token.id,
    },
  });

  return new Response(JSON.stringify(newRoom), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
