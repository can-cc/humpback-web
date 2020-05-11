export function buildStateWorker<T>(state: T) {
  return {
    pipe: function (...args: Array<(state: T) => T>): T {
      return args.reduce((result, reduceFn) => {
        return reduceFn(result);
      }, state);
    },
  };
}
