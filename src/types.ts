/* eslint-disable @typescript-eslint/no-explicit-any */
export type MdxSourceType = string;
import { Plugin } from 'unified';
import { VFileWithOutput } from 'unified/lib';
export type MdxBundlerOptions = {
  unifiedOptions?: Plugin[];
};
export type MdxBundlerResultType<R extends JSX.Element | undefined = undefined> = VFileWithOutput<R>;
type MDXComponentType<T = any> = {
  [key: string]: T;
};
export type MDXComponentPropsType<T = any> = {
  components: MDXComponentType<T>;
  vfile: MdxBundlerResultType;
};
