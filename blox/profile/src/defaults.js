module.exports = (themeOptions) => {
  const basePath = themeOptions.basePath || `/`;
  const dataPath = themeOptions.dataPath || `data/`;

  return {
    basePath,
    dataPath,
  };
};
