import db from '@/lib/db';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    const body = await req.json();
    const user = await currentUser();
    const { src, name, description, instructions, seed, categoryId } = body;
    if (!params.companionId) {
      return new NextResponse('Missing companionId', { status: 400 });
    }
    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    if (
      !src ||
      !name ||
      !description ||
      !instructions ||
      !seed ||
      !categoryId
    ) {
      return new NextResponse('Missing required fields', { status: 400 });
    }
    const companion = await db.companion.update({
      where: { id: params.companionId, userId: user.id },
      data: {
        categoryId,
        userId: user.id,
        userName: user.firstName,
        src,
        name,
        description,
        instructions,
        seed,
      },
    });
    return NextResponse.json(companion);
  } catch (error) {
    console.log('[COMPANION PATCH  ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { companionId: string } }
) {
  try {
    const user = await currentUser();

    if (!user || !user.id || !user.firstName) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const companion = await db.companion.delete({
      where: { id: params.companionId, userId: user.id },
    });

    return NextResponse.json(companion);
  } catch (error) {
    console.log('[COMPANION DELETE  ERROR]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
