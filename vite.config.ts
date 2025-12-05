import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

// 生成多語言 HTML 文件的插件
function generateLangHtmlPlugin() {
  return {
    name: 'generate-lang-html',
    closeBundle() {
      console.log('\n🌍 生成多語言 HTML 文件...');
      try {
        execSync('node scripts/generate-lang-html.cjs', { stdio: 'inherit' });
      } catch (error) {
        console.error('❌ 生成多語言 HTML 失敗:', error);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), generateLangHtmlPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/', // 使用絕對路徑，確保子路由能正確加載資源
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        404: path.resolve(__dirname, '404.html'),
      },
    },
  },
});

