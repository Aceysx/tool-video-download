# 视频下载工具 - 开发任务清单

> 基于现有的视频解析API，开发一个支持多平台的视频去水印下载工具

---

## 📊 项目概览

- **目标**: 视频下载工具网站（广告流量变现）
- **核心功能**: 通过输入链接，解析并提供视频下载地址
- **支持平台**: 抖音、TikTok、Instagram、小红书、快手、YouTube等
- **存储方案**: localStorage（客户端缓存）
- **变现模式**: Google AdSense广告

---

## 🎯 第一阶段：项目初始化和清理（预计1-2天）

### 1. 清理 Starter 模板代码

- [ ] 删除示例代码目录 `src/app/(delete-this-and-modify-page.tsx)`
- [ ] 删除不需要的 demo 组件（可选保留常用的）
- [ ] 清理 `src/components/*-demo.tsx` 文件
- [ ] 更新根页面 `src/app/page.tsx` 为简单占位符
- [ ] 删除不需要的图表组件（70+ chart组件）
- [ ] 清理 `src/registry/new-york-v4/blocks` 中的登录和侧边栏示例

### 2. 安装项目依赖

- [ ] 安装 `axios` - HTTP 请求客户端
- [ ] 安装 `next-intl` - 国际化支持
- [ ] 安装 `framer-motion` - 动画效果（可选）
- [ ] 安装 `react-hot-toast` 或使用现有的 `sonner` - Toast 通知
- [ ] 确认已有的依赖：`zod`（表单验证）、`next-themes`（主题切换）

### 3. 配置国际化系统 (next-intl)

- [ ] 创建 `src/i18n/` 目录结构
- [ ] 创建 `src/i18n/config.ts` - 语言配置
- [ ] 创建 `src/i18n/locales/zh-CN.json` - 中文翻译
- [ ] 创建 `src/i18n/locales/en.json` - 英文翻译
- [ ] 创建 `src/i18n/locales/ja.json` - 日文翻译（可选）
- [ ] 创建 `src/i18n/locales/es.json` - 西班牙语翻译（可选）
- [ ] 创建 `src/middleware.ts` - 语言检测中间件
- [ ] 重构 app 目录结构为 `src/app/[locale]/`
- [ ] 移动 `layout.tsx` 和 `page.tsx` 到 `[locale]` 目录
- [ ] 配置语言切换组件

---

## 🔧 第二阶段：核心功能开发（预计3-5天）

### 4. 创建 API 包装层

- [ ] 创建 `src/lib/api/` 目录
- [ ] 创建 `src/lib/api/types.ts` - TypeScript 类型定义
    - [ ] 定义 `VideoParseRequest` 接口
    - [ ] 定义 `VideoInfo` 接口（包含标题、作者、缩略图、下载链接等）
    - [ ] 定义 `VideoParseResponse` 接口
- [ ] 创建 `src/lib/api/video-parser.ts` - API 调用封装
    - [ ] 实现 `parseVideoUrl()` 函数
    - [ ] 实现 `detectPlatform()` 函数（根据URL识别平台）
    - [ ] 配置 API 基础URL和认证
    - [ ] 添加错误处理
    - [ ] 添加超时处理（30秒）

### 5. 实现 localStorage 缓存系统

- [ ] 创建 `src/lib/cache/` 目录
- [ ] 创建 `src/lib/cache/local-storage.ts` - localStorage 封装
    - [ ] 实现 `cacheVideoInfo()` - 缓存视频信息
    - [ ] 实现 `getCachedVideoInfo()` - 获取缓存
    - [ ] 实现 `clearVideoCache()` - 清除缓存
    - [ ] 实现 `clearExpiredCache()` - 清除过期缓存
    - [ ] 设置缓存过期时间（1小时）
    - [ ] 添加缓存大小限制（防止超出 localStorage 限制）
    - [ ] 实现 LRU 淘汰策略（可选）

