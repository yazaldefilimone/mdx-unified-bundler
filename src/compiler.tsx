/* eslint-disable @typescript-eslint/no-explicit-any */
import { unified } from 'unified';
import mdx from 'remark-mdx';
import React from 'react';
import remarkRehype from 'remark-rehype';
import { MdxSourceType, MdxBundlerOptions, MDXComponentPropsType } from './types';
import remarkParse from 'remark-parse';
import rehypeParse from 'rehype-parse';
import { mdxJsxFlowElement } from './mdx-jsx-flow-element';
import rehypeReact from 'rehype-react';
import * as _jsx_runtime from 'react/jsx-runtime';

type OptionsType = MdxBundlerOptions & {
  components: MDXComponentPropsType['components'];
};

const cache = new Map();
function jsx(type: any, props: any, key: any) {
  const lowercase = typeof type === 'string' ? type.toLowerCase() : '';
  if (lowercase && cache.has(lowercase)) {
    const Component = cache.get(lowercase);
    return <Component {...props} />;
  }
  // @ts-expect-error: the react types are missing.
  return _jsx_runtime.jsx(type, props, key);
}
// @ts-expect-error: the react types are missing.
const runtime = { Fragment: _jsx_runtimce.Fragment, jsx, jsxs: _jsx_runtime.jsxs };

export async function MdxServerUnifiedBundler(source: MdxSourceType, options?: OptionsType): Promise<JSX.Element> {
  const unifiedOptions = options?.unifiedOptions ?? [];
  const components = options?.components ?? {};
  const optionsCompiler = {
    components: components,
    ...runtime,
  };
  const processor = unified()
    .use(remarkRehype, {
      allowDangerousHtml: true,
      handlers: {
        mdxJsxFlowElement,
      },
    })
    .use(rehypeParse, {
      fragment: true,
    })
    .use(remarkParse)
    .use(mdx);
  for (const unifiedOption of unifiedOptions) {
    processor.use(unifiedOption);
  }

  Object.keys(components).forEach((key) => {
    if (key.toLowerCase() === key) {
      return;
    }
    cache.set(key.toLowerCase(), components[key]);
  });
  const compiler = processor.use(rehypeParse, { fragment: true }).use(rehypeReact, optionsCompiler);

  const result = await compiler.process(source);

  return result.result;
}
