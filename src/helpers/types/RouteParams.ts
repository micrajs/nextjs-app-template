import type { PipeEnum } from 'helpers/types/PipeEnum';

export type RouteParams<T extends string> =
  string extends T
  ? Record<string, string>
  : T extends `${infer _}:${infer Param}(${infer Options})?/${infer Rest}`
  ? { [K in Param]?: PipeEnum<Options> } & RouteParams<Rest>
  : T extends `${infer _}:${infer Param}(${infer Options})/${infer Rest}`
  ? { [K in Param]: PipeEnum<Options> } & RouteParams<Rest>
  : T extends `${infer _}:${infer Param}?/${infer Rest}`
  ? { [K in Param]?: string } & RouteParams<Rest>
  : T extends `${infer _}:${infer Param}/${infer Rest}`
  ? { [K in Param]: string } & RouteParams<Rest>
  : T extends `${infer _}:${infer Param}(${infer Options})?`
  ? { [k in Param]?: PipeEnum<Options> }
  : T extends `${infer _}:${infer Param}(${infer Options})`
  ? { [k in Param]: PipeEnum<Options> }
  : T extends `${infer _}:${infer Param}?`
  ? { [k in Param]?: string }
  : T extends `${infer _}:${infer Param}`
  ? { [k in Param]: string }
  : Record<string, unknown>;
