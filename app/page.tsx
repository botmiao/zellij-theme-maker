"use client";

import { useCallback, useState } from "react";
import ComponentEditor from "@/components/ComponentEditor";
import KDLViewer from "@/components/KDLViewer";
import TabButton from "@/components/TabButton";
import TerminalPreview from "@/components/TerminalPreview";
import { copyToClipboard, downloadKDL, generateKDL } from "@/lib/kdl";
import { PRESET_THEMES } from "@/lib/presets";
import { DEFAULT_THEME, type RGB, type ZellijTheme } from "@/lib/types";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"components" | "kdl">(
    "components"
  );
  const [theme, setTheme] = useState<ZellijTheme>(DEFAULT_THEME);
  const [leftWidth, setLeftWidth] = useState(30); // 默认 30%
  const [isResizing, setIsResizing] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("custom");

  const handleExportKDL = () => {
    downloadKDL(theme);
  };

  const handleCopyKDL = async () => {
    const kdl = generateKDL(theme);
    const success = await copyToClipboard(kdl);
    if (success) {
      alert("KDL copied to clipboard!");
    } else {
      alert("Failed to copy to clipboard");
    }
  };

  const handleImportKDL = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      // TODO: Implement KDL parsing
      console.log("KDL content:", content);
    };
    reader.readAsText(file);
  };

  const handlePresetChange = (presetName: string) => {
    if (presetName === "custom") return;
    const preset = PRESET_THEMES[presetName];
    if (preset) {
      setTheme(preset);
      setSelectedPreset(presetName);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;
      const container = e.currentTarget as HTMLElement;
      const containerRect = container.getBoundingClientRect();
      const newLeftWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;
      setLeftWidth(Math.max(20, Math.min(50, newLeftWidth))); // 限制在 20%-50% 之间
    },
    [isResizing]
  );

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  return (
    <div
      className="flex h-screen flex-col bg-gray-900 text-white"
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {/* Header Banner */}
      <header className="flex items-center justify-between border-b border-gray-700 bg-gray-800 px-6 py-3">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold">🎨 Zellij Theme Maker</h1>
          <select
            value={selectedPreset}
            onChange={(e) => {
              setSelectedPreset(e.target.value);
              handlePresetChange(e.target.value);
            }}
            className="rounded border border-gray-600 bg-gray-700 px-3 py-1 text-sm"
          >
            <option value="custom">Custom Theme</option>
            <option value="dracula">Dracula</option>
            <option value="nord">Nord</option>
            <option value="catppuccin">Catppuccin</option>
          </select>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={theme.name}
            onChange={(e) =>
              setTheme((prev) => ({ ...prev, name: e.target.value }))
            }
            className="rounded border border-gray-600 bg-gray-700 px-3 py-1 text-sm"
            placeholder="Theme name"
          />
          <button
            type="button"
            onClick={handleCopyKDL}
            className="rounded bg-blue-600 px-4 py-1 text-sm hover:bg-blue-700"
          >
            Copy KDL
          </button>
          <button
            type="button"
            onClick={handleExportKDL}
            className="rounded bg-green-600 px-4 py-1 text-sm hover:bg-green-700"
          >
            Export KDL
          </button>
          <label className="cursor-pointer rounded bg-purple-600 px-4 py-1 text-sm hover:bg-purple-700">
            Import KDL
            <input
              type="file"
              accept=".kdl"
              onChange={handleImportKDL}
              className="hidden"
            />
          </label>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div
          className="flex flex-col overflow-hidden border-r border-gray-700"
          style={{ width: `${leftWidth}%` }}
        >
          {/* Fixed Tab Buttons */}
          <div className="flex-shrink-0 border-b border-gray-700 bg-gray-800 px-4 py-2">
            <div className="flex gap-2">
              <TabButton
                active={activeTab === "components"}
                onClick={() => setActiveTab("components")}
              >
                Components
              </TabButton>
              <TabButton
                active={activeTab === "kdl"}
                onClick={() => setActiveTab("kdl")}
              >
                KDL Code
              </TabButton>
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "components" && (
              <ComponentEditor
                theme={theme}
                onUpdateColor={(component, attribute, rgb) =>
                  setTheme((prev) => ({
                    ...prev,
                    components: {
                      ...prev.components,
                      [component]: {
                        ...prev.components[component],
                        [attribute]: rgb,
                      },
                    },
                  }))
                }
              />
            )}

            {activeTab === "kdl" && <KDLViewer kdl={generateKDL(theme)} />}
          </div>
        </div>

        {/* Resizer */}
        <div
          className="flex-shrink-0 cursor-col-resize bg-gray-700 hover:bg-blue-500 w-1 transition-colors"
          onMouseDown={handleMouseDown}
          style={{ cursor: isResizing ? "col-resize" : "col-resize" }}
        />

        {/* Right Preview */}
        <div
          className="flex-1 overflow-y-auto p-4"
          style={{ width: `${100 - leftWidth}%` }}
        >
          <TerminalPreview theme={theme} />
        </div>
      </div>
    </div>
  );
}
