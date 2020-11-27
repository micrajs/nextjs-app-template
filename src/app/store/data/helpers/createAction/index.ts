export type Action<T extends Record<string, any> = {}> = T & {
  type: string;
};

export type ActionCreator<A extends Action> = {
  <K extends keyof Omit<A, 'type'>>(payload?: A[K] | Omit<A, 'type'>): A;
  type: A['type'];
};

export const createAction = <A extends Action = Action>(type: A['type']) => {
  function actionCreator<P = any>(payload: Omit<A, 'type'> = undefined) {
    if (typeof payload === 'object') {
      return { type, ...payload };
    }

    return {
      type,
      payload,
    } as Action<{ payload: P }>;
  }

  actionCreator.type = type;

  return actionCreator as ActionCreator<A>;
};
