# 图片压缩工具

一个简洁优雅的在线图片压缩工具，采用苹果风格设计，帮助用户轻松压缩图片文件。

## 功能特点

- 支持拖放上传或点击选择图片
- 支持 PNG、JPG 格式图片
- 可调节压缩质量（1-100%）
- 实时预览压缩效果
- 显示压缩前后的文件大小对比
- 一键下载压缩后的图片
- 响应式设计，支持各种设备访问

## 技术实现

- 使用原生 HTML5、CSS3 和 JavaScript
- 使用 FileReader API 处理文件上传
- 使用 Canvas API 实现图片压缩
- 使用 Flexbox 实现响应式布局
- 支持拖放操作的文件上传

## 使用说明

1. 打开网页后，可以通过拖放图片到虚线框内，或点击"选择图片"按钮上传图片
2. 上传后可以看到原图和压缩预览的对比
3. 通过滑块调节压缩质量（默认80%）
4. 确认压缩效果后，点击"下载压缩后的图片"按钮保存

## 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+ 

# WebPractice1 项目部署指南

## Render 部署步骤

1. 注册 Render 账号
   - 访问 https://render.com/
   - 点击 "Get Started" 注册新账号
   - 可以使用 GitHub 账号直接登录

2. 创建新的 Static Site
   - 登录后点击右上角的 "New +"
   - 选择 "Static Site"
   - 如果还没有连接 GitHub，需要先授权连接

3. 配置部署设置
   - 选择你的 webpractice1 仓库
   - 填写以下信息：
     - Name: webpractice1（或你想要的名称）
     - Branch: main（或你的主分支名）
     - Root Directory: 
       * 如果 index.html 在项目根目录，填写 ./
       * 如果 index.html 在 public 文件夹，填写 public
     - Build Command: 留空（因为是静态网页）
     - Publish Directory: 与 Root Directory 保持一致

4. 点击 "Create Static Site"
   - Render 会自动开始部署你的网站
   - 部署完成后，你会获得一个类似 https://your-site-name.onrender.com 的网址

5. 访问部署好的网站
   - 点击 Render 提供的链接即可访问你的网站
   - 每次推送代码到 GitHub，Render 都会自动重新部署

## 注意事项
- 确保所有文件路径使用相对路径
- 检查 index.html 是否在正确的目录中
- 确保所有资源（图片、CSS、JS文件等）都能正确加载