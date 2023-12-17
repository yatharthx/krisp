type ProjectManifest = {
  theme: "tom-preston";
  basicAuth: {
    username: string;
    password: string;
  };
  website: {
    title: string;
    url: string;
    metadata: {
      title: string;
    };
  };
} & Record<string, any>;
export const fromProjectManifest = (manifest: ProjectManifest) => {
  const { theme, ...restOfManifest } = manifest;
  // TODO: support other themes (and make this dynamic?)
  const isUsingOfficialTheme = theme === "tom-preston";

  return {
    ...restOfManifest,
    theme,
    isUsingOfficialTheme,
  };
};
