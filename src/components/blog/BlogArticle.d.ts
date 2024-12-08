import React from 'react';
interface BlogArticleProps {
    title: string;
    date: string;
    readTime: string;
    content: string;
    tags: string[];
    image: string;
}
declare const BlogArticle: React.FC<BlogArticleProps>;
export default BlogArticle;
