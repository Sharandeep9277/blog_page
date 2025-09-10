import { NextResponse } from 'next/server';
import blogService from '@/lib/blog-service';

export async function GET(request, { params }) {
  const { slug } = params;
  
  try {
    const blog = await blogService.getBlogBySlug(slug);
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog', message: error.message },
      { status: 500 }
    );
  }
}