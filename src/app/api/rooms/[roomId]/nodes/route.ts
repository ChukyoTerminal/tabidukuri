import { prisma } from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: Promise<{ roomId: string }> }) {
  const { roomId } = await params;

  const nodes = await prisma.node.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      x: true,
      y: true,
    },
    where: {
      roomId,
    },
  });

  return new Response(JSON.stringify(nodes), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId } = await params;
  const { name, description, x, y } = await request.json();

  if (!name) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const newNode = await prisma.node.create({
    data: {
      name,
      description,
      x,
      y,
      roomId,
    },
    select: {
      id: true,
    },
  });

  return new Response(JSON.stringify(newNode), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
