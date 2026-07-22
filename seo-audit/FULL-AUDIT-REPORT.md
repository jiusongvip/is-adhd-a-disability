# isadhdadisability.com 全站 SEO 审计报告

**审计日期**: 2026-07-22  
**站点**: https://isadhdadisability.com  
**状态**: 域名未解析（站点未上线），基于源代码审计  
**业务类型**: 信息/教育类网站（ADHD 残疾法律指南）  
**技术栈**: Astro 7.x + Tailwind CSS 4.x（静态生成）

---

## 综合评分：72 / 100

| 类别 | 权重 | 得分 | 评级 |
|------|------|------|------|
| 技术 SEO | 22% | 68/100 | ⚠️ 需改进 |
| 内容质量 | 23% | 78/100 | ✅ 良好 |
| On-Page SEO | 20% | 80/100 | ✅ 良好 |
| Schema / 结构化数据 | 10% | 72/100 | ⚠️ 需改进 |
| 性能 (CWV) | 10% | 70/100 | ⚠️ 需改进 |
| AI 搜索就绪度 | 10% | 55/100 | ❌ 薄弱 |
| 图片 | 5% | 50/100 | ❌ 薄弱 |

---

## 一、技术 SEO（68/100）

### ✅ 做得好的

- **Astro 静态生成**：所有页面预渲染为 HTML，爬虫友好
- **trailingSlash: "never"**：URL 规范化一致
- **_redirects 文件**：尾部斜杠 301 重定向已配置
- **robots.txt**：允许所有爬虫，指向 sitemap-index.xml
- **JS 尾部斜杠清理**：BaseLayout 中有 JS fallback 移除尾部斜杠
- **跳过链接**：有 "Skip to content" 无障碍链接
- **lang="en"** 已设置

### ❌ 发现的问题

#### 【Critical】Sitemap 冲突
`public/sitemap.xml` 是手写的 sitemap index，自引用 `sitemap-index.xml`：
```xml
<sitemap>
  <loc>https://isadhdadisability.com/sitemap-index.xml</loc>
</sitemap>
```
而 `@astrojs/sitemap` 自动生成的是 `sitemap-index.xml`。`public/sitemap.xml` 会覆盖自动生成的 sitemap，且它指向的 `sitemap-index.xml` 本身又自引用，造成死循环。

**修复**: 删除 `public/sitemap.xml`，让 `@astrojs/sitemap` 完全控制 sitemap 生成。同时将 `robots.txt` 中的 Sitemap URL 改为 `sitemap-index.xml`（目前已是）。

#### 【High】域名未解析
`isadhdadisability.com` 当前 DNS 不解析。站点无法被搜索引擎收录。

**修复**: 配置 DNS 记录并部署到托管平台（推荐 Cloudflare Pages / Vercel / Netlify）。

#### 【High】无 404 页面
项目中没有自定义 404 页面（无 `404.astro`）。对于静态站点，托管平台通常会显示默认 404，但不利于用户体验和 SEO。

**修复**: 创建 `src/pages/404.astro` 自定义 404 页面。

#### 【Medium】缺少关键 meta 标签
- **og:url**：BaseLayout 中未设置 `og:url`
- **og:site_name**：缺失
- **og:locale**：缺失
- **twitter:site**：缺失（无 Twitter 账号关联）
- **hreflang**：虽然只有英文，但可以加 `hreflang="en"` + `x-default`

#### 【Medium】缺少安全头
HTTP 安全头完全缺失（无 CSP、X-Frame-Options、X-Content-Type-Options 等）。虽然不直接影响 SEO 排名，但影响 Google Safe Browsing 评估。

**修复**: 在托管层配置安全响应头。

#### 【Low】Cache-Control 反 SEO
```html
<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
```
这告诉浏览器不缓存页面，对 Core Web Vitals（尤其是 LCP）有负面影响。

**修复**: 移除这三个 cache meta 标签，改为在 CDN/托管层配置合理的缓存策略。

---

## 二、内容质量（78/100）

### ✅ 做得好的

- **内容覆盖面广**：14 个页面覆盖 ADA、学校、职场、SSDI、Section 504、各国比较、权利清单、住宿指南、FAQ（50+ 问题）、3 篇博客文章
- **内容结构清晰**：每页有明确的 H1 → H2 → H3 层次
- **实用性强**：提供具体的操作步骤（如 504 评估请求流程、SSDI 申请步骤）
- **FAQ 内容丰富**：FAQ 页面有 30+ 个问答，覆盖多个维度
- **免责声明**：每页底部都有法律免责声明
- **无薄内容页面**：每个页面都有实质性内容

