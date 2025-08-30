import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId } = await params;

  const edges = await prisma.edge.findMany({
    select: {
      id: true,
      fromNodeId: true,
      toNodeId: true,
      transportationHopId: true,
    },
    where: { roomId },
  });

  return new Response(JSON.stringify(edges), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId } = await params;
  const { fromNodeId, toNodeId } = await request.json();

  if (!fromNodeId || !toNodeId) {
    return new Response(
      JSON.stringify({ error: 'fromNodeId and toNodeId are required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const newEdge = await prisma.edge.create({
    data: {
      roomId,
      fromNodeId,
      toNodeId,
    },
  });

  return new Response(JSON.stringify(newEdge), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}
