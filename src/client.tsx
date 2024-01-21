/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import * as _jsx_runtime from 'react/jsx-runtime';
import rehypeReact from 'rehype-react';
import rehypeParse from 'rehype-parse';
import { unified } from 'unified';
import { MdxBundlerResultType } from './types';

// components cache
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
const production = { Fragment: _jsx_runtimce.Fragment, jsx, jsxs: _jsx_runtime.jsxs };
type propsType = {
  components: MDXComponentProps;
  vfile: MdxBundlerResultType;
};
export async function MdxClientUnifiedBundler(props: propsType) {
  const codeReact = await createRehypeReactProcessor(props.vfile, props.components);
  return codeReact;
}

type MDXComponentProps = {
  [key: string]: any;
};

async function createRehypeReactProcessor(code: MdxBundlerResultType, components: MDXComponentProps) {
  const options = {
    ...production,
    components,
  };
  Object.keys(components).forEach((key) => {
    if (key.toLowerCase() === key) {
      return;
    }
    cache.set(key.toLowerCase(), components[key]);
  });
  const processor = await unified()
    .use(rehypeParse, {
      fragment: true,
    })
    .use(rehypeReact, options)
    .process(code);
  return processor.result;
}
