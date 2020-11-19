export type PipeEnum<T extends string> =
  string extends T
  ? string
  : T extends `${infer Start}|${infer Rest}`
  ? Start | PipeEnum<Rest>
  : T;
