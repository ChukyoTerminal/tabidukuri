import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ roomId: string; nodeId: string }> }
) {
  const { roomId, nodeId } = await params;
  const { name, description, x, y } = await request.json();

  if (!name && !description && x === undefined && y === undefined) {
    return new Response('One of name, description, x, and y are required', { status: 400 });
  }

  try {
    const updatedNode = await prisma.node.updateMany({
      where: {
        id: nodeId,
        roomId: roomId,
      },
      data: {
        name,
        description,
        x,
        y,
      },
    });

    if (updatedNode.count === 0) {
      return new Response('Node not found or no changes made', { status: 404 });
    }

    return new Response(JSON.stringify(updatedNode), { status: 200 });
  } catch (e) {
    console.error('Error updating node:', e);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ roomId: string; nodeId: string }> }
) {
  const { roomId, nodeId } = await params;

  try {
    await prisma.node.delete({
      where: {
        id: nodeId,
        roomId: roomId,
      },
    });

    return new Response(undefined, { status: 200 });
  } catch (e) {
    console.error('Error deleting node:', e);
    return new Response('Internal Server Error', { status: 500 });
  }
}
