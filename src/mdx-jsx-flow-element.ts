/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { toHast } from 'mdast-util-to-hast';

export const mdxJsxFlowElement = (state: any, node: { attributes: any[]; name: any; children: any }, parent: any) => {
  const props: any = {};
  node.attributes.forEach((attribute: { name: any; value: any }) => {
    props[attribute.name] = attribute.value;
  });
  const currentTag = toHast({
    type: 'root',
    data: {
      hName: node.name,
      hProperties: props,
      hChildren: node.children,
    },
    children: [],
  });
  return Array.isArray(currentTag) ? currentTag[0] : currentTag;
};
