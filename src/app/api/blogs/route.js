import { NextResponse } from 'next/server';
import blogService from '@/lib/blog-service';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  const params = {
    page: searchParams.get('page'),
    limit: searchParams.get('limit'),
    tag: searchParams.get('tag'),
    q: searchParams.get('q')
  };
  
  try {
    const result = await blogService.getBlogs(params);
    console.log('Fetched blogs:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs', message: error.message },
      { status: 500 }
    );
  }
}