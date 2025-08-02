export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  joinDate: string;
  avatar?: string;
}

export interface Post {
  id: string;
  content: string;
  author: User;
  likesCount: number;
  commentsCount: number;
  comments?: Comment[];
  createdAt: string;
  liked?: boolean;
}

export interface Comment {
  id: string;
  content: string;
  user: User;
  createdAt: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string;
}

export interface PostFeedResponse {
  posts: Post[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface UserProfileResponse {
  user: User;
  posts: Post[];
  postsCount: number;
}

export interface SearchUsersResponse {
  users: User[];
  count: number;
}
