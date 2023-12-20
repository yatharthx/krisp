import path from "node:path";

import { format } from "date-fns";

import { File } from "./file";
import { Dir } from "./dir";
import { paths } from "@/src/conf";

import { parseMarkdown, markdownToHtml, toSlug } from "@/src/utils";

// get all markdown files (paths) in a directory
const getMarkdownFiles = async (path: string) => {
  const files = await Dir.filesOfType(path, ".md");
  return files;
};

export const getPosts = async () => {
  const contentDir = paths.project.content;
  const contentFiles = await getMarkdownFiles(contentDir);

  const posts = await Promise.all(
    contentFiles.map(async (f) => {
      const postPath = path.join(contentDir, f);
      const postContent = await File.read(postPath);

      const { content, meta } = parseMarkdown(postContent);
      const html = markdownToHtml(content);
      const slug = toSlug(meta.title);

      // readable publish date
      meta.date_of_publish = format(
        new Date(meta.publish_date),
        "LLL dd, yyyy"
      );

      return {
        meta,
        slug,
        html,
      };
    })
  );

  // sort posts by publish date
  // latest first
  const sortedPosts = posts.sort((a, b) => {
    return (
      new Date(b.meta.publish_date).getTime() -
      new Date(a.meta.publish_date).getTime()
    );
  });

  return sortedPosts;
};
