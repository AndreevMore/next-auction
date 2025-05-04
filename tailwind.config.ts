import { type Config } from 'tailwindcss';
import blue from 'tailwindcss/colors';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          ...blue,
          100: '#F2F4F6',
          400: '#C0C9D0',
        },
        customBlue: '#C0C9D0',
        customBlueLight: '#F2F4F6',
      },
    },
  },
  plugins: [],
};

export default config;
// TODO
