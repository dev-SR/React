import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';
export async function GET(request: NextRequest) {
	const posts = await prisma.post.findMany();
	return NextResponse.json(posts);
}
