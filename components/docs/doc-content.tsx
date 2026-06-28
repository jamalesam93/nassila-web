import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { MarkdownContent } from './markdown-content'
import { mdxComponents } from './mdx-elements'

type Props = {
  content: string
  format: 'mdx' | 'md'
}

export async function DocContent({ content, format }: Props) {
  if (format === 'md') {
    return <MarkdownContent content={content} />
  }

  const { content: compiled } = await compileMDX({
    source: content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  })

  return <article className="max-w-3xl">{compiled}</article>
}
