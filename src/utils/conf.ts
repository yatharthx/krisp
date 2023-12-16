type ProjectManifest = {
  theme: "tom-preston";
  name: string;
  email: string;
  basicAuth: {
    username: string;
    password: string;
  };
};
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
