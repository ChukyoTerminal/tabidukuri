import { prisma } from '@/lib/prisma';


export async function GET(request: Request, { params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await params;

  const room = await prisma.room.findUnique({
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
      owner: { select: { id: true, name: true } },
      members: { select: { user: { select: { id: true, name: true } } } },
    },
    where: { id: roomId },
  });

  if (!room) {
    return new Response('Room not found', { status: 404 });
  }

  return new Response(JSON.stringify(room), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await params;
  const body = await request.json();
  const { name, description } = body;

  const room = await prisma.room.findUnique({
    where: { id: roomId },
  });

  if (!room) {
    return new Response('Room not found', { status: 404 });
  }

  const updatedRoom = await prisma.room.update({
    where: { id: roomId },
    data: { name, description },
  });

  return new Response(JSON.stringify(updatedRoom), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await params;

  const room = await prisma.room.findUnique({
    where: { id: roomId },
  });

  if (!room) {
    return new Response('Room not found', { status: 404 });
  }

  await prisma.room.delete({
    where: { id: roomId },
  });

  return new Response('Room deleted', { status: 204 });
}
