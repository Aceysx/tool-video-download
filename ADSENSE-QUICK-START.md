# Google AdSense 快速开始 🚀

## 📝 简要步骤

### 1. 注册 Google AdSense
访问：https://www.google.com/adsense/
- 使用 Google 账号登录
- 填写网站信息
- 等待审核（1-3 天）

### 2. 获取 AdSense ID
格式：`ca-pub-1234567890123456`
位置：AdSense 后台 → 账号 → 账号信息

### 3. 创建广告单元
AdSense 后台 → 广告 → 按广告单元 → 新建广告单元
- 选择"展示广告"
- 选择"自适应"尺寸
- 获取广告单元 ID（10位数字）

### 4. 配置环境变量
编辑 `.env.local` 文件：

```env
NEXT_PUBLIC_ADSENSE_ID=ca-pub-1234567890123456
```

### 5. 更新广告单元 ID
编辑 `src/app/[locale]/page.tsx`：

找到以下位置并替换广告单元 ID：
```tsx
// 第 145 行左右 - 表单下方的广告
<GoogleAdUnit adSlot='1234567890' />  // 👈 替换这里

// 第 315 行左右 - 页面底部的广告
<GoogleAdUnit adSlot='0987654321' />  // 👈 替换这里
```

### 6. 重启服务器
```bash
npm run dev
```

### 7. 部署到生产环境
```bash
npm run build
npm start
# 或者部署到 Vercel
```

---

## ⚠️ 重要提示

1. **广告不会立即显示**
   - 新广告单元需要 10-30 分钟
   - 开发环境可能显示空白
   - 生产环境部署后才会正常显示

2. **禁止点击自己的广告**
   - 会导致账号被封
   - 永久无法恢复

3. **遵守 AdSense 政策**
   - 详见：`GOOGLE-ADSENSE-GUIDE.md`

---

## 📚 详细文档

完整的配置说明和政策指南请查看：
- `GOOGLE-ADSENSE-GUIDE.md`

---

最后更新: 2025-10-04
