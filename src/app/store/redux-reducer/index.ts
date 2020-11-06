import { Action } from 'redux';

type Reducer<S = any, A extends Action = Action<string>> = (state: S, action: A) => S;

export class ReduxReducer<S = any, A extends Action = Action<string>> {
  protected name: string;

  protected initialState: S;

  protected actionHandlers: Map<string, Reducer<S, A>[]>;

  constructor(name: string, initialState: S) {
    this.name = name;
    this.initialState = initialState;
    this.actionHandlers = new Map([
      ['*/reset', [() => this.initialState]],
      [`${this.name}/reset`, [() => this.initialState]],
    ]);
  }

  public on<E extends A = A>(action: E['type'], handler: Reducer<S, E>) {
    if (!this.actionHandlers.has(action)) {
      this.actionHandlers.set(action, []);
    }

    this.actionHandlers.get(action)?.push(handler as Reducer<S, A>);
    return this;
  }

  public reducer() {
    return (state: S = this.initialState, action: A) => {
      if (this.actionHandlers.has(action.type)) {
        return (this.actionHandlers.get(action.type) as Reducer[]).reduce(
          (curState: S, handler) => handler(curState, action),
          state,
        );
      }

      return state;
    };
  }
}