### 6. 创建平台配置

- [ ] 创建 `src/lib/video/platforms.ts`
    - [ ] 定义支持的平台列表（抖音、TikTok、Instagram等）
    - [ ] 每个平台的正则表达式匹配规则
    - [ ] 平台图标和颜色配置
    - [ ] 平台显示名称（多语言）

### 7. 构建视频下载表单组件

- [ ] 创建 `src/components/video-downloader/` 目录
- [ ] 创建 `download-form.tsx` - 主表单组件
    - [ ] URL 输入框（使用 shadcn/ui Input）
    - [ ] 提交按钮
    - [ ] 加载状态显示
    - [ ] 错误提示显示
    - [ ] 支持的平台标签展示
    - [ ] 表单验证（使用 zod）
    - [ ] 平台自动检测
    - [ ] 集成 localStorage 缓存检查
    - [ ] 调用解析 API
    - [ ] 事件追踪（Google Analytics）

### 8. 构建视频预览组件

- [ ] 创建 `video-preview.tsx` - 视频预览卡片
    - [ ] 视频缩略图显示
    - [ ] 作者信息展示（头像、昵称）
    - [ ] 视频标题和描述
    - [ ] 视频时长显示
    - [ ] 统计信息（播放量、点赞数）
    - [ ] 平台标签
    - [ ] 无水印标识
    - [ ] 下载按钮（标清）
    - [ ] 下载按钮（高清，如果有）
    - [ ] 下载按钮（音频，如果有）
    - [ ] 版权提示文字
    - [ ] 响应式布局
    - [ ] 动画效果

### 9. 创建 API 路由

- [ ] 创建 `src/app/api/video/parse/route.ts`
    - [ ] 实现 POST 请求处理
    - [ ] 验证请求参数（使用 zod）
    - [ ] 调用视频解析 API
    - [ ] 返回标准化的响应
    - [ ] 错误处理和日志记录
    - [ ] CORS 配置（如果需要）

### 10. 创建工具页面

- [ ] 创建 `src/app/[locale]/tools/video-downloader/` 目录
- [ ] 创建 `page.tsx` - 主页面
    - [ ] 页面标题和描述
    - [ ] 集成表单组件
    - [ ] 集成广告位
    - [ ] 使用说明部分
    - [ ] FAQ 部分
    - [ ] 功能特点介绍
    - [ ] 响应式布局
- [ ] 创建 `layout.tsx` - 工具专用布局（可选）
- [ ] 创建 `loading.tsx` - 加载状态
- [ ] 创建 `error.tsx` - 错误边界

---

## 📢 第三阶段：广告集成和变现（预计1天）

### 11. 集成 Google AdSense

- [ ] 创建 `src/components/ads/` 目录
- [ ] 创建 `adsense-script.tsx` - AdSense 脚本加载
    - [ ] 使用 Next.js Script 组件
    - [ ] 配置 `afterInteractive` 策略
    - [ ] 添加 AdSense 客户端 ID
- [ ] 创建 `ad-unit.tsx` - 广告单元组件
    - [ ] 支持不同广告格式（横幅、侧边栏、矩形）
    - [ ] 响应式广告配置
    - [ ] 广告插槽配置
    - [ ] 错误处理
- [ ] 在 layout.tsx 中添加 AdSense 脚本
- [ ] 在工具页面布局广告位
    - [ ] 顶部横幅广告
    - [ ] 左侧边栏广告（桌面端）
    - [ ] 右侧边栏广告（桌面端）
    - [ ] 内容中部广告
    - [ ] 底部横幅广告
- [ ] 测试广告显示（使用测试模式）
- [ ] 创建广告配置文件 `src/lib/ads/config.ts`

### 12. 设置广告策略

- [ ] 定义广告位布局规则
- [ ] 移动端广告适配
- [ ] 广告刷新策略（可选）
- [ ] 广告占位符样式
- [ ] 广告加载失败处理

