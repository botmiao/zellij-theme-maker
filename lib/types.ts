export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface ThemeComponent {
  base: RGB;
  background: RGB;
  emphasis_0: RGB;
  emphasis_1: RGB;
  emphasis_2: RGB;
  emphasis_3: RGB;
}

export interface ZellijTheme {
  name: string;
  components: {
    text_unselected: ThemeComponent;
    text_selected: ThemeComponent;
    ribbon_unselected: ThemeComponent;
    ribbon_selected: ThemeComponent;
    table_title: ThemeComponent;
    table_cell_unselected: ThemeComponent;
    table_cell_selected: ThemeComponent;
    list_unselected: ThemeComponent;
    list_selected: ThemeComponent;
    frame_unselected: ThemeComponent;
    frame_selected: ThemeComponent;
    frame_highlight: ThemeComponent;
    exit_code_success: ThemeComponent;
    exit_code_error: ThemeComponent;
  };
  multiplayer_user_colors: {
    player_1: RGB;
    player_2: RGB;
    player_3: RGB;
    player_4: RGB;
    player_5: RGB;
    player_6: RGB;
    player_7: RGB;
    player_8: RGB;
    player_9: RGB;
    player_10: RGB;
  };
}

export const COMPONENT_NAMES = [
  "text_unselected",
  "text_selected",
  "ribbon_unselected",
  "ribbon_selected",
  "table_title",
  "table_cell_unselected",
  "table_cell_selected",
  "list_unselected",
  "list_selected",
  "frame_unselected",
  "frame_selected",
  "frame_highlight",
  "exit_code_success",
  "exit_code_error",
] as const;

export const COLOR_ATTRIBUTES = [
  "base",
  "background",
  "emphasis_0",
  "emphasis_1",
  "emphasis_2",
  "emphasis_3",
] as const;

