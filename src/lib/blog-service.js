class BlogService {
  constructor() {
    this.jsonServerUrl = this.getJsonServerUrl();
  }

  getJsonServerUrl() {
    // Priority: Environment variable > Default dev URL
    if (process.env.JSON_SERVER_URL) {
      return process.env.JSON_SERVER_URL;
    }
    
    // Default for development
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:3001';
    }
    
    // This should be set in production environment
    throw new Error('JSON_SERVER_URL environment variable is required in production');
  }

  async fetchFromJsonServer(endpoint, params = {}) {
    const url = new URL(`${this.jsonServerUrl}${endpoint}`);
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        url.searchParams.set(key, value);
      }
    });

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`JSON Server responded with status: ${response.status}`);
    }

    return {
      data: await response.json(),
      headers: {
        totalCount: response.headers.get('X-Total-Count'),
        link: response.headers.get('Link')
      }
    };
  }

  async getBlogs(params = {}) {
    const { page, limit, tag, q } = params;
    
    // Map Next.js parameters to JSON Server parameters
    const jsonServerParams = {};
    if (page) jsonServerParams._page = page;
    if (limit) jsonServerParams._limit = limit;
    if (tag) jsonServerParams.tags_like = tag;
    if (q) jsonServerParams.q = q;

    const result = await this.fetchFromJsonServer('/blogs', jsonServerParams);
    
    const currentPage = parseInt(page || '1');
    const pageLimit = parseInt(limit || '10');
    const total = parseInt(result.headers.totalCount || result.data.length);
    const totalPages = Math.ceil(total / pageLimit);

    return {
      data: result.data,
      pagination: {
        page: currentPage,
        limit: pageLimit,
        total,
        totalPages,
        hasNext: currentPage < totalPages,
        hasPrev: currentPage > 1
      }
    };
  }

  async getBlogBySlug(slug) {
    // Fetch all blogs to find the current one and determine prev/next
    const result = await this.fetchFromJsonServer('/blogs');
    const blogs = result.data;
    
    const currentIndex = blogs.findIndex(blog => blog.slug === slug);
    
    if (currentIndex === -1) {
      return null; // Blog not found
    }
    
    const currentBlog = blogs[currentIndex];
    const prevBlog = currentIndex > 0 ? blogs[currentIndex - 1] : null;
    const nextBlog = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;
    
    return {
      blog: currentBlog,
      navigation: {
        prev: prevBlog ? {
          slug: prevBlog.slug,
          title: prevBlog.title,
          // Include any other fields you want for navigation
          publishedAt: prevBlog.publishedAt
        } : null,
        next: nextBlog ? {
          slug: nextBlog.slug,
          title: nextBlog.title,
          // Include any other fields you want for navigation
          publishedAt: nextBlog.publishedAt
        } : null
      }
    };
  }
}

// Create singleton instance
const blogService = new BlogService();
export default blogService;