"use client";

import { rgbToHex } from "@/lib/kdl";
import type { ZellijTheme } from "@/lib/types";

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
    <div className="h-full rounded-lg border border-gray-700 bg-gray-800 p-4">
      <h3 className="mb-4 text-sm font-medium text-gray-300">
        Terminal Preview
      </h3>

      {/* Mock Terminal Window */}
      <div
        className="rounded border-2"
        style={{
          borderColor: rgbToHex(theme.components.frame_selected.base),
          backgroundColor: rgbToHex(theme.components.frame_selected.background),
        }}
      >
        {/* Tabs */}
        <div
          className="flex border-b-2"
          style={{
            borderColor: rgbToHex(theme.components.ribbon_unselected.base),
          }}
        >
          <div
            className="px-4 py-2 text-sm font-medium"
            style={getComponentStyle("ribbon_selected")}
          >
            Tab 1
          </div>
          <div
            className="px-4 py-2 text-sm"
            style={getComponentStyle("ribbon_unselected")}
          >
            Tab 2
          </div>
          <div
            className="px-4 py-2 text-sm"
            style={getComponentStyle("ribbon_unselected")}
          >
            Tab 3
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Table Example */}
          <div className="mb-4">
            <div
              className="mb-2 border-b pb-1 text-sm font-medium"
              style={getComponentStyle("table_title")}
            >
              Table Header
            </div>
            <div className="space-y-1">
              <div
                className="rounded px-2 py-1 text-sm"
                style={getComponentStyle("table_cell_selected")}
              >
                Selected Row
              </div>
              <div
                className="rounded px-2 py-1 text-sm"
                style={getComponentStyle("table_cell_unselected")}
              >
                Unselected Row
              </div>
            </div>
          </div>

          {/* List Example */}
          <div className="mb-4">
            <div className="mb-2 text-xs text-gray-400">List:</div>
            <div className="space-y-1">
              <div
                className="rounded px-2 py-1 text-sm"
                style={getComponentStyle("list_selected")}
              >
                Selected item
              </div>
              <div
                className="rounded px-2 py-1 text-sm"
                style={getComponentStyle("list_unselected")}
              >
                Unselected item
              </div>
              <div
                className="rounded px-2 py-1 text-sm"
                style={getComponentStyle("list_unselected")}
              >
                Another item
              </div>
            </div>
          </div>

          {/* Exit Codes */}
          <div className="flex gap-4">
            <div
              className="rounded px-2 py-1 text-xs"
              style={getComponentStyle("exit_code_success")}
            >
              ✓ Success
            </div>
            <div
              className="rounded px-2 py-1 text-xs"
              style={getComponentStyle("exit_code_error")}
            >
              ✗ Error
            </div>
          </div>

          {/* Text with emphasis */}
          <div className="mt-4 text-xs">
            <span style={getComponentStyle("text_unselected")}>
              Normal text with{" "}
              <span style={{ color: getEmphasisColor("text_unselected", 0) }}>
                emphasis 0
              </span>
              {", "}
              <span style={{ color: getEmphasisColor("text_unselected", 1) }}>
                emphasis 1
              </span>
              {", "}
              <span style={{ color: getEmphasisColor("text_unselected", 2) }}>
                emphasis 2
              </span>
            </span>
          </div>
        </div>

        {/* Status Bar */}
        <div
          className="flex justify-between border-t px-4 py-1 text-xs"
          style={{
            borderColor: rgbToHex(theme.components.frame_unselected.base),
            ...getComponentStyle("ribbon_unselected"),
          }}
        >
          <span>Ctrl+P</span>
          <span>mode: Tab</span>
        </div>
      </div>

      {/* Color Palette */}
      <div className="mt-6">
        <h4 className="mb-2 text-xs font-medium text-gray-400">
          Color Palette
        </h4>
        <div className="grid grid-cols-7 gap-2">
          {Object.entries(theme.components)
            .slice(0, 7)
            .map(([name, component]) => (
              <div key={name} className="text-center">
                <div
                  className="mb-1 h-8 w-full rounded border border-gray-600"
                  style={{
                    backgroundColor: rgbToHex(component.base),
                  }}
                />
                <div className="text-xs text-gray-400">{name}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
