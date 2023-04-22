import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';
import { URLParam } from '~/types/common';
export async function DELETE(request: NextRequest, { params }: URLParam) {
	const post = await prisma.post.delete({
		where: {
			id: params.id
		}
	});
	return NextResponse.json(post);
}