export const DEFAULT_THEME: ZellijTheme = {
  name: "my-theme",
  components: {
    text_unselected: {
      base: { r: 187, g: 187, b: 187 },
      background: { r: 28, g: 28, b: 28 },
      emphasis_0: { r: 255, g: 255, b: 255 },
      emphasis_1: { r: 94, g: 94, b: 94 },
      emphasis_2: { r: 141, g: 141, b: 141 },
      emphasis_3: { r: 188, g: 188, b: 188 },
    },
    text_selected: {
      base: { r: 255, g: 255, b: 255 },
      background: { r: 50, g: 50, b: 50 },
      emphasis_0: { r: 255, g: 255, b: 255 },
      emphasis_1: { r: 94, g: 94, b: 94 },
      emphasis_2: { r: 141, g: 141, b: 141 },
      emphasis_3: { r: 188, g: 188, b: 188 },
    },
    ribbon_unselected: {
      base: { r: 141, g: 141, b: 141 },
      background: { r: 28, g: 28, b: 28 },
      emphasis_0: { r: 255, g: 255, b: 255 },
      emphasis_1: { r: 94, g: 94, b: 94 },
      emphasis_2: { r: 141, g: 141, b: 141 },
      emphasis_3: { r: 188, g: 188, b: 188 },
    },
    ribbon_selected: {
      base: { r: 255, g: 255, b: 255 },
      background: { r: 50, g: 50, b: 50 },
      emphasis_0: { r: 255, g: 255, b: 255 },
      emphasis_1: { r: 94, g: 94, b: 94 },
      emphasis_2: { r: 141, g: 141, b: 141 },
      emphasis_3: { r: 188, g: 188, b: 188 },
    },
    table_title: {
      base: { r: 255, g: 255, b: 255 },
      background: { r: 28, g: 28, b: 28 },
      emphasis_0: { r: 255, g: 255, b: 255 },
      emphasis_1: { r: 94, g: 94, b: 94 },
      emphasis_2: { r: 141, g: 141, b: 141 },
      emphasis_3: { r: 188, g: 188, b: 188 },
    },
    table_cell_unselected: {
      base: { r: 187, g: 187, b: 187 },
      background: { r: 28, g: 28, b: 28 },
      emphasis_0: { r: 255, g: 255, b: 255 },
      emphasis_1: { r: 94, g: 94, b: 94 },
      emphasis_2: { r: 141, g: 141, b: 141 },
      emphasis_3: { r: 188, g: 188, b: 188 },
    },
    table_cell_selected: {
      base: { r: 255, g: 255, b: 255 },
      background: { r: 50, g: 50, b: 50 },
      emphasis_0: { r: 255, g: 255, b: 255 },
      emphasis_1: { r: 94, g: 94, b: 94 },
      emphasis_2: { r: 141, g: 141, b: 141 },
      emphasis_3: { r: 188, g: 188, b: 188 },
    },
    list_unselected: {
      base: { r: 187, g: 187, b: 187 },
      background: { r: 28, g: 28, b: 28 },
      emphasis_0: { r: 255, g: 255, b: 255 },
      emphasis_1: { r: 94, g: 94, b: 94 },
      emphasis_2: { r: 141, g: 141, b: 141 },
      emphasis_3: { r: 188, g: 188, b: 188 },
    },
    list_selected: {
      base: { r: 255, g: 255, b: 255 },
      background: { r: 50, g: 50, b: 50 },
      emphasis_0: { r: 255, g: 255, b: 255 },
      emphasis_1: { r: 94, g: 94, b: 94 },
      emphasis_2: { r: 141, g: 141, b: 141 },
      emphasis_3: { r: 188, g: 188, b: 188 },
    },
    frame_unselected: {
      base: { r: 94, g: 94, b: 94 },
      background: { r: 28, g: 28, b: 28 },
      emphasis_0: { r: 255, g: 255, b: 255 },
      emphasis_1: { r: 94, g: 94, b: 94 },
      emphasis_2: { r: 141, g: 141, b: 141 },
      emphasis_3: { r: 188, g: 188, b: 188 },
    },
    frame_selected: {
      base: { r: 255, g: 255, b: 255 },
      background: { r: 28, g: 28, b: 28 },
      emphasis_0: { r: 255, g: 255, b: 255 },
      emphasis_1: { r: 94, g: 94, b: 94 },
      emphasis_2: { r: 141, g: 141, b: 141 },
      emphasis_3: { r: 188, g: 188, b: 188 },
    },
    frame_highlight: {
      base: { r: 255, g: 255, b: 255 },
      background: { r: 28, g: 28, b: 28 },
      emphasis_0: { r: 255, g: 255, b: 255 },
      emphasis_1: { r: 94, g: 94, b: 94 },
      emphasis_2: { r: 141, g: 141, b: 141 },
      emphasis_3: { r: 188, g: 188, b: 188 },
    },
    exit_code_success: {
      base: { r: 0, g: 255, b: 0 },
      background: { r: 0, g: 0, b: 0 },
      emphasis_0: { r: 0, g: 0, b: 0 },
      emphasis_1: { r: 0, g: 0, b: 0 },
      emphasis_2: { r: 0, g: 0, b: 0 },
      emphasis_3: { r: 0, g: 0, b: 0 },
    },
    exit_code_error: {
      base: { r: 255, g: 0, b: 0 },
      background: { r: 0, g: 0, b: 0 },
      emphasis_0: { r: 0, g: 0, b: 0 },
      emphasis_1: { r: 0, g: 0, b: 0 },
      emphasis_2: { r: 0, g: 0, b: 0 },
      emphasis_3: { r: 0, g: 0, b: 0 },
    },
  },
  multiplayer_user_colors: {
    player_1: { r: 255, g: 0, b: 255 },
    player_2: { r: 0, g: 217, b: 227 },
    player_3: { r: 0, g: 0, b: 0 },
    player_4: { r: 255, g: 230, b: 0 },
    player_5: { r: 0, g: 229, b: 229 },
    player_6: { r: 0, g: 0, b: 0 },
    player_7: { r: 255, g: 53, b: 94 },
    player_8: { r: 0, g: 0, b: 0 },
    player_9: { r: 0, g: 0, b: 0 },
    player_10: { r: 0, g: 0, b: 0 },
  },
};