---

## 🔍 第四阶段：SEO 优化（预计1-2天）

### 13. 配置 SEO 元数据

- [ ] 为工具页面创建 `metadata.ts`
    - [ ] 动态生成 title 和 description
    - [ ] 多语言元数据支持
    - [ ] Keywords 配置
    - [ ] Open Graph 标签
    - [ ] Twitter Card 标签
    - [ ] Canonical URL
    - [ ] 语言替代链接（hreflang）
- [ ] 创建 `opengraph-image.tsx` - 动态 OG 图片生成
- [ ] 创建 `twitter-image.tsx`（可选）

### 14. 添加结构化数据

- [ ] 创建 `src/components/seo/structured-data.tsx`
    - [ ] WebApplication schema
    - [ ] BreadcrumbList schema
    - [ ] FAQPage schema（常见问题）
    - [ ] HowTo schema（使用教程）
    - [ ] AggregateRating schema（可选）
- [ ] 在工具页面集成结构化数据

### 15. 生成 sitemap 和 robots.txt

- [ ] 创建 `src/app/sitemap.ts`
    - [ ] 生成所有语言版本的工具页面
    - [ ] 设置更新频率和优先级
    - [ ] 添加语言替代链接
- [ ] 创建 `src/app/robots.txt`
    - [ ] 允许所有爬虫
    - [ ] 指向 sitemap
    - [ ] 配置爬取延迟（可选）
- [ ] 创建 `src/app/manifest.json` - PWA manifest

### 16. SEO 内容优化

- [ ] 添加 H1 标题（每页一个）
- [ ] 添加 H2、H3 小标题
- [ ] 编写功能特点说明（列表形式）
- [ ] 编写使用教程（步骤说明）
- [ ] 添加 FAQ 常见问题
    - [ ] 如何下载抖音视频？
    - [ ] 下载的视频有水印吗？
    - [ ] 是否需要注册？
    - [ ] 支持哪些平台？
    - [ ] 可以商用吗？
- [ ] 添加相关工具推荐（未来扩展）

---

## 📊 第五阶段：分析和追踪（预计半天）

### 17. 集成 Google Analytics

- [ ] 创建 `src/components/analytics/` 目录
- [ ] 创建 `google-analytics.tsx` - GA4 脚本
- [ ] 在 layout.tsx 中集成
- [ ] 配置事件追踪
    - [ ] 页面访问
    - [ ] 视频解析成功
    - [ ] 视频解析失败
    - [ ] 视频下载点击
    - [ ] 平台分布统计
    - [ ] 用户停留时间

### 18. 集成 Vercel Analytics

- [ ] 添加 `<Analytics />` 组件（已有依赖）
- [ ] 添加 `<SpeedInsights />` 组件
- [ ] 在 layout.tsx 中集成

### 19. 自定义事件追踪

- [ ] 创建 `src/lib/analytics/tracking.ts`
    - [ ] `trackToolUsage()` - 工具使用追踪
    - [ ] `trackDownload()` - 下载追踪
    - [ ] `trackError()` - 错误追踪
    - [ ] `trackAdImpression()` - 广告展示追踪（可选）

---

## 🎨 第六阶段：用户体验优化（预计1-2天）

### 20. 添加加载状态

- [ ] 创建 `loading.tsx` 页面级加载状态
- [ ] 使用 Skeleton 组件显示加载占位
- [ ] 表单提交时的 loading 动画
- [ ] 视频解析进度提示
- [ ] 按钮禁用状态

### 21. 完善错误处理

- [ ] 创建 `error.tsx` - 错误边界
- [ ] 创建 `not-found.tsx` - 404 页面
- [ ] 友好的错误提示信息
    - [ ] 空链接错误
    - [ ] 无效链接错误
    - [ ] 不支持的平台错误
    - [ ] 解析失败错误
    - [ ] 网络错误
    - [ ] 超时错误
