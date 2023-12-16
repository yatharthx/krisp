export const makeEnv = () => {
  const isProduction = process.env.NODE_ENV === "production";
  const isTest = process.env.NODE_ENV === "test";

  return {
    isProduction,
    isTest,
    isDevelopment: !isProduction && !isTest,
    portToUse: process.env.PORT || 3000,
  };
};
