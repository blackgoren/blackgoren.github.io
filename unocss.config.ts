import { defineConfig, presetAttributify, presetUno, transformerDirectives, presetWebFonts } from 'unocss';

export default defineConfig({
  shortcuts: [],
  presets: [
    presetAttributify(),
    presetUno(),
    presetWebFonts({
      fonts: {
        Inter: 'Inter:100,200,300,400,500,600,700',
      },
    }),
  ],
  transformers: [transformerDirectives()],
});
