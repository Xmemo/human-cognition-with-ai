import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const siteUrl = process.env.SITE_URL?.trim() || 'https://xmemo.github.io';
const rawBase = process.env.BASE_PATH?.trim() || '/';
const normalizedBase = rawBase === '/'
  ? '/'
  : `/${rawBase.replace(/^\/+|\/+$/g, '')}`;
const assetBase = normalizedBase === '/' ? '' : normalizedBase;

export default defineConfig({
  site: siteUrl,
  base: normalizedBase,
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'Human Cognition with AI',
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        'zh-cn': { label: '简体中文', lang: 'zh-CN' },
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Xmemo/human-cognition-with-ai',
        },
      ],
      customCss: [
        './src/styles/custom.css',
        './src/styles/observatory-v0-3.css',
        './src/styles/portal-v0-3-1.css',
      ],
      components: {
        Hero: './src/components/ObservatoryHero.astro',
        Head: './src/components/StructuredHead.astro',
        MarkdownContent: './src/components/ObservatoryContent.astro',
      },
      pagefind: true,
      head: [
        { tag: 'link', attrs: { rel: 'icon', type: 'image/svg+xml', href: `${assetBase}/favicon.svg` } },
        { tag: 'meta', attrs: { property: 'og:site_name', content: 'Human Cognition with AI' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'application-name', content: 'Human Cognition with AI' } },
        { tag: 'meta', attrs: { name: 'color-scheme', content: 'light dark' } },
      ],
      sidebar: [
        {
          label: 'Start Here',
          translations: { 'zh-CN': '从这里开始' },
          items: [
            { label: 'Current Baseline', translations: { 'zh-CN': '当前研究基线' }, slug: 'baseline' },
            { label: 'Latest Research', translations: { 'zh-CN': '最新研究' }, slug: 'weekly' },
            { label: 'Research Hub', translations: { 'zh-CN': '研究导航' }, slug: 'research' },
          ],
        },
        {
          label: 'Research Map',
          translations: { 'zh-CN': '研究地图' },
          items: [
            { label: '3×3 Research Map', translations: { 'zh-CN': '3×3 研究地图' }, slug: 'research-map' },
            { label: 'Human Cognitive Change', translations: { 'zh-CN': '人类认知变化' }, slug: 'topics/human-cognitive-change' },
            { label: 'Cognitive Augmentation & Governance', translations: { 'zh-CN': '认知增强与治理' }, slug: 'topics/cognitive-augmentation-governance' },
            { label: 'Machine Culture & Collective Cognition', translations: { 'zh-CN': '机器文化与集体认知' }, slug: 'topics/machine-culture-collective-cognition' },
          ],
        },
        {
          label: 'Evidence',
          translations: { 'zh-CN': '证据与方法' },
          items: [
            { label: 'Search Protocol', translations: { 'zh-CN': '检索协议' }, slug: 'methodology/search-protocol' },
            { label: 'Evidence Grading', translations: { 'zh-CN': '证据分级' }, slug: 'methodology/evidence-grading' },
            { label: 'Bibliography', translations: { 'zh-CN': '参考文献' }, slug: 'references/bibliography' },
          ],
        },
        {
          label: 'People',
          translations: { 'zh-CN': '研究者追踪' },
          items: [
            { label: 'Iyad Rahwan', slug: 'people/iyad-rahwan' },
          ],
        },
      ],
    }),
  ],
});
