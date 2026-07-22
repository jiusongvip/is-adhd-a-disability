# isadhdadisability.com — 行动计划

**审计日期**: 2026-07-22  
**综合评分**: 72 / 100  
**总问题数**: 27 | Critical: 3 | High: 10 | Medium: 11 | Low: 3

---

## Phase 1: 紧急修复（第 1 周）

### 🔴 Critical

| # | 问题 | 修复 | 影响 | 工作量 |
|---|------|------|------|--------|
| 1 | **Sitemap 冲突** — `public/sitemap.xml` 覆盖 Astro 自动生成的 sitemap，且自引用造成死循环 | 删除 `public/sitemap.xml` | 搜索引擎可能无法发现任何页面 | 5 min |
| 2 | **域名未解析** — DNS 不配置，站点完全不可访问 | 配置 DNS + 部署到 Cloudflare Pages / Vercel | 零收录 | 30 min |
| 3 | **全站零图片** — 无 OG Image、无博客配图、无信息图 | 添加默认 OG Image + 博客配图 | 社交分享无预览、Google Images 零流量 | 2 hr |

### 🟠 High

| # | 问题 | 修复 | 影响 | 工作量 |
|---|------|------|------|--------|
| 4 | **FAQ 页面重复渲染** — `faq.astro` 第 52-54 行将全部 FAQ 渲染两次 | 删除其中一个 map 块 | 重复内容惩罚风险 | 5 min |
| 5 | **Cache-Control 禁用缓存** — meta 标签设置 no-cache | 移除 3 个 cache meta 标签 | LCP 差、回访慢 | 2 min |
| 6 | **无 404 页面** | 创建 `src/pages/404.astro` | 用户体验差 | 30 min |
| 7 | **Google Fonts 渲染阻塞** — 加载 5 个字重 | 本地化字体或减至 3 个字重 | LCP 瓶颈 | 30 min |
| 8 | **5 页面无 Schema** | 为 /workplace, /rights, /accommodations, /by-country, /section-504 添加 schema | 无法获得富摘要 | 1 hr |
| 9 | **E-E-A-T 信号缺失** | 添加 author/reviewer + About/Contact 页 | 法律内容排名受限 | 2 hr |
| 10 | **无权威外链** | 添加 .gov 来源链接 | E-E-A-T 弱 + AI 引用差 | 1 hr |

---

## Phase 2: 高影响改进（第 2-3 周）

### 🟡 Medium

| # | 问题 | 修复 | 影响 | 工作量 |
|---|------|------|------|--------|
| 11 | **Title 逻辑缺陷** — 几乎所有标题含 "ADHD"，品牌后缀永远不添加 | 简化为 `${title} \| Is ADHD a Disability` | 品牌一致性 | 30 min |
| 12 | **缺少 OG 元标签** — og:url, og:site_name, og:locale | 补充到 BaseLayout | 社交分享不完整 | 15 min |
| 13 | **无 WebSite schema** | 添加 WebSite + SearchAction 到首页 | sitelinks searchbox | 30 min |
| 14 | **无 BreadcrumbList schema** | 添加 BreadcrumbList JSON-LD | 面包屑富摘要 | 30 min |
| 15 | **Article schema 不完整** — 缺 author, datePublished, publisher | 补全字段 | 文章富摘要 | 1 hr |
| 16 | **部分页面内容薄** — /workplace ~400 词, /rights ~350 词 | 扩展到 800+ 词 | 排名竞争力弱 | 3 hr |
| 17 | **博客仅 3 篇** | 制定内容计划，定期发布 | 新鲜度信号弱 | 持续 |
| 18 | **无安全头** | 配置 CDN 层安全响应头 | Safe Browsing 评估 | 30 min |
| 19 | **长文章无 TOC** | 添加锚点 TOC 组件 | 用户体验 + featured snippets | 1 hr |
| 20 | **无 Key Takeaways** | 每页添加摘要块 | AI 搜索引用 | 2 hr |
| 21 | **首页 FAQPage 与 /faq 重复** | 仅在 /faq 保留完整 FAQPage schema | 重复 schema 信号 | 15 min |

---

## Phase 3: AI 搜索优化（第 4 周）

### 🟡 Medium

| # | 问题 | 修复 | 影响 | 工作量 |
|---|------|------|------|--------|
| 22 | **无 llms.txt** | 创建 `/public/llms.txt` | AI 爬虫无法理解站点 | 30 min |
| 23 | **缺少简洁答案段落** | 将 FAQ 答案精简至 30-50 词 | AI 摘要引用 | 2 hr |

### 🟢 Low

| # | 问题 | 修复 | 影响 | 工作量 |
|---|------|------|------|--------|
| 24 | **无 RSS Feed** | 添加 astro-rss 集成 | AI 爬虫无法发现新内容 | 30 min |
| 25 | **favicon.ico + .svg 同时存在** | 删除 ICO，只保留 SVG | 减少一次请求 | 5 min |
| 26 | **面包屑无结构化数据** | 已包含在 #14 | — | — |
| 27 | **hreflang 缺失** | 添加 hreflang + x-default | 仅英文站点影响小 | 15 min |

---

## 预期影响

完成 Phase 1-2 后预估评分提升：

| 指标 | 当前 | Phase 1 后 | Phase 2 后 |
|------|------|-----------|-----------|
| 综合评分 | 72 | 80 | 88 |
| 技术 SEO | 68 | 82 | 88 |
| 内容质量 | 78 | 82 | 88 |
| On-Page SEO | 80 | 88 | 92 |
| Schema | 72 | 85 | 92 |
| AI 就绪度 | 55 | 65 | 80 |
| 图片 | 50 | 80 | 85 |

---

## 建议立即执行的修复（5 分钟内可完成）

```
1. 删除 public/sitemap.xml
2. 修复 faq.astro 重复渲染
3. 移除 BaseLayout 中 Cache-Control meta 标签
```

这三项零风险、高回报，建议现在就开始。
