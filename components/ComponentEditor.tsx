"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { rgbToHex } from "@/lib/kdl";
import type { RGB, ZellijTheme } from "@/lib/types";

interface ComponentEditorProps {
  theme: ZellijTheme;
  onUpdateColor: (
    component: keyof ZellijTheme["components"],
    attribute: string,
    rgb: RGB
  ) => void;
}

export default function ComponentEditor({
  theme,
  onUpdateColor,
}: ComponentEditorProps) {
  const [expandedComponents, setExpandedComponents] = useState<Set<string>>(
    new Set(["ribbon_unselected", "frame_selected"])
  );
  const [colorPickerState, setColorPickerState] = useState<{
    component: keyof ZellijTheme["components"] | null;
    attribute: string | null;
    color: string;
  }>({
    component: null,
    attribute: null,
    color: "",
  });

  const toggleComponent = (componentName: string) => {
    setExpandedComponents((prev) => {
      const next = new Set(prev);
      if (next.has(componentName)) {
        next.delete(componentName);
      } else {
        next.add(componentName);
      }
      return next;
    });
  };

  const getColor = (
    component: keyof ZellijTheme["components"],
    attribute: string
  ): string => {
    const componentData = theme.components[component];
    const attrKey = attribute as keyof typeof componentData;
    return rgbToHex(componentData[attrKey]);
  };

  const handleColorChange = (hex: string) => {
    if (!colorPickerState.component || !colorPickerState.attribute) return;

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    onUpdateColor(colorPickerState.component, colorPickerState.attribute, {
      r,
      g,
      b,
    });
    setColorPickerState((prev) => ({ ...prev, color: hex }));
  };

  const closeColorPicker = () => {
    setColorPickerState({
      component: null,
      attribute: null,
      color: "",
    });
  };

  return (
    <div className="space-y-4">
      {/* Color Picker Modal */}
      {colorPickerState.component && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={closeColorPicker}
        >
          <div
            className="rounded-lg bg-gray-800 p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium">
                Adjust Color: {colorPickerState.component}.
                {colorPickerState.attribute}
              </h3>
              <button
                type="button"
                onClick={closeColorPicker}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="mb-3">
              <HexColorPicker
                color={colorPickerState.color}
                onChange={handleColorChange}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={colorPickerState.color}
                onChange={(e) => handleColorChange(e.target.value)}
                className="flex-1 rounded border border-gray-600 bg-gray-700 px-3 py-2 text-sm"
                placeholder="#000000"
              />
              <div
                className="h-10 w-12 rounded border border-gray-600"
                style={{ backgroundColor: colorPickerState.color }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Component List */}
      <div className="space-y-2">
        {Object.keys(theme.components).map((componentName) => {
          const isExpanded = expandedComponents.has(componentName);
          const isSelected =
            colorPickerState.component ===
            (componentName as keyof ZellijTheme["components"]);

          return (
            <div
              key={componentName}
              className={`rounded-lg border transition-colors ${
                isSelected
                  ? "border-blue-500 bg-gray-800"
                  : "border-gray-700 bg-gray-800/50"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleComponent(componentName)}
                className="flex w-full items-center justify-between px-4 py-2 text-left font-medium"
              >
                <span className="text-sm">{componentName}</span>
                <span
                  className={`transform transition-transform ${
                    isExpanded ? "rotate-90" : ""
                  }`}
                >
                  ▶
                </span>
              </button>

              {isExpanded && (
                <div className="border-t border-gray-700 p-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "base",
                      "background",
                      "emphasis_0",
                      "emphasis_1",
                      "emphasis_2",
                      "emphasis_3",
                    ].map((attr) => {
                      const color = getColor(
                        componentName as keyof ZellijTheme["components"],
                        attr
                      );
                      const isAttrSelected =
                        isSelected && colorPickerState.attribute === attr;

                      return (
                        <button
                          type="button"
                          key={attr}
                          onClick={() => {
                            setColorPickerState({
                              component:
                                componentName as keyof ZellijTheme["components"],
                              attribute: attr,
                              color: color,
                            });
                          }}
                          className={`flex items-center gap-2 rounded border p-2 text-left transition-colors ${
                            isAttrSelected
                              ? "border-blue-500 bg-gray-700"
                              : "border-gray-600 hover:border-gray-500"
                          }`}
                        >
                          <div
                            className="h-6 w-6 rounded border border-gray-600"
                            style={{ backgroundColor: color }}
                          />
                          <span className="flex-1 text-xs">{attr}</span>
                          <span className="text-xs text-gray-400">{color}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
