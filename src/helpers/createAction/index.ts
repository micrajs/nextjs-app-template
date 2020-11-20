export interface Action {
  type: string;
  payload?: unknown;
}

export type ActionCreator<A extends Action> = {
  (payload?: A['payload']): A;
  type: A['type'];
};

export const createAction = <A extends Action = Action>(type: A['type']) => {
  function actionCreator(payload: A['payload'] = undefined) {
    return {
      type,
      payload,
    } as A;
  }

  actionCreator.type = type;

  return actionCreator as ActionCreator<A>;
};