- [ ] 错误重试机制
- [ ] 错误上报（Sentry 可选）

### 22. 添加用户反馈

- [ ] Toast 通知（成功、失败）
- [ ] 复制链接功能
- [ ] 下载成功提示
- [ ] Loading spinner 动画
- [ ] 表单验证提示

### 23. 移动端优化

- [ ] 响应式布局测试
- [ ] 移动端广告位调整
- [ ] 触摸手势优化
- [ ] 移动端导航优化
- [ ] 输入框自动聚焦（移动端谨慎使用）
- [ ] 下载按钮大小适配
- [ ] 缩略图尺寸优化

### 24. 性能优化

- [ ] 图片懒加载
- [ ] 使用 Next.js Image 组件
- [ ] 代码分割检查
- [ ] Bundle 大小分析（使用已有的 bundle-analyzer）
- [ ] 移除未使用的依赖
- [ ] localStorage 大小监控
- [ ] 清理过期缓存策略
- [ ] 优化首屏加载时间

### 25. 添加动画效果

- [ ] 页面进入动画
- [ ] 视频预览卡片动画
- [ ] 按钮悬停效果
- [ ] 加载动画
- [ ] 过渡动画（使用 framer-motion）

---

## 🏠 第七阶段：完善网站结构（预计1-2天）

### 26. 创建首页

- [ ] 创建 `src/app/[locale]/page.tsx`
- [ ] 设计首页布局
    - [ ] Hero 区域（大标题、描述）
    - [ ] 支持平台展示
    - [ ] 功能特点卡片
    - [ ] 快速开始入口
    - [ ] 用户评价（可选）
    - [ ] 使用统计（可选）
- [ ] 添加首页广告位
- [ ] 首页 SEO 优化

### 27. 创建导航栏

- [ ] 创建 `src/components/layout/navbar.tsx`
- [ ] Logo 和网站名称
- [ ] 导航链接
    - [ ] 首页
    - [ ] 工具（下拉菜单，未来多工具）
    - [ ] 博客（可选）
    - [ ] 关于
- [ ] 语言切换器
- [ ] 主题切换器（已有）
- [ ] 移动端汉堡菜单

### 28. 创建页脚

- [ ] 创建 `src/components/layout/footer.tsx`
- [ ] 网站信息
- [ ] 快速链接
- [ ] 法律链接
- [ ] 社交媒体链接（可选）
- [ ] 版权声明
- [ ] ICP 备案号（如果部署中国）

### 29. 添加法律页面

- [ ] 创建 `src/app/[locale]/legal/` 目录
- [ ] 创建 `privacy-policy/page.tsx` - 隐私政策
- [ ] 创建 `terms-of-service/page.tsx` - 服务条款
- [ ] 创建 `disclaimer/page.tsx` - 免责声明
- [ ] 创建 `cookie-policy/page.tsx` - Cookie 政策
- [ ] 添加法律页面的多语言翻译
- [ ] 添加更新日期

### 30. 创建关于页面

- [ ] 创建 `src/app/[locale]/about/page.tsx`
- [ ] 网站介绍
- [ ] 功能说明
- [ ] 联系方式
- [ ] 开发者信息（可选）

---

## 🛡️ 第八阶段：安全和限流（预计半天）

### 31. 实现客户端速率限制

- [ ] 创建 `src/lib/rate-limit/client-limit.ts`
- [ ] 基于 localStorage 的请求计数
- [ ] 每个用户每天限制请求次数（如 50 次）
- [ ] 显示剩余请求次数
- [ ] 超出限制的友好提示
- [ ] 重置时间倒计时

### 32. 添加安全措施

- [ ] 验证输入的 URL 格式
- [ ] 防止 XSS 攻击
- [ ] CSP（内容安全策略）配置
- [ ] 环境变量保护（API 密钥）
- [ ] HTTPS 强制（生产环境）

