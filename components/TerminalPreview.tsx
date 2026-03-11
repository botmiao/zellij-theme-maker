"use client";

import { ZellijTheme } from "@/lib/types";
import { rgbToHex } from "@/lib/kdl";

interface TerminalPreviewProps {
  theme: ZellijTheme;
}

export default function TerminalPreview({ theme }: TerminalPreviewProps) {
  const getComponentStyle = (componentName: keyof typeof theme.components) => {
    const component = theme.components[componentName];
    return {
      color: rgbToHex(component.base),
      backgroundColor: rgbToHex(component.background),
    };
  };

  const getEmphasisColor = (
    componentName: keyof typeof theme.components,
    index: number
  ) => {
    const component = theme.components[componentName];
    const colors = [
      component.emphasis_0,
      component.emphasis_1,
      component.emphasis_2,
      component.emphasis_3,
    ];
    return rgbToHex(colors[index % 4]);
  };

  return (
    <div className="h-full rounded-lg border-2 border-gray-700 bg-gray-900 p-4">
      <h3 className="mb-4 text-sm font-medium text-gray-300">
        Terminal Preview
      </h3>

      {/* Main Terminal Window */}
      <div
        className="h-full flex flex-col rounded border"
        style={{
          borderColor: rgbToHex(theme.components.frame_selected.base),
          backgroundColor: rgbToHex(theme.components.frame_selected.background),
        }}
      >
        {/* Tab Bar */}
        <div className="flex border-b-2">
          <div
            className="flex-1 border-r px-3 py-1 text-sm"
            style={{
              borderColor: rgbToHex(theme.components.frame_unselected.base),
              ...getComponentStyle("ribbon_selected"),
            }}
          >
            <span className="mr-2">▪</span>
            main.go
          </div>
          <div
            className="flex-1 border-r px-3 py-1 text-sm"
            style={{
              borderColor: rgbToHex(theme.components.frame_unselected.base),
              ...getComponentStyle("ribbon_unselected"),
            }}
          >
            <span className="mr-2">▪</span>
            README.md
          </div>
          <div
            className="flex-1 px-3 py-1 text-sm"
            style={{
              ...getComponentStyle("ribbon_unselected"),
            }}
          >
            <span className="mr-2">▪</span>
            config.kdl
          </div>
        </div>

        {/* Panes Container */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Pane - File Tree */}
          <div
            className="w-64 border-r overflow-hidden"
            style={{
              borderColor: rgbToHex(theme.components.frame_unselected.base),
              backgroundColor: rgbToHex(
                theme.components.frame_unselected.background
              ),
            }}
          >
            <div className="p-2">
              <div
                className="mb-2 border-b pb-1 text-xs font-medium"
                style={getComponentStyle("table_title")}
              >
                src/
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 px-2 py-1 text-xs">
                  <span
                    style={{ color: getEmphasisColor("list_unselected", 0) }}
                  >
                    📁
                  </span>
                  <span style={getComponentStyle("list_unselected")}>
                    components/
                  </span>
                </div>
                <div className="ml-4 flex items-center gap-2 px-2 py-1 text-xs">
                  <span
                    style={{ color: getEmphasisColor("list_unselected", 1) }}
                  >
                    📄
                  </span>
                  <span style={getComponentStyle("list_unselected")}>
                    Button.tsx
                  </span>
                </div>
                <div className="ml-4 flex items-center gap-2 px-2 py-1 text-xs">
                  <span style={{ color: getEmphasisColor("list_selected", 2) }}>
                    📄
                  </span>
                  <span
                    className="rounded px-1"
                    style={getComponentStyle("list_selected")}
                  >
                    ThemeMaker.tsx
                  </span>
                </div>
                <div className="ml-4 flex items-center gap-2 px-2 py-1 text-xs">
                  <span
                    style={{ color: getEmphasisColor("list_unselected", 3) }}
                  >
                    📄
                  </span>
                  <span style={getComponentStyle("list_unselected")}>
                    types.ts
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Pane - Code Editor */}
          <div className="flex-1 overflow-hidden">
            {/* Editor Tabs */}
            <div
              className="flex border-b"
              style={{
                borderColor: rgbToHex(theme.components.frame_unselected.base),
              }}
            >
              <div
                className="px-3 py-1 text-xs"
                style={getComponentStyle("ribbon_selected")}
              >
                ThemeMaker.tsx
              </div>
              <div
                className="px-3 py-1 text-xs"
                style={getComponentStyle("ribbon_unselected")}
              >
                types.ts
              </div>
            </div>

            {/* Code Content */}
            <div
              className="h-full overflow-auto p-4 text-xs font-mono"
              style={{
                backgroundColor: rgbToHex(
                  theme.components.frame_selected.background
                ),
              }}
            >
              <div className="space-y-1">
                <div>
                  <span
                    style={{ color: getEmphasisColor("text_unselected", 0) }}
                  >
                    import
                  </span>{" "}
                  <span style={getComponentStyle("text_unselected")}>
                    {"{ useState }"}
                  </span>
                  <span
                    style={{ color: getEmphasisColor("text_unselected", 1) }}
                  >
                    {" "}
                  </span>
                  <span
                    style={{ color: getEmphasisColor("text_unselected", 2) }}
                  >
                    from
                  </span>{" "}
                  <span style={getComponentStyle("text_unselected")}>
                    "react"
                  </span>
                  ;
                </div>
                <div>
                  <span
                    style={{ color: getEmphasisColor("text_unselected", 1) }}
                  >
                    import
                  </span>{" "}
                  <span style={getComponentStyle("text_unselected")}>
                    {"{ ZellijTheme }"}
                  </span>
                  <span
                    style={{ color: getEmphasisColor("text_unselected", 2) }}
                  >
                    {" "}
                  </span>
                  <span
                    style={{ color: getEmphasisColor("text_unselected", 3) }}
                  >
                    from
                  </span>{" "}
                  <span style={getComponentStyle("text_unselected")}>
                    "@/lib/types"
                  </span>
                  ;
                </div>
                <div className="mt-2">
                  <span style={getComponentStyle("text_selected")}>
                    export default function
                  </span>{" "}
                  <span style={getComponentStyle("text_selected")}>
                    ThemeMaker()
                  </span>
                  {" {"}
                  {"}"}
                </div>
                <div className="ml-4">
                  <span style={getComponentStyle("text_selected")}>const</span>{" "}
                  <span style={getComponentStyle("text_unselected")}>
                    [theme, setTheme]
                  </span>
                  <span
                    style={{ color: getEmphasisColor("text_unselected", 0) }}
                  >
                    {" "}
                  </span>
                  <span style={getComponentStyle("text_unselected")}>=</span>{" "}
                  <span style={getComponentStyle("text_unselected")}>
                    useState
                  </span>
                  &lt;
                  <span style={getComponentStyle("text_unselected")}>
                    ZellijTheme
                  </span>
                  &gt; (DEFAULT_THEME);
                </div>
                <div className="ml-4">
                  <span style={getComponentStyle("text_unselected")}>
                    {"// TODO: implement theme editor"}
                  </span>
                </div>
              </div>

              {/* Status indicators at bottom */}
              <div className="mt-4 flex gap-2">
                <div
                  className="rounded px-2 py-1 text-xs"
                  style={getComponentStyle("exit_code_success")}
                >
                  ✓ Build successful
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Command Line */}
        <div
          className="border-t px-4 py-2 text-xs font-mono"
          style={{
            borderColor: rgbToHex(theme.components.frame_unselected.base),
            ...getComponentStyle("ribbon_unselected"),
          }}
        >
          <span className="text-gray-400">~/projects/zellij-theme-maker $</span>
          <span className="ml-2">npm run dev</span>
        </div>
      </div>

      {/* Color Palette Preview */}
      <div className="mt-4">
        <h4 className="mb-2 text-xs font-medium text-gray-400">
          Color Palette
        </h4>
        <div className="grid grid-cols-8 gap-2">
          {Object.entries(theme.components)
            .slice(0, 8)
            .map(([name, component]) => (
              <div key={name} className="text-center">
                <div
                  className="mb-1 h-6 w-full rounded border border-gray-600"
                  style={{ backgroundColor: rgbToHex(component.base) }}
                />
                <div className="text-xs text-gray-400">{name}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
