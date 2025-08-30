import { getToken } from 'next-auth/jwt';

import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
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


export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { name, description } = await req.json();

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
