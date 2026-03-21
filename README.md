# Zellij Theme Maker

一个在线的 Zellij 主题编辑器，可以实时调整颜色并导出 KDL 格式的主题文件。

## 功能

- 🎨 实时颜色编辑器
- 👁️ 终端预览
- 📝 KDL 代码导出
- 📋 复制到剪贴板
- 📥 导入/导出 KDL 文件

## 开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000 查看应用。

## 构建

```bash
npm run build
npm start
```

## 技术栈

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- react-colorful (颜色选择器)

## 项目结构

```
├── app/
│   ├── page.tsx          # 主页面（单体实现）
│   ├── layout.tsx        # 布局
│   └── globals.css       # 全局样式
└── package.json
```

## 预设主题

- **Synthwave 84** - 霓虹复古风格
- **Dracula** - 紫色调暗色主题
- **Nord** - 蓝灰色冷色调主题
- **Catppuccin** - 粉紫色调柔和主题

## Zellij 主题格式

Zellij 主题使用 KDL 格式，包含以下 UI 组件：

- text_unselected / text_selected
- ribbon_unselected / ribbon_selected
- table_title / table_cell_unselected / table_cell_selected
- list_unselected / list_selected
- frame_unselected / frame_selected / frame_highlight
- exit_code_success / exit_code_error

每个组件有 5 个颜色属性：
- base
- background
- emphasis_0 / emphasis_1 / emphasis_2 / emphasis_3