### ❌ 发现的问题

#### 【High】E-E-A-T 信号严重不足
- **无作者信息**：所有页面都没有 `author` meta 标签、作者署名或作者简介
- **无审核者信息**：法律/医学内容应标注"经 XX 律师/医生审核"
- **无"关于我们"页面**：缺少 About page 说明网站背景和编辑团队
- **无联系方式**：缺少联系页面和联系信息
- **无外部权威链接**：正文中没有任何外链指向 ADA 原文、EEOC 官网、SSA 官网等权威来源

**修复**: 
1. 添加作者/审核者署名（至少标注"Reviewed by [姓名], [资质]"）
2. 创建 About 页面
3. 创建 Contact 页面
4. 在正文中添加指向 .gov 权威来源的外链

#### 【Medium】内容深度不足
部分页面的核心内容较薄：
- `/workplace` 仅约 400 词
- `/rights` 仅约 350 词
- `/by-country` 每个国家仅 2-3 句话

**修复**: 将 `/workplace` 和 `/rights` 扩展到 800+ 词，增加更多案例和实操建议。

#### 【Medium】博客内容太少
仅 3 篇博客文章。对于一个信息站点来说，持续发布内容对 SEO 至关重要。

#### 【Low】内容缺少更新日期
博客文章有发布日期，但其他核心页面没有"最后更新日期"标记。法律信息应定期更新并标注。

---

## 三、On-Page SEO（80/100）

### ✅ 做得好的

- **每页唯一 H1**：所有 14 个页面都正确使用了唯一 H1
- **Title 标签优化良好**：大多数标题包含目标关键词且长度合适
- **Meta description**：每页都有描述，长度基本合适
- **Canonical URL**：每页都设置了 canonical
- **内链结构合理**：页面之间有交叉链接（首页 → 各子页、博客 → 核心页面）
- **面包屑导航**：所有子页面都有面包屑
- **Header/Footer 导航**：全站统一的主导航和 footer 链接

### ❌ 发现的问题

#### 【High】FAQ 页面重复渲染
`faq.astro` 第 52-54 行将 FAQ 内容渲染了**两次**：
```astro
{/* 第一次渲染 - H2 分类 */}
{faqCategories.map((cat) => (...))}
<h2>Questions by category</h2>
{/* 第二次渲染 - H3 分类（完全重复） */}
{faqCategories.map((cat) => (...))}
```
这导致同样的问答内容在页面上出现两次，Google 可能视为重复/垃圾内容。

**修复**: 删除第一次渲染（第 52 行的 map）或第二次渲染（第 54 行的 map），只保留一份。

#### 【Medium】部分 Title 标签可优化
| 页面 | 当前 Title | 建议 |
|------|-----------|------|
| `/rights` | "ADHD Disability Rights Checklist: ADA, 504, IDEA, Work" | 尾部加 `- Is ADHD a Disability?` |
| `/accommodations` | "ADHD Workplace Accommodations: Complete Guide" | 加品牌后缀 |
| `/by-country` | "Is ADHD a Disability? by Country: US, UK, Canada and More" | OK |
| `/section-504` | "ADHD and Section 504: A Complete Guide" | 加品牌后缀 |

**注意**: `BaseLayout.astro` 中有逻辑判断，如果 title 包含 "ADHD" 则不加品牌后缀。这导致部分页面缺少品牌标识。建议统一添加品牌后缀。

#### 【Medium】缺少 H2 锚点链接
长文章页面（ada、school、ssdi 等）有多个 H2 章节，但没有 table of contents（TOC）或锚点跳转。添加 TOC 可以提升用户体验并帮助 Google 生成 featured snippets。

#### 【Low】面包屑没有结构化数据
面包屑导航只是纯文本 HTML，没有添加 BreadcrumbList schema。

---

## 四、Schema / 结构化数据（72/100）

### ✅ 做得好的

- **FAQPage schema**：首页和 FAQ 页面有 FAQPage 结构化数据
- **Article schema**：博客文章和部分核心页面有 Article schema
- **Blog schema**：博客列表页有 Blog schema 和 BlogPosting 关联

### ❌ 发现的问题

#### 【High】核心页面缺少 schema
- `/workplace`、`/rights`、`/accommodations`、`/by-country`、`/section-504` 没有任何 schema
- `/school` 有 Article schema 但缺少 `author`、`datePublished`
- `/ada` 和 `/ssdi` 有 Article schema 但缺少 `author`、`datePublished`

