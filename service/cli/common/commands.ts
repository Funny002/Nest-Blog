import 'reflect-metadata';

/* 名称 */
export const CommandName = Symbol('command_name');

/* 名称 */
export const CommandOptionName = Symbol('command_options');

/* 声明 */
export interface CommandOpt {
  name: string;
  version?: string;
  helpText?: string;
  description?: string;
}

/* 声明 */
export interface CommandOptionOpt {
  flags: string; // 命令行参数
  type?: string; // 参数类型
  alias?: string; // 命令行参数别名
  isAction?: boolean; // 是否是命令
  defaultValue?: any; // 默认值
  description?: string; // 描述
  defaultValueDescription?: string; // 默认值描述

  handler?(...args: any[]): any;

  command?(...args: any[]): void | Promise<void>;
}

/* 方法 */
export function Command(options: CommandOpt) {
  return function (constructor: any) {
    Reflect.defineMetadata(CommandName, options, constructor);
    return constructor;
  };
}

/* 方法 */
export function CommandOption(option: CommandOptionOpt): any;
export function CommandOption(option: CommandOptionOpt[]): any;
export function CommandOption(option: any) {
  const options: CommandOptionOpt[] = Array.isArray(option) ? option : [Object.assign(option, { isAction: true })];
  const status = options.find(({ isAction }) => isAction);
  if (!status) options[0].isAction = true;
  return function (_: any, __: any, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(CommandOptionName, options, descriptor.value);
    return descriptor;
  };
}
