import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm]
  }
}

export async function generateStaticParams() {
  const dirs = ['frontend', 'system-design', 'database', 'LLD'];
  let paths: { slug: string }[] = [];

  for (const dir of dirs) {
    const dirPath = path.join(process.cwd(), 'src', 'content', dir);
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);

      paths = paths.concat(
        files.map((filename) => ({
          slug: filename.replace('.mdx', ''),
        }))
      );
    }
  }

  return paths;
}

export async function generateMetadata({ params } : { params : { slug : string }}) {
  const { frontMatter } = getPost(params);
  return {
    title: frontMatter.title,
    description: frontMatter.description,
  };
}

function getPost({slug}:{slug : string}){
  const directories = ['src/content/frontend', 'src/content/system-design', 'src/content/database', 'src/content/lld'];
  let dir = '';
  for (const _d of directories) {
      if(fs.existsSync(path.join(process.cwd(), _d, slug + '.mdx'))){
          dir = _d;
          break;
      }
  }
  const _path = path.join(process.cwd(), dir);

  const markdownFile = fs.readFileSync(path.join(_path,slug + '.mdx'), 'utf-8');

  const { data: frontMatter, content } = matter(markdownFile);

  return {
    frontMatter,
    slug,
    content
  };
}

export default function Post({ params }: { params : { slug : string } }) {
  const { frontMatter, content } = getPost(params);

  return (
    <article className={`prose prose-sm md:prose-base lg:prose-lg prose-slate max-w-fit pr-16 dark:!prose-invert`}>
      <h1>{frontMatter.title}</h1>
      <MDXRemote source={content} options={options} />
    </article>
  );
}