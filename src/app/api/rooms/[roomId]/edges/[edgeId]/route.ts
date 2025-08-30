import { prisma } from '@/lib/prisma';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ roomId: string; edgeId: string }> }
) {
  const { roomId, edgeId } = await params;

  const edge = await prisma.edge.findUnique({
    where: { id: edgeId },
  });

  if (!edge || edge.roomId !== roomId) {
    return new Response('Edge not found', { status: 404 });
  }

  const { transportationHopId } = await request.json();

  const updatedEdge = await prisma.edge.update({
    where: { id: edgeId },
    data: { transportationHopId },
  });

  return new Response(JSON.stringify(updatedEdge), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ roomId: string; edgeId: string }> }
) {
  const { roomId, edgeId } = await params;

  const edge = await prisma.edge.findUnique({
    where: { id: edgeId },
  });

  if (!edge || edge.roomId !== roomId) {
    return new Response('Edge not found', { status: 404 });
  }

  await prisma.edge.delete({
    where: { id: edgeId },
  });

  return new Response(undefined, { status: 200 });
}
