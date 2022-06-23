import { themes } from '@storybook/theming';
import { addons } from '@storybook/addons';

addons.setConfig({
  theme: {
    ...themes.dark,
    brandImage: 'https://fayevr.dev/icon.svg',
    brandTitle: 'Faye Components',
    brandUrl: 'https://fayevr.dev',
  },
});
