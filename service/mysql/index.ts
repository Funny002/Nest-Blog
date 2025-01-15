import { Articles, ArticlesVersions } from './Articles';
import { Users, UsersLogin, UsersName } from './Users';
import { Comments } from './Comments';
import { Setting } from './Config';
import { Files } from './Files';
import { Types } from './Types';
import { Tags } from './Tags';

export * from './Articles';
export * from './Comments';
export * from './Common';
export * from './Config';
export * from './Users';
export * from './Files';
export * from './Types';
export * from './Tags';

export const AllEntities = [
  // 文章
  Articles,
  // 文章版本
  ArticlesVersions,
  // 评论
  Comments,
  // 配置
  Setting,
  // 文件
  Files,
  // 文章标签
  Tags,
  // 文章类型
  Types,
  // 用户
  Users,
  // 用户名称
  UsersName,
  // 用户登录
  UsersLogin,
];
