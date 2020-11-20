import { Action } from 'redux';

type Reducer<S, A extends Action = Action<string>> = (state: S, action: A) => S;

export class ReduxReducer<S, A extends Action> {
  protected name: string;

  protected initialState: S;

  protected actionHandlers: Map<A['type'], Reducer<S, A>>;

  constructor(name: string, initialState: S) {
    this.name = name;
    this.initialState = initialState;
    this.actionHandlers = new Map([
      ['*/reset', () => this.initialState],
      [`${this.name}/reset`, () => this.initialState],
    ]);
  }

  public on<E extends A>(action: E['type'], handler: Reducer<S, E>) {
    this.actionHandlers.set(action, handler);

    return this;
  }

  public reducer() {
    return (state: S = this.initialState, action: A): S => {
      return this.actionHandlers.has(action.type)
        ? this.actionHandlers.get(action.type)(state, action)
        : state;
    };
  }
}
