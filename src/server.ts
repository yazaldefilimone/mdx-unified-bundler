import { unified } from 'unified';
import mdx from 'remark-mdx';
import remarkRehype from 'remark-rehype';
import { MdxBundlerResultType, MdxSourceType, MdxBundlerOptions } from './types';
import remarkParse from 'remark-parse';
import rehypeStringify from 'rehype-stringify';
import rehypeParse from 'rehype-parse';
import { mdxJsxFlowElement } from './mdx-jsx-flow-element';
export async function MdxServerUnifiedBundler(
  source: MdxSourceType,
  options?: MdxBundlerOptions,
): Promise<MdxBundlerResultType> {
  const unifiedOptions = options?.unifiedOptions ?? [];
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
  processor.use(rehypeStringify);
  const vfile = await processor.process(source.trim());
  return vfile;
}
