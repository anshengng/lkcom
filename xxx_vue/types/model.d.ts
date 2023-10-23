export interface UserModel {
  id?: number
  name?: string
  nickname?: string
  realname?: string
  address?: string
  website?: string
  wechat?: string
  microblog?: string
  github?: string
  qq?: number
  mobile?: string
  avator?: string
  secret?: string
  createAt?: string
  updateAt?: string
}

export interface SoftModel {
  id: number;
  title: string;
  content: string;
  description: string;
  preview: string;
  createAt: string;
  updateAt: string;
  is_free: boolean;
  userId: number;
}


export interface CommentModel {
  id: number;
  content: string;
  createAt: string;
  updateAt: string;
  appId: number;
  userId: number;
  commentId?: number;
  postId?: number;
  user: UserModel;
  replys: CommentModel[];
}


interface PostModel {
  id: number;
  title: string;
  content: string;
  preview: string;
  createAt: string;
  updateAt: string;
  userId: number;
  user: UserModel;
  comment: CommentModel[];
}

