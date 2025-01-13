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

export const AllEntities = [Articles, ArticlesVersions, Comments, Setting, Files, Tags, Types, Users, UsersName, UsersLogin];
