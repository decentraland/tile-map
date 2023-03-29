module.exports = {
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-storysource',
    '@storybook/addon-knobs',
  ],
  framework: '@storybook/react',
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.m?js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env', { targets: 'defaults' }]],
        },
      },
    })

    return config
  },
}
