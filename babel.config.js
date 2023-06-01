module.exports = {
  presets: [
    [require.resolve("@babel/preset-react"), { runtime: "automatic" }],
    [
      require.resolve("@babel/preset-typescript"),
      { allExtensions: true, disallowAmbiguousJSXLike: true, isTSX: true },
    ],
  ],
};
