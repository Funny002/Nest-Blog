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

export function ObjectOmit<T = Record<string, any>, V = Array<string>>(target: T, omits: V): Omit<T, V> {
  const newValue = Object.assign({}, target);
  for (const key of omits) {
    if (key in newValue) {
      delete newValue[key];
    }
  }
  return newValue;
}

export function ObjectPick<T = Record<string, any>, V = Array<string>>(target: T, array: V): Pick<T, V> {
  return array.reduce(function (value: Record<string, any>, keys: string) {
    if (keys in target) value[keys] = target[keys];
    return value;
  }, {});
}

export function MergeOptions<T = Record<string, any>, V = Record<string, any>>(target: T, ...options: Array<V>): T {
  return options.reduce(function (prev: T, option: V) {
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

export function listToTree(target: any[], key = 'id', parent = 'parent') {
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

export function treeSort(target: any[], type: 'asc' | 'desc' = 'asc', key = 'sort', children = 'children') {
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
