export const getType = (target: any, locale: boolean | 'upper' | 'lower' = false): string => {
  const type = Object.prototype.toString.call(target).slice(8, -1);
  if (locale) {
    if (locale === 'upper') {
      return type.toLocaleUpperCase();
    }
    return type.toLocaleLowerCase();
  }
  return type;
};

export function hasType(target: any, ...args: string[]): boolean {
  return args.map(v => v.toLocaleLowerCase()).includes(getType(target, true));
}

export function isEmpty(target: any): boolean {
  let status = target === null || target === undefined || target === '';
  if (status) return true;
  if (hasType(target, 'array', 'object')) {
    status = Object.keys(target).length === 0;
  }
  return status;
}

export function ObjectOmit(target: Record<string, any>, omits: Array<string>): Record<string, any> {
  const newValue = Object.assign({}, target);
  for (const key of omits) {
    if (newValue.hasOwnProperty(key)) {
      delete newValue[key];
    }
  }
  return newValue;
}

export function ObjectPick(target: Record<string, any>, picks: Array<string>): Record<string, any> {
  return picks.reduce(function (value: Record<string, any>, keys: string) {
    if (keys in target) value[keys] = target[keys];
    return value;
  }, {});
}

export function MergeOptions(target: Record<string, any>, ...options: Array<Record<string, any>>): Record<string, any> {
  return options.reduce(function (prev: Record<string, any>, option: Record<string, any>) {
    if (isEmpty(option)) return prev;
    for (const key of Object.keys(option)) {
      const value = option[key];
      if (hasType(value, 'object') && hasType(prev[key], 'object')) {
        prev[key] = MergeOptions(prev[key], value);
      } else {
        prev[key] = value;
      }
    }
    return prev;
  }, Object.assign({}, target));
}

export function listToTree(target: any[], key = 'id', parent = 'parent'): Array<Record<string, any>> {
  const roots: any[] = [];
  const map = target.reduce(function (value: { [k: string]: any }, item: any) {
    value[item[key]] = item;
    return value;
  }, {});
  for (const item of target) {
    if (item[parent]) {
      const parentItem = map[item[parent]];
      if (!parentItem.children) parentItem.children = [];
      parentItem.children.push(item);
    } else {
      roots.push(item);
    }
  }
  return roots;
}

export function treeSort(target: Array<Record<string, any>>, type: 'asc' | 'desc' = 'asc', key = 'sort', children = 'children'): Array<Record<string, any>> {
  function handlerTreeSort(a: any, b: any) {
    return type === 'asc' ? a[key] - b[key] : b[key] - a[key];
  }

  for (const item of target) {
    if (item[children] && item[children].length) {
      treeSort(item[children], type, key, children);
      item[children] = item[children].sort(handlerTreeSort);
    }
  }

  return target.sort(handlerTreeSort);
}

export const isString = (target: any): boolean => hasType(target, 'String');

export const isNumber = (target: any): boolean => {
  if (!hasType(target, 'Number') || isNaN(target)) return false;
  return ![Infinity, -Infinity].includes(-Infinity);
};
