# 🔌 API 集成说明

## API 配置

### 接口地址

```
POST https://firstool.online/parse
```

### 请求格式

```json
{
    "url": "视频链接"
}
```

### 当前状态

✅ API 地址已配置到 `.env.local`
✅ 代码已更新为使用真实 API
✅ Mock 模式已禁用

## 响应数据映射

我们的代码会自动将 API 返回的数据转换为标准格式。

支持以下字段名（从 API 响应中提取）：

**视频信息：**

- `title` / `desc` → 标题
- `author` / `nickname` / `authorName` → 作者名
- `avatar` / `authorAvatar` → 作者头像
- `cover` / `thumbnail` / `coverUrl` → 视频封面

**下载链接：**

- `url` / `videoUrl` / `downloadUrl` → 标清下载
- `hdUrl` / `hdVideoUrl` → 高清下载
- `audioUrl` / `musicUrl` → 音频下载

**统计数据：**

- `playCount` / `views` → 播放量
- `diggCount` / `likes` → 点赞数
- `commentCount` / `comments` → 评论数

**其他：**

- `duration` → 时长（秒）
- `description` / `desc` → 描述
- `createTime` / `createdAt` → 创建时间

## 测试真实 API

### 1. 启动开发服务器

```bash
npm run dev
```

### 2. 访问工具页面

```
http://localhost:3001/zh-CN/tools/video-downloader
```

（注意：端口是 3001，因为 3000 被占用）

### 3. 测试视频链接

尝试输入真实的视频链接：

- 抖音短链接：`https://v.douyin.com/xxxxx/`
- 抖音完整链接：`https://www.douyin.com/video/xxxxx`
- TikTok 链接：`https://www.tiktok.com/@user/video/xxxxx`
- 其他平台链接

### 4. 查看调试信息

打开浏览器开发者工具（F12）：

- **Console** 标签：查看错误信息
- **Network** 标签：查看 `/api/video/parse` 请求
    - 请求参数
    - 响应数据
    - 状态码

## API 响应格式调整

如果 API 返回的数据格式与我们的映射不匹配，请：

1. 在浏览器中测试一个成功的请求
2. 查看 Network 标签中的响应数据
3. 告诉我实际的响应格式
4. 我会更新 `src/lib/api/video-parser.ts` 中的字段映射

## 错误处理

当前支持的错误类型：

- ✅ 超时错误（30秒）
- ✅ 频率限制（429）
- ✅ 视频不存在（404）
- ✅ API 错误消息（message/msg 字段）
- ✅ 网络错误

## 切换回 Mock 模式

如果需要使用 Mock 数据测试 UI：

编辑 `src/app/api/video/parse/route.ts`，修改：

```typescript
const MOCK_MODE = true; // 改为 true
```

## 下一步

1. **测试真实链接**：尝试不同平台的视频
2. **查看响应格式**：确认 API 返回的数据结构
3. **调整字段映射**：如果需要，更新字段对应关系
4. **添加更多平台**：根据 API 支持的平台扩展
