import { BlogPost } from './types';
import { blogPosts as zhTW } from './zh-TW';
import { blogPosts as en } from './en';
import { blogPosts as zhCN } from './zh-CN';
import { blogPosts as ja } from './ja';
import { blogPosts as ko } from './ko';
import { blogPosts as es } from './es';

const blogData: Record<string, BlogPost[]> = {
    'zh-TW': zhTW,
    'en': en,
    'zh-CN': zhCN,
    'ja': ja,
    'ko': ko,
    'es': es,
};

export const getBlogPosts = (lang: string = 'en'): BlogPost[] => {
    // Handle case sensitivity (e.g. zh-TW vs zh-tw)
    const normalizedLang = Object.keys(blogData).find(key => key.toLowerCase() === lang.toLowerCase());
    return blogData[normalizedLang || 'en'] || en;
};

export const getBlogPost = (id: string, lang: string = 'en'): BlogPost | undefined => {
    const posts = getBlogPosts(lang);
    return posts.find(post => post.id === id);
};