### 33. 数据隐私保护

- [ ] 不记录用户输入的 URL（服务端）
- [ ] 缓存数据只存在客户端
- [ ] 添加隐私声明
- [ ] Cookie 同意提示（欧盟合规）

---

## 🧪 第九阶段：测试和调试（预计1-2天）

### 34. 功能测试

- [ ] 测试各平台视频解析
    - [ ] 抖音短链接和长链接
    - [ ] TikTok 链接
    - [ ] Instagram Reels
    - [ ] 小红书链接
    - [ ] 快手链接
    - [ ] YouTube Shorts
- [ ] 测试不同视频类型
    - [ ] 普通视频
    - [ ] 长视频
    - [ ] 图集（如果支持）
- [ ] 测试错误场景
    - [ ] 无效链接
    - [ ] 已删除视频
    - [ ] 私密视频
    - [ ] 限制访问视频

### 35. 浏览器兼容性测试

- [ ] Chrome（桌面端和移动端）
- [ ] Safari（桌面端和移动端）
- [ ] Firefox
- [ ] Edge
- [ ] 测试 localStorage 支持
- [ ] 测试无痕模式

### 36. 设备测试

- [ ] iPhone（不同尺寸）
- [ ] Android 手机
- [ ] iPad / 平板
- [ ] 桌面浏览器（不同分辨率）
- [ ] 触摸屏笔记本

### 37. 性能测试

- [ ] Lighthouse 评分
    - [ ] 性能 > 90
    - [ ] 可访问性 > 90
    - [ ] 最佳实践 > 90
    - [ ] SEO > 90
- [ ] Core Web Vitals
    - [ ] LCP < 2.5s
    - [ ] FID < 100ms
    - [ ] CLS < 0.1
- [ ] 移动端性能
- [ ] 慢速网络测试

### 38. SEO 检查

- [ ] Google Search Console 验证
- [ ] 元标签完整性检查
- [ ] Open Graph 预览
- [ ] Twitter Card 预览
- [ ] 结构化数据验证（Google Rich Results Test）
- [ ] Sitemap 提交
- [ ] robots.txt 验证

---

## 🚀 第十阶段：部署和上线（预计半天）

### 39. 配置部署环境

- [ ] 创建 `.env.example` 文件
- [ ] 配置环境变量
    - [ ] `NEXT_PUBLIC_VIDEO_API_URL`
    - [ ] `VIDEO_API_KEY`
    - [ ] `NEXT_PUBLIC_ADSENSE_ID`
    - [ ] `NEXT_PUBLIC_GA_ID`
    - [ ] `NEXT_PUBLIC_APP_URL`
- [ ] 配置 Vercel 项目
- [ ] 设置生产环境变量
- [ ] 配置自定义域名
- [ ] 配置 SSL 证书

### 40. 部署检查清单

- [ ] 生产环境构建测试
- [ ] 环境变量验证
- [ ] API 连接测试
- [ ] AdSense 脚本验证
- [ ] Analytics 验证
- [ ] 移除所有 console.log
- [ ] 移除测试代码
- [ ] 检查 .gitignore

### 41. 部署到 Vercel

- [ ] 连接 GitHub 仓库
- [ ] 配置构建设置
- [ ] 首次部署
- [ ] 验证部署结果
- [ ] 测试生产环境功能
- [ ] 设置部署预览（PR）

### 42. 域名和 DNS 配置

- [ ] 购买域名
- [ ] 配置 DNS 记录
- [ ] 配置 Vercel 域名
- [ ] 验证 SSL 证书
- [ ] 配置 www 重定向
- [ ] 测试域名访问

---

## 📈 第十一阶段：上线后优化（持续）

### 43. SEO 优化和推广

- [ ] 提交网站到 Google Search Console
- [ ] 提交网站到 Bing Webmaster Tools
- [ ] 提交 sitemap
- [ ] 创建 Google My Business（可选）
- [ ] 社交媒体账号创建
- [ ] 内容营销计划

