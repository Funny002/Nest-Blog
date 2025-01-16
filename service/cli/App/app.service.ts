import { CommandName, CommandOpt, CommandOptionName, CommandOptionOpt } from '../common/commands';
import { ModulesContainer } from '@nestjs/core';
import { Command, Option } from 'commander';
import { Injectable } from '@nestjs/common';
import 'reflect-metadata';

@Injectable()
export class AppService {
  private program: Command;

  constructor(private readonly container: ModulesContainer) {
    this.program = this.createCommand({
      version: '0.0.1',
      name: 'Nest Blog Cli',
      description: '为 Nest Blog 提供命令行工具',
    });
  }

  createCommand(options: CommandOpt) {
    const program = new Command();
    program.name(options.name);
    if (options.version) program.version(options.version);
    if (options.description) program.description(options.description);
    if (options.helpText) program.addHelpText('after', options.helpText);

    return program;
  }

  createOption({ alias, flags, description, type, ...opt }: CommandOptionOpt) {
    const name = alias && flags ? `-${alias}, --${flags}` : `-${alias || flags}`;
    const option = new Option([name, type].join(' '), description);
    if (opt.handler) option.argParser(opt.handler);
    if (opt.defaultValue) option.default(opt.defaultValue, opt.defaultValueDescription);
    return option;
  }

  getAllInjectable() {
    const injectables: any[] = [];
    const containers = Array.from(this.container.values());
    for (const container of containers) {
      const wrappers = Array.from(container.providers.values());
      for (const wrapper of wrappers) {
        if (wrapper.instance && wrapper.instance.constructor) {
          injectables.push(wrapper.instance);
        }
      }
    }
    return injectables;
  }

  addCommand(injectable: any, options: CommandOpt) {
    const actionMap: { [key: string]: () => void } = {};
    const proto = Object.getPrototypeOf(injectable);
    const command = this.createCommand(options);
    const names = Object.getOwnPropertyNames(proto).filter((v) => v !== 'constructor');
    for (const name of names) {
      const options: CommandOptionOpt[] = Reflect.getMetadata(CommandOptionName, proto[name]) || [];
      if (!options.length) continue; // 跳过

      for (const option of options) {
        command.addOption(this.createOption(option));
        if (option.isAction) {
          const flags = option.alias || option.flags;
          actionMap[flags.toLowerCase()] = injectable[name];
        }
      }
    }

    command.action(async (args: any) => {
      const keys = Object.keys(args).map((v) => v.toLowerCase());
      for (const key of keys) {
        if (actionMap.hasOwnProperty(key)) {
          await actionMap[key].apply(injectable, [args]);
        }
      }
    });

    this.program.addCommand(command);
  }

  async run() {
    for (const injectable of this.getAllInjectable()) {
      const meta: undefined | CommandOpt = Reflect.getMetadata(CommandName, injectable.constructor);
      if (meta) this.addCommand(injectable, meta);
    }
    await this.program.parseAsync();
  }
}
