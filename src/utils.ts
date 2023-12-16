import matter from "gray-matter";
import { marked } from "marked";
import slugify from "slugify";

export const toSlug = (str: string) => {
  const slug = slugify(str.replace(/[_ ]/g, "-"), {
    lower: true,
    strict: true,
    trim: true,
  });
  return slug;
};

export const parseMarkdown = (markdown: string) => {
  const { content, data } = matter(markdown);
  return {
    content,
    meta: data,
  };
};

export const markdownToHtml = (markdown: string) => {
  const html = marked(markdown, { async: false });
  return html;
};
