export function debounce(func: any, timeout = 300): (...args: any[]) => void {
  let state: NodeJS.Timeout;
  return function (...args: any[]) {
    if (state) clearTimeout(state);
    state = setTimeout(() => func(...args), timeout);
  };
}

export function throttle(func: any, timeout = 300, before?: (...args: any[]) => any[]): (...args: any[]) => void {
  let state: boolean = false;
  return function (...args: any[]) {
    if (state) return;
    state = true;
    setTimeout(() => state = false, timeout);
    args = (before && before(...args)) || args;
    func(...args);
  };
}
