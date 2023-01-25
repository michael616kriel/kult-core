export default {
  presets: ['@babel/preset-env', { targets: { node: 'current' } }],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          core: './core',
          utils: './utils',
        },
      },
    ],
  ],
};
