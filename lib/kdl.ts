import type { RGB, ZellijTheme } from "./types";

export function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

export function hexToRgb(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return { r: 0, g: 0, b: 0 };
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

export function rgbToKDL(rgb: RGB): string {
  return `${rgb.r} ${rgb.g} ${rgb.b}`;
}

export function generateKDL(theme: ZellijTheme): string {
  let kdl = `themes {\n  ${theme.name} {\n`;

  // Generate components
  for (const [componentName, component] of Object.entries(theme.components)) {
    kdl += `    ${componentName} {\n`;
    kdl += `      base ${rgbToKDL(component.base)}\n`;
    kdl += `      background ${rgbToKDL(component.background)}\n`;
    kdl += `      emphasis_0 ${rgbToKDL(component.emphasis_0)}\n`;
    kdl += `      emphasis_1 ${rgbToKDL(component.emphasis_1)}\n`;
    kdl += `      emphasis_2 ${rgbToKDL(component.emphasis_2)}\n`;
    kdl += `      emphasis_3 ${rgbToKDL(component.emphasis_3)}\n`;
    kdl += `    }\n`;
  }

  // Generate multiplayer colors
  kdl += `    multiplayer_user_colors {\n`;
  for (const [playerName, color] of Object.entries(
    theme.multiplayer_user_colors
  )) {
    kdl += `      ${playerName} ${rgbToKDL(color)}\n`;
  }
  kdl += `    }\n`;

  kdl += `  }\n}\n`;
  return kdl;
}

export function downloadKDL(theme: ZellijTheme, filename?: string) {
  const kdl = generateKDL(theme);
  const blob = new Blob([kdl], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || `${theme.name}.kdl`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Failed to copy to clipboard:", err);
    return false;
  }
}
