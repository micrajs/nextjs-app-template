import { deepMerge } from 'helpers/deep-merge';

type Action<P extends Record<string, any> = {}> = P & { type: string };
type UnionToIntersection<A, S> = (
  A extends any ? (state: S, action: A) => Partial<S> : never
) extends (state: S, a: infer I) => void
  ? I
  : never;

type MatchHandlers<A extends Action, S> = UnionToIntersection<
  A extends any ? Record<A['type'], (state: S, action: A) => Partial<S>> : never,
  S
>;

type DefaultedOrFullHandlers<A extends Action, S> =
  | Partial<MatchHandlers<A, S>>
  | MatchHandlers<A, S>;

const noopReducer = <S>(s: S) => s;

export function createReducer<A extends Action, S>(
  initialState: S,
  actionHandlers: DefaultedOrFullHandlers<A, S> = {},
) {
  function reducer(state: S = initialState, action: A): S {
    if (action.type === '*/reset') {
      return initialState;
    }

    const result = (actionHandlers[action.type] ?? noopReducer)(state, action);

    return deepMerge(state, result);
  }

  reducer.on = (addons: DefaultedOrFullHandlers<A, S>) => {
    Object.keys(addons).forEach((type) => {
      actionHandlers[type] = addons[type];
    });
  };

  return reducer;
}
