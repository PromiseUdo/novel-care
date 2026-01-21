// app/api/revalidate/route.ts
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  // Verify secret to prevent unauthorized access
  const secret = request.headers.get('x-vercel-reval-key');
  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  try {
    // Revalidate the blog index and all post pages
    await revalidatePath('/blog'); // Blog index
    await revalidatePath('/events'); // Blog index
    await revalidatePath('/blog/[slug]', 'page'); // All post pages
    await revalidatePath('/events/[slug]', 'page'); // All post pages
    return NextResponse.json({ revalidated: true });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
