import path from "node:path";

const cwd = process.cwd();
const krispRoot = path.resolve(__dirname, ".."); // since the file from 'dist' will be called
const projectRoot = path.resolve(cwd, process.argv[2] || ".");

type Paths = {
  cwd: string;
  project: {
    root: string;
    content: string;
    public: string;
    pages: string;
  };
  krisp: {
    root: string;
    themes: {
      "tom-preston": string;
    };
  };
};
export const paths: Paths = {
  cwd,
  project: {
    root: projectRoot,
    content: path.join(projectRoot, "content"),
    public: path.join(projectRoot, "public"),
    pages: path.join(projectRoot, "pages"),
  },
  krisp: {
    root: krispRoot,
    themes: {
      "tom-preston": path.join(krispRoot, "themes/tom-preston"),
    },
  },
};

export const makePaths = () => paths;
