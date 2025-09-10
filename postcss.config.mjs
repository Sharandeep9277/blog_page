const config = {
  plugins: [
    "@tailwindcss/postcss",
    ...(process.env.NODE_ENV === 'production'
      ? [
          [
            '@fullhuman/postcss-purgecss',
            {
              content: [
                './pages/**/*.{js,jsx,ts,tsx}',
                './components/**/*.{js,jsx,ts,tsx}',
                './app/**/*.{js,jsx,ts,tsx}',
                './src/**/*.{js,jsx,ts,tsx}',
              ],
              defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
              safelist: [
                // Preserve dynamic classes and important utilities
                /^bg-/,
                /^text-/,
                /^border-/,
                /^hover:/,
                /^focus:/,
                /^active:/,
                // Add any custom classes you need to preserve
                'mv-hero-image',
                'mv-left',
                'mv-right',
              ],
            },
          ],
        ]
      : []),
  ],
};

export default config;