### 44. 数据监控

- [ ] 设置 Google Analytics 仪表板
- [ ] 监控流量来源
- [ ] 监控用户行为
- [ ] 监控转化率（下载点击）
- [ ] 监控广告收入
- [ ] 设置警报通知

### 45. 用户反馈收集

- [ ] 添加反馈表单
- [ ] 添加在线客服（可选）
- [ ] 创建用户调查
- [ ] 收集功能建议
- [ ] 监控用户投诉

### 46. 功能迭代

- [ ] 添加更多平台支持
- [ ] 添加批量下载（未来）
- [ ] 添加视频编辑功能（未来）
- [ ] 添加用户账户系统（可选）
- [ ] 添加下载历史记录
- [ ] 添加收藏功能
- [ ] 添加分享功能

### 47. 性能持续优化

- [ ] 监控 Core Web Vitals
- [ ] 优化图片加载
- [ ] 优化广告加载
- [ ] 优化缓存策略
- [ ] 监控错误率
- [ ] 优化 API 响应时间

---

## 🌏 第十二阶段：国际化扩展（可选）

### 48. 添加更多语言

- [ ] 日语翻译
- [ ] 西班牙语翻译
- [ ] 法语翻译
- [ ] 德语翻译
- [ ] 韩语翻译
- [ ] 泰语翻译
- [ ] 印尼语翻译

### 49. 多地区 SEO

- [ ] 各语言版本的 SEO 优化
- [ ] 各地区关键词研究
- [ ] 本地化内容策略
- [ ] 各地区的反向链接建设

---

## 📝 附加任务

### 50. 文档和注释

- [ ] 添加代码注释
- [ ] 编写 README.md
- [ ] 编写开发文档
- [ ] 编写 API 文档
- [ ] 编写部署文档

### 51. 代码质量

- [ ] ESLint 检查通过
- [ ] Prettier 格式化
- [ ] TypeScript 类型检查
- [ ] 移除未使用的导入
- [ ] 代码审查

### 52. 备份和恢复

- [ ] 配置自动备份
- [ ] 准备回滚计划
- [ ] 数据导出功能（localStorage）

---

## ⚠️ 重要注意事项

### 法律和版权

- ⚠️ 添加明确的免责声明
- ⚠️ 说明仅供个人学习使用
- ⚠️ 提醒用户尊重原作者版权
- ⚠️ 避免商业用途的误导

### 广告政策

- ⚠️ 遵守 Google AdSense 政策
- ⚠️ 不要放置过多广告
- ⚠️ 确保广告不影响用户体验
- ⚠️ 避免诱导点击

### 技术限制

- ⚠️ localStorage 有 5-10MB 大小限制
- ⚠️ 需要定期清理过期缓存
- ⚠️ 视频平台可能更新反爬策略
- ⚠️ API 可能有调用限制

---

## 📅 预计时间表

- **第一阶段**: 1-2天
- **第二阶段**: 3-5天
- **第三阶段**: 1天
- **第四阶段**: 1-2天
- **第五阶段**: 0.5天
- **第六阶段**: 1-2天
- **第七阶段**: 1-2天
- **第八阶段**: 0.5天
- **第九阶段**: 1-2天
- **第十阶段**: 0.5天

**总计**: 约 10-15 个工作日（MVP 版本）

---

## 🎯 优先级标记

- 🔴 **P0 - 核心功能（必须）**: 任务 4-10, 31
- 🟡 **P1 - 重要功能（推荐）**: 任务 11-18, 20-23, 26-30, 39-42
- 🟢 **P2 - 优化功能（建议）**: 任务 19, 24-25, 32-38, 43-47
- 🔵 **P3 - 未来扩展（可选）**: 任务 48-52

---

最后更新：2025-10-04
