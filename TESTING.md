# 🧪 测试指南

## 测试准备

### 1. 配置 API

编辑 `.env.local` 文件，填入您的视频解析 API：

```bash
NEXT_PUBLIC_VIDEO_API_URL=https://your-video-api.com
VIDEO_API_KEY=your-api-key-here
```

### 2. 启动开发服务器

```bash
npm run dev
```

## 测试清单

### ✅ 第一阶段：项目初始化

- [x] 示例代码已删除
- [x] 多语言配置正常
- [x] 项目构建成功

### ✅ 第二阶段：核心功能

#### 1. 访问工具页面

打开浏览器访问：

- 中文版：http://localhost:3000/zh-CN/tools/video-downloader
- 英文版：http://localhost:3000/en/tools/video-downloader
- 日文版：http://localhost:3000/ja/tools/video-downloader

#### 2. 测试平台检测

在输入框中粘贴以下测试链接，检查平台是否能正确检测：

**抖音 (Douyin):**

```
https://www.douyin.com/video/1234567890
https://v.douyin.com/abc123/
```

**TikTok:**

```
https://www.tiktok.com/@username/video/1234567890
https://vm.tiktok.com/abc123/
```

**Instagram:**

```
https://www.instagram.com/p/ABC123/
https://www.instagram.com/reel/ABC123/
```

**小红书:**

```
https://www.xiaohongshu.com/explore/abc123
https://xhslink.com/abc123
```

**YouTube:**

```
https://www.youtube.com/watch?v=abc123
https://youtu.be/abc123
https://www.youtube.com/shorts/abc123
```

#### 3. 测试错误处理

- [ ] 空链接提示
- [ ] 无效链接提示
- [ ] 不支持的平台提示
- [ ] API 错误提示

#### 4. 测试缓存功能

- [ ] 第一次解析视频（调用 API）
- [ ] 第二次解析相同视频（使用缓存）
- [ ] 检查浏览器开发者工具 → Application → Local Storage
    - 查看 `video_cache_` 开头的缓存项

#### 5. 测试 UI 响应

- [ ] 桌面端布局正常
- [ ] 平板端布局正常
- [ ] 移动端布局正常
- [ ] 加载状态显示正常
- [ ] 错误提示显示正常

#### 6. 测试下载功能

- [ ] 标清下载按钮可点击
- [ ] 高清下载按钮可点击（如果有）
- [ ] 音频下载按钮可点击（如果有）
- [ ] 下载链接正确打开

#### 7. 测试多语言

- [ ] 切换到英文版，界面翻译正确
- [ ] 切换到日文版，界面翻译正确
- [ ] URL 自动包含语言代码

## 模拟测试（无需真实 API）

如果您还没有配置真实的 API，可以：

### 方案 1：Mock API

修改 `src/app/api/video/parse/route.ts`，添加 mock 数据：

```typescript
// 在文件开头添加
const MOCK_MODE = true;

// 在 POST 函数中，调用 parseVideoUrl 之前添加：
if (MOCK_MODE) {
    return NextResponse.json({
        success: true,
        data: {
            platform: platform,
            title: '测试视频标题',
            author: {
                name: '测试作者',
                avatar: 'https://avatars.githubusercontent.com/u/1?v=4'
            },
            thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
            duration: 120,
            downloadUrls: {
                standard: 'https://example.com/video.mp4',
                hd: 'https://example.com/video-hd.mp4',
                audio: 'https://example.com/audio.mp3'
            },
            watermarkFree: true,
            stats: {
                views: 123456,
                likes: 12345,
                comments: 1234
            },
            description: '这是一个测试视频的描述'
        }
    });
}
```

### 方案 2：使用浏览器开发者工具

1. 打开浏览器开发者工具（F12）
2. Network 标签页
3. 提交视频链接
4. 查看 `/api/video/parse` 请求
5. 检查请求和响应数据

## 常见问题排查

### 问题 1：页面无法访问

**检查**：

- 开发服务器是否正常运行
- 端口 3000 是否被占用
- 浏览器控制台是否有错误

### 问题 2：API 调用失败

**检查**：

- `.env.local` 文件是否正确配置
- API URL 是否可访问
- API 密钥是否有效
- 浏览器控制台 Network 标签查看具体错误

### 问题 3：缓存不工作

**检查**：

- 浏览器是否支持 localStorage
- 是否在隐私模式/无痕模式（可能禁用 localStorage）
- 开发者工具 → Application → Local Storage 是否有数据

### 问题 4：样式显示异常

**检查**：

- 是否正确安装了所有依赖
- Tailwind CSS 是否正常工作
- 浏览器缓存（尝试硬刷新 Ctrl+Shift+R）

## 性能测试

### Lighthouse 评分

在 Chrome 开发者工具中运行 Lighthouse：

- Performance
- Accessibility
- Best Practices
- SEO

### 目标分数

- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

## 下一步测试

完成第二阶段测试后，可以继续：

- **第三阶段**：广告集成
- **第四阶段**：SEO 优化
- **第五阶段**：分析追踪

## 报告问题

如果发现问题，请记录：

1. 问题描述
2. 复现步骤
3. 浏览器和版本
4. 截图或错误信息
5. 控制台日志
