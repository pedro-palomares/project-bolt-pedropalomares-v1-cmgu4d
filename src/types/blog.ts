export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface GeneratePostResponse {
  success: boolean;
  post?: Post;
  error?: string;
}