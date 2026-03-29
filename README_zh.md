# Zellij Theme Maker

[English](./README.md)

一个基于 Web 的 [Zellij](https://zellij.dev) 主题编辑器，支持实时预览、交互式颜色选择器和 KDL 导出。

![截图](./screenshot/1.png)

## 功能

- 实时颜色编辑，可视化颜色选择器
- 实时终端预览
- 导出为 KDL 格式（复制到剪贴板或下载文件）
- 导入已有的 KDL 主题文件
- 内置预设主题（Synthwave 84、Dracula、Nord、Catppuccin）

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

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- react-colorful

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
