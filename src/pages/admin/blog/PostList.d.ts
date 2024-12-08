import React from 'react';
import type { Post } from '../../../types/blog';
interface PostListProps {
    posts?: Post[];
    isLoading: boolean;
}
declare const PostList: React.FC<PostListProps>;
export default PostList;
