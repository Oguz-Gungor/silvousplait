export interface ITSBeam {}

export function TSBeam<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor implements ITSBeam {};
}
