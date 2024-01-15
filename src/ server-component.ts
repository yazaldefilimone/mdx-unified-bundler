import rehypeReact from 'rehype-react';
import rehypeParse from 'rehype-parse';
import { unified } from 'unified';
import { MDXComponentPropsType, MdxBundlerResultType } from './types';
import { runtime } from './runtime';

export async function MdxClientUnifiedBundler(props: MDXComponentPropsType) {
  const codeReact = await createRehypeReactProcessor(props.vfile, props.components);
  return codeReact;
}

async function createRehypeReactProcessor(code: MdxBundlerResultType, components: MDXComponentPropsType['components']) {
  const options = {
    components,
    ...runtime,
  };
  const processor = await unified().use(rehypeParse, { fragment: true }).use(rehypeReact, options).process(code);
  return processor.result;
}
