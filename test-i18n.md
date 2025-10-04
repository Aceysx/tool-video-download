# 国际化测试步骤

## 测试方法：

1. **清除浏览器缓存**
   - 按 Cmd+Shift+Delete (Mac) 或 Ctrl+Shift+Delete (Windows)
   - 或者使用无痕模式 (Cmd+Shift+N / Ctrl+Shift+N)

2. **访问中文页面**
   - 打开：http://localhost:3000 或 http://localhost:3000/zh-CN
   - 应该看到：导航栏显示 "🎬 视频下载工具"
   - 输入框上方显示：视频 🎵 音乐

3. **切换到英文**
   - 点击右上角的语言切换按钮（🌐图标）
   - 选择 "English"
   - URL应该变成：http://localhost:3000/en
   - 应该看到：导航栏显示 "🎬 Video Downloader"
   - 输入框上方显示：Video 🎵 Music

4. **如果还是显示中文**
   - 检查浏览器地址栏的 URL，确保是 /en
   - 强制刷新页面：Cmd+Shift+R (Mac) 或 Ctrl+F5 (Windows)
   - 打开浏览器开发者工具（F12），查看 Console 是否有错误

## 调试命令：

```bash
# 删除构建缓存
rm -rf .next

# 重新启动开发服务器
npm run dev
```

## 配置检查：

✅ middleware.ts - 正确配置
✅ i18n/config.ts - zh-CN, en 两种语言
✅ locales/zh-CN.json - 所有翻译就绪
✅ locales/en.json - 所有翻译就绪
✅ components/layout/navbar.tsx - 使用 t('appName')
✅ components/video-downloader/download-form.tsx - 使用 t('form.video') 和 t('form.music')
