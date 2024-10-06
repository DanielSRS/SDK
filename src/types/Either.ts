export interface Right<T> {
  _tag: 'Right';
  right: T;
}

export interface Left<T> {
  _tag: 'Left';
  left: T;
}

export type Either<L, R> = Left<L> | Right<R>;

export function isLeft<L, R>(val: Either<L, R>): val is Left<L> {
  return val._tag === 'Left';
}

export function isRight<L, R>(val: Either<L, R>): val is Right<R> {
  return val._tag === 'Right';
}

export function right<T>(val: T) {
  return {
    _tag: 'Right',
    right: val,
  } satisfies Right<T>;
}

export function left<T>(val: T) {
  return {
    _tag: 'Left',
    left: val,
  } satisfies Left<T>;
}
