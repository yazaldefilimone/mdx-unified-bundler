/* eslint-disable @typescript-eslint/no-explicit-any */
export type MdxSourceType = string;
import { Plugin } from 'unified';
import { VFileWithOutput } from 'unified/lib';
export type MdxBundlerOptions = {
  unifiedOptions?: Plugin[];
};
export type MdxBundlerResultType = VFileWithOutput<any>;

export type MDXComponentPropsType = {
  components: Record<string, React.ComponentType>;
  vfile: MdxBundlerResultType;
};