#### 【Medium】缺少 WebSite schema
首页没有 `WebSite` + `SearchAction` schema，这影响 Google sitelinks search box。

#### 【Medium】缺少 BreadcrumbList schema
所有面包屑导航都没有对应的 BreadcrumbList 结构化数据。

#### 【Medium】Article schema 不完整
```json
{
  "@type": "Article",
  "headline": "...",
  "description": "..."
  // 缺少: author, datePublished, dateModified, publisher, image
}
```

#### 【Low】首页 FAQPage 与 FAQ 页重复
首页和 `/faq` 页面都包含 FAQPage schema，内容高度重复。建议只在 `/faq` 页面保留完整 FAQPage schema。

---

## 五、性能（70/100）

### ✅ 做得好的

- **静态生成**：Astro SSG 输出纯 HTML，首屏快
- **Tailwind CSS 4.x**：自动 tree-shaking，CSS 体积小
- **Inter 字体**：通过 `display=swap` 预连接 Google Fonts
- **无 JavaScript 框架**：零 React/Vue 开销
- **极简 JS**：只有尾部斜杠清理脚本和移动菜单脚本

### ❌ 发现的问题

#### 【High】Google Fonts 阻塞渲染
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```
加载了 5 个字重（400-800），外部字体是 LCP 杀手。

**修复**: 
1. 使用 `@fontsource/inter` 本地化字体，通过 Astro 的 font optimization 内联关键字体
2. 或减少字重到 3 个（400, 600, 700）
3. 使用 `font-display: optional` 代替 `swap`

#### 【Medium】Cache-Control 禁用缓存
如前述，meta 标签禁用了所有缓存，回访用户每次都要重新下载所有资源。

#### 【Low】favicon.ico 和 favicon.svg 同时存在
浏览器会请求两者，多一次 HTTP 请求。建议只保留 SVG 版本（更现代），删除 ICO。

---

## 六、AI 搜索就绪度（55/100）

### ❌ 发现的问题

#### 【High】无 llms.txt
缺少 `/llms.txt` 文件，AI 搜索引擎（ChatGPT Browse、Perplexity）无法快速了解站点结构。

**修复**: 创建 `/public/llms.txt` 描述站点结构和核心内容。

#### 【High】缺少可引用的简洁答案段落
虽然 FAQ 内容丰富，但答案段落较长（50-100 词）。AI 搜索引擎偏好 30-50 词的简洁、可直接引用的答案。

#### 【Medium】无权威来源外链
AI 搜索引擎（特别是 Perplexity）在引用时偏好有权威来源支撑的内容。当前站点没有链接到任何 .gov 或学术来源。

**修复**: 在关键法律声明处添加外链到：
- ADA 原文 (ada.gov)
- EEOC (eeoc.gov)
- SSA (ssa.gov)
- Section 504 原文

#### 【Medium】缺少"Key Takeaway"摘要
每个内容页面缺少开头的 TL;DR / Key Takeaways 区块。这对 AI 搜索摘要非常关键。

#### 【Low】无 RSS Feed
没有 RSS feed，AI 爬虫无法自动发现新内容。

---

## 七、图片（50/100）

### ❌ 发现的问题

#### 【Critical】所有页面零图片
整个站点没有任何 `<img>` 标签：
- 无 OG Image（`ogImage` prop 在 BaseLayout 中默认为空字符串）
- 无博客文章配图
- 无作者头像
- 无信息图表

**影响**:
1. Google Images 搜索流量为零
2. 社交媒体分享无预览图（og:image 缺失）
3. 内容看起来不专业
4. AI Overviews 不倾向引用无图内容

**修复**:
1. 为每篇博客文章添加特色图片（推荐 1200x630）
2. 设置默认 OG Image（至少一张站点品牌图）
3. 为核心页面添加相关插图或信息图（如法律流程图、比较表图）
4. 添加 favicon 的 PNG 版本用于 og:image

---

## 优先行动计划

### 第一阶段：紧急修复（第 1 周）

| # | 任务 | 影响 | 工作量 |
|---|------|------|--------|
| 1 | 删除 `public/sitemap.xml`，让 Astro sitemap 插件接管 | Critical | 5 min |
| 2 | 修复 FAQ 页面重复渲染 | High | 5 min |
| 3 | 移除 Cache-Control meta 标签 | High | 2 min |
| 4 | 配置 DNS 并部署站点 | Critical | 30 min |
| 5 | 添加默认 OG Image | High | 15 min |
| 6 | 创建 404 页面 | High | 30 min |

### 第二阶段：内容增强（第 2-3 周）

| # | 任务 | 影响 | 工作量 |
|---|------|------|--------|
| 7 | 为所有页面添加 author/datePublished schema | High | 1 hr |
| 8 | 添加 About 页面 + Contact 页面 | High | 2 hr |
| 9 | 为核心页面添加权威外链 (.gov) | High | 1 hr |
| 10 | 扩展 workplace/rights 页面内容 | Medium | 3 hr |
| 11 | 添加 WebSite + BreadcrumbList schema | Medium | 1 hr |
| 12 | 优化 Google Fonts 加载策略 | High | 30 min |

### 第三阶段：AI 搜索优化（第 4 周）

| # | 任务 | 影响 | 工作量 |
|---|------|------|--------|
| 13 | 创建 llms.txt | High | 30 min |
| 14 | 为每页添加 Key Takeaways 区块 | Medium | 2 hr |
| 15 | 为博客文章添加配图 | Medium | 2 hr |
| 16 | 添加 RSS Feed | Low | 30 min |
| 17 | 统一 Title 标签品牌后缀 | Low | 30 min |

### 第四阶段：持续迭代

| # | 任务 |
|---|------|
| 18 | 定期发布博客文章（每月 2-4 篇） |
| 19 | 配置安全响应头 |
| 20 | 监控 Core Web Vitals（上线后） |
| 21 | 提交 Google Search Console 和 Bing Webmaster Tools |

---

## 页面清单

| URL | Title | Meta Desc | H1 | Schema | 字数(估) |
|-----|-------|-----------|----|--------|---------|
| `/` | Is ADHD a Disability? ADA, School, Work, SSDI | ✅ | ✅ | FAQPage ✅ | ~600 |
| `/ada` | Is ADHD a Disability Under the ADA? | ✅ | ✅ | Article ⚠️ | ~900 |
| `/school` | Is ADHD a Disability in School? (504, IDEA, IEP Guide) | ✅ | ✅ | Article ⚠️ | ~700 |
| `/workplace` | Is ADHD a Disability at Work? Rights and Accommodations | ✅ | ✅ | ❌ | ~400 |
| `/ssdi` | Can You Get Disability for ADHD? SSDI and SSI Guide | ✅ | ✅ | Article ⚠️ | ~800 |
| `/faq` | Is ADHD a Disability? FAQ: 50+ Questions Answered | ✅ | ✅ | FAQPage ✅ | ~2000 |
| `/rights` | ADHD Disability Rights Checklist: ADA, 504, IDEA, Work | ✅ | ✅ | ❌ | ~350 |
| `/accommodations` | ADHD Workplace Accommodations: Complete Guide | ✅ | ✅ | ❌ | ~600 |
| `/section-504` | ADHD and Section 504: A Complete Guide | ✅ | ✅ | ❌ | ~700 |
| `/by-country` | Is ADHD a Disability? by Country: US, UK, Canada and More | ✅ | ✅ | ❌ | ~500 |
| `/blog` | ADHD Disability Blog: Legal Guides and Updates | ✅ | ✅ | Blog ✅ | ~300 |
| `/blog/myths` | 5 Myths About ADHD and Disability Status Debunked | ✅ | ✅ | Article ⚠️ | ~700 |
| `/blog/doctor-note` | How to Get an ADHD Disability Doctor's Note | ✅ | ✅ | Article ⚠️ | ~700 |
| `/blog/ada-cases` | ADHD and the ADA: Key Court Cases That Changed Everything | ✅ | ✅ | Article ⚠️ | ~600 |

---

## 附录：BaseLayout Title 逻辑问题

```javascript
const siteTitle = "Is ADHD a Disability?";
const fullTitle = title.includes(siteTitle) ? title : `${title} - ${siteTitle}`;
const pageTitle = title.includes(siteTitle) || title.includes("ADHD") ? title : `${title} - ${siteTitle}`;
```

问题：
1. `fullTitle` 变量被定义但**从未使用**（使用了 `pageTitle`）
2. `pageTitle` 逻辑：如果 title 包含 "ADHD" 就不加品牌后缀。但几乎所有标题都包含 "ADHD"，所以品牌后缀永远不会被添加
3. 这导致 `/rights`、`/accommodations`、`/section-504` 等页面没有品牌标识

建议统一为：`${title} | Is ADHD a Disability`
