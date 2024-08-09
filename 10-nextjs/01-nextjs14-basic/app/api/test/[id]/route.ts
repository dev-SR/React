import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
	const id = params.id;
	const user = { id, name: 'Jhon' };
	return NextResponse.json(user);
}
