"use client";
// @ts-nocheck

import React, { useState, useRef } from 'react';

// === 辅助工具函数 ===
const rgbToHex = (r: number, g: number, b: number) => "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);

const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0, 0];
};

const rgbStr = (arr: number[]) => `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;

// === 预设主题数据 ===
const PRESETS = {
  'synthwave-84': {
    text_unselected: { base: [241, 233, 240], background: [36, 27, 47], emphasis_0: [249, 42, 173], emphasis_1: [114, 241, 184], emphasis_2: [190, 150, 210], emphasis_3: [249, 126, 114] },
    text_selected: { base: [114, 241, 184], background: [36, 27, 47], emphasis_0: [249, 42, 173], emphasis_1: [114, 241, 184], emphasis_2: [199, 146, 234], emphasis_3: [249, 126, 114] },
    ribbon_unselected: { base: [190, 185, 215], background: [65, 45, 85], emphasis_0: [220, 95, 165], emphasis_1: [85, 205, 215], emphasis_2: [180, 140, 230], emphasis_3: [240, 160, 90] },
    ribbon_selected: { base: [30, 20, 40], background: [249, 42, 173], emphasis_0: [30, 20, 40], emphasis_1: [114, 241, 184], emphasis_2: [199, 146, 234], emphasis_3: [249, 126, 114] },
    frame_unselected: { base: [98, 59, 127], background: [36, 27, 47], emphasis_0: [249, 42, 173], emphasis_1: [114, 241, 184], emphasis_2: [190, 150, 210], emphasis_3: [249, 126, 114] },
    frame_selected: { base: [114, 241, 184], background: [36, 27, 47], emphasis_0: [249, 42, 173], emphasis_1: [114, 241, 184], emphasis_2: [199, 146, 234], emphasis_3: [249, 126, 114] },
    frame_highlight: { base: [114, 241, 184], background: [36, 27, 47], emphasis_0: [249, 42, 173], emphasis_1: [114, 241, 184], emphasis_2: [199, 146, 234], emphasis_3: [249, 126, 114] },
    table_title: { base: [249, 126, 114], background: [36, 27, 47], emphasis_0: [249, 42, 173], emphasis_1: [114, 241, 184], emphasis_2: [199, 146, 234], emphasis_3: [249, 126, 114] },
    table_cell_unselected: { base: [241, 233, 240], background: [36, 27, 47], emphasis_0: [249, 42, 173], emphasis_1: [114, 241, 184], emphasis_2: [190, 150, 210], emphasis_3: [249, 126, 114] },
    table_cell_selected: { base: [249, 42, 173], background: [56, 62, 90], emphasis_0: [249, 42, 173], emphasis_1: [114, 241, 184], emphasis_2: [199, 146, 234], emphasis_3: [249, 126, 114] },
    list_unselected: { base: [190, 150, 210], background: [36, 27, 47], emphasis_0: [249, 42, 173], emphasis_1: [114, 241, 184], emphasis_2: [190, 150, 210], emphasis_3: [249, 126, 114] },
    list_selected: { base: [114, 241, 184], background: [56, 62, 90], emphasis_0: [249, 42, 173], emphasis_1: [114, 241, 184], emphasis_2: [199, 146, 234], emphasis_3: [249, 126, 114] },
    exit_code_success: { base: [114, 241, 184], background: [36, 27, 47], emphasis_0: [249, 42, 173], emphasis_1: [114, 241, 184], emphasis_2: [199, 146, 234], emphasis_3: [249, 126, 114] },
    exit_code_error: { base: [249, 126, 114], background: [36, 27, 47], emphasis_0: [249, 42, 173], emphasis_1: [114, 241, 184], emphasis_2: [199, 146, 234], emphasis_3: [249, 126, 114] },
    multiplayer_user_colors: { player_1: [249, 42, 173], player_2: [114, 241, 184], player_3: [190, 150, 210], player_4: [249, 126, 114], player_5: [0, 240, 255], player_6: [255, 140, 0], player_7: [138, 43, 226], player_8: [0, 255, 127], player_9: [255, 215, 0], player_10: [255, 20, 147] }
  },
  'dracula': {
    text_unselected: { base: [248, 248, 242], background: [40, 42, 54], emphasis_0: [255, 121, 198], emphasis_1: [189, 147, 249], emphasis_2: [139, 233, 253], emphasis_3: [80, 250, 123] },
    text_selected: { base: [255, 255, 255], background: [68, 71, 90], emphasis_0: [255, 121, 198], emphasis_1: [189, 147, 249], emphasis_2: [139, 233, 253], emphasis_3: [80, 250, 123] },
    ribbon_unselected: { base: [98, 114, 164], background: [40, 42, 54], emphasis_0: [255, 121, 198], emphasis_1: [189, 147, 249], emphasis_2: [139, 233, 253], emphasis_3: [80, 250, 123] },
    ribbon_selected: { base: [189, 147, 249], background: [68, 71, 90], emphasis_0: [255, 121, 198], emphasis_1: [189, 147, 249], emphasis_2: [139, 233, 253], emphasis_3: [80, 250, 123] },
    frame_unselected: { base: [98, 114, 164], background: [40, 42, 54], emphasis_0: [255, 121, 198], emphasis_1: [189, 147, 249], emphasis_2: [139, 233, 253], emphasis_3: [80, 250, 123] },
    frame_selected: { base: [189, 147, 249], background: [40, 42, 54], emphasis_0: [255, 121, 198], emphasis_1: [189, 147, 249], emphasis_2: [139, 233, 253], emphasis_3: [80, 250, 123] },
    frame_highlight: { base: [255, 121, 198], background: [40, 42, 54], emphasis_0: [255, 121, 198], emphasis_1: [189, 147, 249], emphasis_2: [139, 233, 253], emphasis_3: [80, 250, 123] },
    table_title: { base: [255, 255, 255], background: [40, 42, 54], emphasis_0: [255, 121, 198], emphasis_1: [189, 147, 249], emphasis_2: [139, 233, 253], emphasis_3: [80, 250, 123] },
    table_cell_unselected: { base: [248, 248, 242], background: [40, 42, 54], emphasis_0: [255, 121, 198], emphasis_1: [189, 147, 249], emphasis_2: [139, 233, 253], emphasis_3: [80, 250, 123] },
    table_cell_selected: { base: [255, 255, 255], background: [68, 71, 90], emphasis_0: [255, 121, 198], emphasis_1: [189, 147, 249], emphasis_2: [139, 233, 253], emphasis_3: [80, 250, 123] },
    list_unselected: { base: [248, 248, 242], background: [40, 42, 54], emphasis_0: [255, 121, 198], emphasis_1: [189, 147, 249], emphasis_2: [139, 233, 253], emphasis_3: [80, 250, 123] },
    list_selected: { base: [255, 255, 255], background: [68, 71, 90], emphasis_0: [255, 121, 198], emphasis_1: [189, 147, 249], emphasis_2: [139, 233, 253], emphasis_3: [80, 250, 123] },
    exit_code_success: { base: [80, 250, 123], background: [40, 42, 54], emphasis_0: [80, 250, 123], emphasis_1: [80, 250, 123], emphasis_2: [80, 250, 123], emphasis_3: [80, 250, 123] },
    exit_code_error: { base: [255, 85, 85], background: [40, 42, 54], emphasis_0: [255, 85, 85], emphasis_1: [255, 85, 85], emphasis_2: [255, 85, 85], emphasis_3: [255, 85, 85] },
    multiplayer_user_colors: { player_1: [255, 121, 198], player_2: [80, 250, 123], player_3: [189, 147, 249], player_4: [139, 233, 253], player_5: [241, 250, 140], player_6: [255, 85, 85], player_7: [248, 248, 242], player_8: [98, 114, 164], player_9: [68, 71, 90], player_10: [40, 42, 54] }
  },
  'nord': {
    text_unselected: { base: [216, 222, 233], background: [46, 52, 64], emphasis_0: [143, 188, 187], emphasis_1: [129, 161, 193], emphasis_2: [94, 129, 172], emphasis_3: [191, 97, 106] },
    text_selected: { base: [229, 233, 240], background: [59, 66, 82], emphasis_0: [143, 188, 187], emphasis_1: [129, 161, 193], emphasis_2: [94, 129, 172], emphasis_3: [191, 97, 106] },
    ribbon_unselected: { base: [94, 129, 172], background: [46, 52, 64], emphasis_0: [143, 188, 187], emphasis_1: [129, 161, 193], emphasis_2: [94, 129, 172], emphasis_3: [191, 97, 106] },
    ribbon_selected: { base: [129, 161, 193], background: [59, 66, 82], emphasis_0: [143, 188, 187], emphasis_1: [129, 161, 193], emphasis_2: [94, 129, 172], emphasis_3: [191, 97, 106] },
    frame_unselected: { base: [76, 86, 106], background: [46, 52, 64], emphasis_0: [143, 188, 187], emphasis_1: [129, 161, 193], emphasis_2: [94, 129, 172], emphasis_3: [191, 97, 106] },
    frame_selected: { base: [129, 161, 193], background: [46, 52, 64], emphasis_0: [143, 188, 187], emphasis_1: [129, 161, 193], emphasis_2: [94, 129, 172], emphasis_3: [191, 97, 106] },
    frame_highlight: { base: [143, 188, 187], background: [46, 52, 64], emphasis_0: [143, 188, 187], emphasis_1: [129, 161, 193], emphasis_2: [94, 129, 172], emphasis_3: [191, 97, 106] },
    table_title: { base: [229, 233, 240], background: [46, 52, 64], emphasis_0: [143, 188, 187], emphasis_1: [129, 161, 193], emphasis_2: [94, 129, 172], emphasis_3: [191, 97, 106] },
    table_cell_unselected: { base: [216, 222, 233], background: [46, 52, 64], emphasis_0: [143, 188, 187], emphasis_1: [129, 161, 193], emphasis_2: [94, 129, 172], emphasis_3: [191, 97, 106] },
    table_cell_selected: { base: [229, 233, 240], background: [59, 66, 82], emphasis_0: [143, 188, 187], emphasis_1: [129, 161, 193], emphasis_2: [94, 129, 172], emphasis_3: [191, 97, 106] },
    list_unselected: { base: [216, 222, 233], background: [46, 52, 64], emphasis_0: [143, 188, 187], emphasis_1: [129, 161, 193], emphasis_2: [94, 129, 172], emphasis_3: [191, 97, 106] },
    list_selected: { base: [229, 233, 240], background: [59, 66, 82], emphasis_0: [143, 188, 187], emphasis_1: [129, 161, 193], emphasis_2: [94, 129, 172], emphasis_3: [191, 97, 106] },
    exit_code_success: { base: [143, 188, 187], background: [46, 52, 64], emphasis_0: [143, 188, 187], emphasis_1: [143, 188, 187], emphasis_2: [143, 188, 187], emphasis_3: [143, 188, 187] },
    exit_code_error: { base: [191, 97, 106], background: [46, 52, 64], emphasis_0: [191, 97, 106], emphasis_1: [191, 97, 106], emphasis_2: [191, 97, 106], emphasis_3: [191, 97, 106] },
    multiplayer_user_colors: { player_1: [143, 188, 187], player_2: [129, 161, 193], player_3: [94, 129, 172], player_4: [191, 97, 106], player_5: [216, 222, 233], player_6: [229, 233, 240], player_7: [76, 86, 106], player_8: [59, 66, 82], player_9: [46, 52, 64], player_10: [0, 0, 0] }
  },
  'catppuccin': {
    text_unselected: { base: [186, 194, 222], background: [30, 30, 46], emphasis_0: [242, 205, 205], emphasis_1: [245, 224, 220], emphasis_2: [203, 166, 247], emphasis_3: [250, 179, 135] },
    text_selected: { base: [245, 224, 220], background: [49, 50, 68], emphasis_0: [242, 205, 205], emphasis_1: [245, 224, 220], emphasis_2: [203, 166, 247], emphasis_3: [250, 179, 135] },
    ribbon_unselected: { base: [137, 180, 250], background: [30, 30, 46], emphasis_0: [242, 205, 205], emphasis_1: [245, 224, 220], emphasis_2: [203, 166, 247], emphasis_3: [250, 179, 135] },
    ribbon_selected: { base: [245, 224, 220], background: [49, 50, 68], emphasis_0: [242, 205, 205], emphasis_1: [245, 224, 220], emphasis_2: [203, 166, 247], emphasis_3: [250, 179, 135] },
    frame_unselected: { base: [137, 180, 250], background: [30, 30, 46], emphasis_0: [242, 205, 205], emphasis_1: [245, 224, 220], emphasis_2: [203, 166, 247], emphasis_3: [250, 179, 135] },
    frame_selected: { base: [245, 224, 220], background: [30, 30, 46], emphasis_0: [242, 205, 205], emphasis_1: [245, 224, 220], emphasis_2: [203, 166, 247], emphasis_3: [250, 179, 135] },
    frame_highlight: { base: [250, 179, 135], background: [30, 30, 46], emphasis_0: [242, 205, 205], emphasis_1: [245, 224, 220], emphasis_2: [203, 166, 247], emphasis_3: [250, 179, 135] },
    table_title: { base: [245, 224, 220], background: [30, 30, 46], emphasis_0: [242, 205, 205], emphasis_1: [245, 224, 220], emphasis_2: [203, 166, 247], emphasis_3: [250, 179, 135] },
    table_cell_unselected: { base: [186, 194, 222], background: [30, 30, 46], emphasis_0: [242, 205, 205], emphasis_1: [245, 224, 220], emphasis_2: [203, 166, 247], emphasis_3: [250, 179, 135] },
    table_cell_selected: { base: [245, 224, 220], background: [49, 50, 68], emphasis_0: [242, 205, 205], emphasis_1: [245, 224, 220], emphasis_2: [203, 166, 247], emphasis_3: [250, 179, 135] },
    list_unselected: { base: [186, 194, 222], background: [30, 30, 46], emphasis_0: [242, 205, 205], emphasis_1: [245, 224, 220], emphasis_2: [203, 166, 247], emphasis_3: [250, 179, 135] },
    list_selected: { base: [245, 224, 220], background: [49, 50, 68], emphasis_0: [242, 205, 205], emphasis_1: [245, 224, 220], emphasis_2: [203, 166, 247], emphasis_3: [250, 179, 135] },
    exit_code_success: { base: [166, 227, 161], background: [30, 30, 46], emphasis_0: [166, 227, 161], emphasis_1: [166, 227, 161], emphasis_2: [166, 227, 161], emphasis_3: [166, 227, 161] },
    exit_code_error: { base: [242, 205, 205], background: [30, 30, 46], emphasis_0: [242, 205, 205], emphasis_1: [242, 205, 205], emphasis_2: [242, 205, 205], emphasis_3: [242, 205, 205] },
    multiplayer_user_colors: { player_1: [242, 205, 205], player_2: [245, 224, 220], player_3: [203, 166, 247], player_4: [250, 179, 135], player_5: [137, 180, 250], player_6: [186, 194, 222], player_7: [245, 224, 220], player_8: [49, 50, 68], player_9: [30, 30, 46], player_10: [0, 0, 0] }
  }
};

export default function Home() {
  const [currentPreset, setCurrentPreset] = useState('synthwave-84');
  const [themeName, setThemeName] = useState('synthwave-84');
  const [theme, setTheme] = useState(PRESETS['synthwave-84']);

  // 复制反馈状态
  const [isCopied, setIsCopied] = useState(false);

  // Modal 状态
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState("");
  const [importUrl, setImportUrl] = useState("");
  const [isFetchingUrl, setIsFetchingUrl] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // === 交互函数 ===
  const handleColorChange = (group: string, key: string, hexValue: string) => {
    setTheme((prev: any) => ({
      ...prev,
      [group]: { ...prev[group], [key]: hexToRgb(hexValue) }
    }));
  };

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setCurrentPreset(val);
    if (PRESETS[val]) {
      setThemeName(val);
      setTheme(JSON.parse(JSON.stringify(PRESETS[val])));
    }
  };

  const getKDLString = () => {
    let kdl = `themes {\n  "${themeName}" {\n`;
    Object.keys(theme).forEach(group => {
      kdl += `    ${group} {\n`;
      Object.keys(theme[group]).forEach(key => {
        const rgb = theme[group][key];
        kdl += `      ${key} ${rgb[0]} ${rgb[1]} ${rgb[2]}\n`;
      });
      kdl += `    }\n`;
    });
    kdl += "  }\n}\n";
    return kdl;
  };

  const exportKDL = () => {
    const kdl = getKDLString();
    const blob = new Blob([kdl], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${themeName}.kdl`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 增强版复制方案，添加 execCommand 降级处理
  const copyKDL = async () => {
    const text = getKDLString();
    try {
      await navigator.clipboard.writeText(text);
      triggerCopySuccess();
    } catch (err) {
      // 降级使用 document.execCommand 应对 iframe 限制
      const textArea = document.createElement("textarea");
      textArea.value = text;
      // 使其不可见
      textArea.style.position = "absolute";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        triggerCopySuccess();
      } catch (e) {
        console.error("Fallback copy failed", e);
      }
      document.body.removeChild(textArea);
    }
  };

  const triggerCopySuccess = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // KDL 解析逻辑
  const processImportedText = (text: string) => {
    const newTheme = JSON.parse(JSON.stringify(theme)); // 打底

    // 提取主题名字
    const nameMatch = text.match(/themes\s*\{\s*["']?([^"'\s\{]+)["']?\s*\{/);
    if (nameMatch && nameMatch[1] && nameMatch[1] !== 'themes') {
       setThemeName(nameMatch[1]);
       setCurrentPreset('custom');
    }

    Object.keys(newTheme).forEach(group => {
      // 提取 group 块
      const regex = new RegExp(`${group}\\s*\\{([^\\}]+)\\}`, 's');
      const match = text.match(regex);
      if (match) {
        const block = match[1];
        Object.keys(newTheme[group]).forEach(key => {
          const lineRegex = new RegExp(`${key}\\s+(\\d+)\\s+(\\d+)\\s+(\\d+)`);
          const lineMatch = block.match(lineRegex);
          if (lineMatch) {
            newTheme[group][key] = [parseInt(lineMatch[1]), parseInt(lineMatch[2]), parseInt(lineMatch[3])];
          }
        });
      }
    });
    setTheme(newTheme);
    setShowImportModal(false);
    setImportText("");
    setImportUrl("");
  };

  const readFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setImportText(text);
    } catch (err) {
      console.error("Clipboard read failed", err);
      // 将报错写进输入框中提醒用户手动粘贴
      setImportText("Clipboard access denied by browser security policies. Please press Ctrl+V / Cmd+V to paste manually.");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      setImportText(evt.target?.result as string);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // 从远程 URL 获取 KDL，包含 GitHub Blob 自动转换逻辑
  const fetchFromUrl = async () => {
    if (!importUrl.trim()) return;
    setIsFetchingUrl(true);
    try {
      let finalUrl = importUrl.trim();
      // 自动转换 GitHub 常规页面链接为 raw 链接以解决跨域问题
      if (finalUrl.includes('github.com') && finalUrl.includes('/blob/')) {
        finalUrl = finalUrl.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
      }

      const res = await fetch(finalUrl);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const text = await res.text();
      setImportText(text);
    } catch (error) {
      setImportText(`Failed to load from URL.\nError: ${error.message}\nMake sure the URL supports CORS or is a raw GitHub link.`);
    } finally {
      setIsFetchingUrl(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-900 text-gray-200 font-sans">

      {/* 导入弹窗 Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-2xl border border-gray-600 flex flex-col space-y-4">
            <h2 className="text-xl font-bold text-white">Import KDL Configuration</h2>

            <div className="flex space-x-2">
              <input
                type="text"
                value={importUrl}
                onChange={(e) => setImportUrl(e.target.value)}
                placeholder="Enter raw URL (e.g. github blob link)"
                className="flex-1 bg-gray-950 text-gray-300 px-3 py-2 rounded text-sm border border-gray-700 focus:outline-none focus:border-pink-500"
              />
              <button
                onClick={fetchFromUrl}
                disabled={isFetchingUrl}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-sm rounded transition-colors"
              >
                {isFetchingUrl ? "Loading..." : "Fetch URL"}
              </button>
            </div>

            <p className="text-xs text-gray-400">Or paste your KDL text manually below:</p>

            <textarea
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder="Paste KDL content here..."
              className="w-full h-56 bg-gray-950 text-gray-300 p-3 rounded font-mono text-xs border border-gray-700 focus:outline-none focus:border-pink-500"
            />

            <div className="flex justify-between items-center pt-2">
              <div className="flex space-x-2">
                <button onClick={readFromClipboard} className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors">
                  Paste from Clipboard
                </button>
                <button onClick={() => fileInputRef.current.click()} className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors">
                  Load Local File
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".kdl,.txt"
                />
              </div>
              <div className="flex space-x-2">
                <button onClick={() => setShowImportModal(false)} className="px-4 py-1.5 bg-transparent hover:text-white text-gray-400 rounded text-sm transition-colors">
                  Cancel
                </button>
                <button onClick={() => processImportedText(importText)} className="px-4 py-1.5 bg-pink-600 hover:bg-pink-500 text-white rounded font-bold text-sm transition-colors">
                  Apply Import
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 左侧：编辑器面板 */}
      <div className="w-1/3 min-w-[320px] max-w-md bg-gray-800 flex flex-col border-r border-gray-700 overflow-hidden relative z-50">
        <div className="p-4 bg-gray-900 border-b border-gray-700 flex flex-col space-y-3">
          {/* 动态主题颜色的标题 */}
          <h1
            className="text-xl font-bold bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(to right, ${rgbStr(theme.text_selected.emphasis_0)}, ${rgbStr(theme.text_selected.emphasis_1)})` }}
          >
            Zellij Theme Maker
          </h1>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Preset:</span>
            <select
              value={currentPreset}
              onChange={handlePresetChange}
              className="flex-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:border-pink-500"
            >
              <option value="synthwave-84">Synthwave 84</option>
              <option value="dracula">Dracula</option>
              <option value="nord">Nord</option>
              <option value="catppuccin">Catppuccin</option>
              <option value="custom" disabled hidden>Custom</option>
            </select>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {Object.keys(theme).map(group => (
            <div key={group} className="bg-gray-750 rounded p-3 bg-gray-900 shadow-inner">
              <h2 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">{group.replace('_', ' ')}</h2>
              <div className="grid grid-cols-2 gap-3">
                {Object.keys(theme[group]).map(key => {
                  const rgbArr = theme[group][key];
                  const hexStr = rgbToHex(rgbArr[0], rgbArr[1], rgbArr[2]);
                  return (
                    <div key={`${group}-${key}`} className="flex items-center space-x-2">
                      <div className="relative w-8 h-8 rounded overflow-hidden border border-gray-600 shrink-0">
                        <input
                          type="color"
                          value={hexStr}
                          onChange={(e) => {
                            setCurrentPreset('custom');
                            handleColorChange(group, key, e.target.value);
                          }}
                          className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer"
                        />
                      </div>
                      <span className="text-xs text-gray-300 truncate" title={key}>{key}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 底部功能区按钮组 */}
        <div className="p-4 bg-gray-900 border-t border-gray-700 flex flex-col space-y-2">
          {/* 动态主题颜色的导出按钮 */}
          <button
            onClick={exportKDL}
            className="w-full py-2.5 rounded font-bold shadow-lg transition-transform active:scale-[0.98]"
            style={{
              backgroundColor: rgbStr(theme.ribbon_selected.background),
              color: rgbStr(theme.ribbon_selected.base)
            }}
          >
            Export KDL (Save As)
          </button>

          <div className="flex space-x-2 w-full pt-1">
             <button
               onClick={copyKDL}
               className={`flex-1 py-1.5 text-sm rounded transition-colors ${isCopied ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`}
             >
               {isCopied ? "Copied!" : "Copy KDL"}
             </button>
             <button
               onClick={() => setShowImportModal(true)}
               className="flex-1 py-1.5 bg-gray-700 hover:bg-gray-600 text-sm text-gray-200 rounded transition-colors"
             >
               Import KDL...
             </button>
          </div>
        </div>
      </div>

      {/* 右侧：实时预览面板 */}
      <div className="flex-1 bg-black p-4 flex items-center justify-center overflow-auto shadow-inner">

        {/* 直接展示 Zellij 面板，增加 min-w-[800px] 防止内部元素被过度挤压 */}
        <div
          className="w-full min-w-[800px] max-w-6xl aspect-video flex flex-col overflow-hidden font-mono text-sm relative shadow-2xl"
          style={{ backgroundColor: rgbStr(theme.text_unselected.background) }}
        >

          {/* Top Bar (Ribbons) - 减小高度为 h-5，设置背景色为 text_unselected.background */}
          <div
            className="flex h-5 shrink-0 w-full text-xs whitespace-nowrap"
            style={{ backgroundColor: rgbStr(theme.text_unselected.background) }}
          >
            <div
              className="px-4 flex items-center font-bold z-20 [clip-path:polygon(0_0,calc(100%-10px)_0,100%_50%,calc(100%-10px)_100%,0_100%)] pr-5 pl-3"
              style={{ backgroundColor: rgbStr(theme.text_unselected.background), color: rgbStr(theme.text_unselected.base) }}
            >
              Zellij (test)
            </div>
            {/* 通过将负边距由 -ml-[10px] 调整为 -ml-[8px] 制造间隔 */}
            <div
              className="px-6 flex items-center font-bold z-10 [clip-path:polygon(10px_50%,0_0,calc(100%-10px)_0,100%_50%,calc(100%-10px)_100%,0_100%)] pr-5 pl-6 -ml-[8px]"
              style={{ backgroundColor: rgbStr(theme.ribbon_selected.background), color: rgbStr(theme.ribbon_selected.base) }}
            >
              Tab #1
            </div>

            {/* 移除 border-b 边框 */}
            <div className="flex-1"></div>

            {/* Top Right Sync/Mode indicator */}
            <div className="flex items-center text-xs ml-auto">
               <span style={{ color: rgbStr(theme.ribbon_selected.background) }} className="mr-2">Alt {"<[]>"}</span>
               <div
                 className="flex items-center font-bold h-full shrink-0 [clip-path:polygon(10px_50%,0_0,calc(100%-10px)_0,100%_50%,calc(100%-10px)_100%,0_100%)] pr-5 pl-6"
                 style={{ backgroundColor: rgbStr(theme.ribbon_unselected.background), color: rgbStr(theme.ribbon_unselected.base) }}
               >
                 SPREAD
               </div>
            </div>
          </div>

          {/* Main Background Terminal (带有 Zellij 面板边框) - 移除 pt-3 消除间距 */}
          <div className="flex-1 p-[1px] relative z-0 flex flex-col min-h-0">
            <div className="flex-1 border relative" style={{ borderColor: rgbStr(theme.frame_unselected.base) }}>
               <div className="absolute top-0 left-2 -translate-y-1/2 px-1 text-xs whitespace-nowrap" style={{ backgroundColor: rgbStr(theme.text_selected.background), color: rgbStr(theme.frame_unselected.base) }}>
                   botmiao@botmiao:~
               </div>
               <div className="p-3 flex items-center space-x-2 whitespace-nowrap">
                 <span className="text-[#00f0ff] font-bold">~</span>
                 <span style={{ color: rgbStr(theme.text_selected.emphasis_1) }} className="font-bold">❯</span>
               </div>
            </div>
          </div>

          {/* Floating Pane (Centered) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <div
              className="w-3/4 max-w-[650px] min-w-[480px] bg-opacity-95 rounded border shadow-2xl pointer-events-auto flex flex-col relative"
              style={{
                backgroundColor: rgbStr(theme.text_selected.background),
                borderColor: rgbStr(theme.frame_highlight.base),
              }}
            >
              {/* Floating Pane Header (居中压住边框) */}
              <div className="absolute top-0 left-0 w-full flex justify-between items-center px-4 -translate-y-1/2 text-xs whitespace-nowrap">
                 <div className="flex items-center space-x-1">
                    <span className="px-1" style={{ color: rgbStr(theme.frame_selected.base), backgroundColor: rgbStr(theme.text_selected.background) }}> Configuration </span>
                 </div>
                 <div className="flex items-center" style={{ color: rgbStr(theme.frame_selected.base), backgroundColor: rgbStr(theme.text_selected.background) }}>
                    <span className="px-1">PIN [ ]</span>
                 </div>
              </div>

              {/* Floating Pane Content - 减小高度，优化为鱼骨状面包屑 */}
              <div className="p-4 pt-4 text-sm flex flex-col space-y-4" style={{ color: rgbStr(theme.text_unselected.base) }}>
                {/* Breadcrumb row */}
                <div className="flex items-center text-xs font-bold whitespace-nowrap overflow-hidden">
                  <span style={{ color: rgbStr(theme.text_selected.emphasis_3) }} className="mr-2">{"<TAB>"}</span>
                  <div className="flex items-center">
                    <span
                      className="flex items-center h-6 z-20 [clip-path:polygon(0_0,calc(100%-10px)_0,100%_50%,calc(100%-10px)_100%,0_100%)] pr-4 pl-3"
                      style={{ backgroundColor: rgbStr(theme.ribbon_unselected.background), color: rgbStr(theme.ribbon_unselected.base) }}
                    >
                      Rebind leader keys
                    </span>
                    <span
                      className="flex items-center h-6 z-10 [clip-path:polygon(10px_50%,0_0,calc(100%-10px)_0,100%_50%,calc(100%-10px)_100%,0_100%)] pr-4 pl-6 -ml-[8px]"
                      style={{ backgroundColor: rgbStr(theme.ribbon_selected.background), color: rgbStr(theme.ribbon_selected.base) }}
                    >
                      Change mode behavior
                    </span>
                  </div>
                </div>

                <div style={{ color: rgbStr(theme.text_selected.emphasis_2) }} className="pt-2 whitespace-nowrap">
                  Override keybindings with one of the following presets:
                </div>

                {/* Preset Option 1 */}
                <div
                  className="pl-4 py-2 rounded whitespace-nowrap"
                  style={{ backgroundColor: rgbStr(theme.list_selected.background), color: rgbStr(theme.text_selected.base) }}
                >
                  <div style={{ color: rgbStr(theme.text_selected.base) }}>{"> 1. Default"}</div>
                  <div className="pl-4" style={{ color: rgbStr(theme.text_selected.base) }}>- All modes available directly from the base mode, eg.:</div>
                  <div className="pl-4 flex space-x-2">
                    <span>-</span>
                    <span style={{ color: rgbStr(theme.text_selected.emphasis_3) }}>Ctrl p</span>
                    <span>- to enter</span>
                    <span style={{ color: rgbStr(theme.text_selected.emphasis_2) }}>PANE</span>
                    <span>mode</span>
                  </div>
                  <div className="pl-4 flex space-x-2">
                    <span>-</span>
                    <span style={{ color: rgbStr(theme.text_selected.emphasis_3) }}>Ctrl t</span>
                    <span>- to enter</span>
                    <span style={{ color: rgbStr(theme.text_selected.emphasis_2) }}>TAB</span>
                    <span>mode</span>
                  </div>
                </div>

                {/* Preset Option 2 */}
                <div className="pl-4 whitespace-nowrap" style={{ color: rgbStr(theme.text_unselected.base) }}>
                  <div>{"> 2. Unlock First (non-colliding)"}</div>
                  <div className="pl-4">- Single key modes available after unlocking with Ctrl g, eg.:</div>
                  <div className="pl-4 flex space-x-2">
                    <span>-</span>
                    <span style={{ color: rgbStr(theme.text_selected.emphasis_3) }}>Ctrl g + p</span>
                    <span>- to enter PANE mode</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center space-x-2 text-xs whitespace-nowrap" style={{ color: rgbStr(theme.text_unselected.base) }}>
                  <span>Leader keys:</span>
                  <span style={{ color: rgbStr(theme.text_selected.emphasis_3) }}>Ctrl</span>
                  <span>- modes,</span>
                  <span style={{ color: rgbStr(theme.text_selected.emphasis_0) }}>Alt</span>
                  <span>- quicknav and shortcuts</span>
                </div>
              </div>

              {/* Floating Pane Footer */}
              <div
                className="mt-auto p-2 text-xs flex items-center space-x-2 border-t border-dashed whitespace-nowrap overflow-hidden"
                style={{ color: rgbStr(theme.text_unselected.base), borderColor: rgbStr(theme.frame_unselected.base) }}
              >
                 <span>Help: </span>
                 <span>{"<↓↑> - navigate,"}</span>
                 <span>{"<ENTER> - apply,"}</span>
                 <span>{"<Ctrl a> - apply & save,"}</span>
                 <span>{"<ESC> - close"}</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar (Shortcuts) - 设置背景色为 text_unselected.background */}
          <div
            className="flex h-6 shrink-0 w-full text-xs font-bold items-center justify-between z-10 whitespace-nowrap"
            style={{ backgroundColor: rgbStr(theme.text_unselected.background) }}
          >
             <div className="flex h-full items-center">
                <div
                  className="flex items-center h-full shrink-0 z-50 [clip-path:polygon(0_0,calc(100%-10px)_0,100%_50%,calc(100%-10px)_100%,0_100%)] pr-4 pl-3"
                  style={{ backgroundColor: rgbStr(theme.text_unselected.background), color: rgbStr(theme.text_unselected.base) }}
                >
                  Ctrl +
                </div>

                {/* Shortcut items */}
                {[
                  { key: 'g', label: 'LOCK' },
                  { key: 'p', label: 'PANE' },
                  { key: 't', label: 'TAB' },
                  { key: 'n', label: 'RESIZE' },
                  { key: 'h', label: 'MOVE' },
                  { key: 's', label: 'SEARCH' },
                  { key: 'o', label: 'SESSION' },
                  { key: 'q', label: 'QUIT' }
                ].map((sc, index) => (
                  <div
                    key={sc.key}
                    className="flex items-center h-full shrink-0 [clip-path:polygon(10px_50%,0_0,calc(100%-10px)_0,100%_50%,calc(100%-10px)_100%,0_100%)] pr-4 pl-6 -ml-[8px]"
                    style={{
                      color: rgbStr(theme.ribbon_unselected.base),
                      backgroundColor: rgbStr(theme.ribbon_unselected.background),
                      zIndex: 40 - index
                    }}
                  >
                    <span>{"<"}</span>
                    <span style={{ color: rgbStr(theme.ribbon_unselected.emphasis_0) }}>{sc.key}</span>
                    <span>{">"}</span>
                    <span className="ml-1">{sc.label}</span>
                  </div>
                ))}
             </div>

             <div className="flex h-full items-center shrink-0">
                <span style={{ color: rgbStr(theme.text_selected.emphasis_0) }} className="mr-2 z-30 font-bold">Alt +</span>
                <div
                  className="flex items-center h-full shrink-0 z-20 [clip-path:polygon(0_0,calc(100%-10px)_0,100%_50%,calc(100%-10px)_100%,0_100%)] pr-4 pl-3"
                  style={{ backgroundColor: rgbStr(theme.ribbon_unselected.background), color: rgbStr(theme.ribbon_unselected.base) }}
                >
                   <span>{"<"}</span>
                   <span style={{ color: rgbStr(theme.ribbon_unselected.emphasis_0) }}>n</span>
                   <span>{">"}</span>
                   <span className="ml-1">New Pane</span>
                </div>
                <div
                  className="flex items-center h-full shrink-0 z-10 [clip-path:polygon(10px_50%,0_0,calc(100%-10px)_0,100%_50%,calc(100%-10px)_100%,0_100%)] pr-4 pl-6 -ml-[8px]"
                  style={{ backgroundColor: rgbStr(theme.ribbon_selected.background), color: rgbStr(theme.ribbon_selected.base) }}
                >
                  <span>{"<"}</span>
                  <span style={{ color: rgbStr(theme.ribbon_selected.emphasis_0) }}>f</span>
                  <span>{">"}</span>
                  <span className="ml-1">Floating</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
