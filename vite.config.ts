import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';

// 自動生成 404.html 的插件（用於 GitHub Pages）
function generate404Plugin() {
  return {
    name: 'generate-404',
    closeBundle() {
      const distPath = path.resolve(__dirname, 'dist');
      const templatePath = path.join(__dirname, '404.html');
      const notFoundPath = path.join(distPath, '404.html');
      
      if (fs.existsSync(templatePath)) {
        fs.copyFileSync(templatePath, notFoundPath);
        console.log('✅ 已生成 404.html（複製自模板）');
      }
    },
  };
}

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
  plugins: [react(), generate404Plugin(), generateLangHtmlPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/', // 使用絕對路徑，確保子路由能正確加載資源
  build: {
    outDir: 'dist',
  },
});

