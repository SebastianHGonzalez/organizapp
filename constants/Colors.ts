const Palette = {
  'blue-gem': {
    '50': '#f4f0ff',
    '100': '#ebe4ff',
    '200': '#daccff',
    '300': '#bfa4ff',
    '400': '#a270ff',
    '500': '#8837ff',
    '600': '#7e0fff',
    '700': '#7100ff',
    '800': '#5f00da',
    '900': '#440099',
    '950': '#2e007a',
  },
  'fuchsia-pink': {
    '50': '#fff3ff',
    '100': '#fee7ff',
    '200': '#fdceff',
    '300': '#ffa7ff',
    '400': '#ff72fe',
    '500': '#f83df8',
    '600': '#db1dd6',
    '700': '#b714b0',
    '800': '#95138d',
    '900': '#7a1572',
    '950': '#52004c',
  },
  "zinc": {
    "50": "#fafafa",
    "100": "#f4f4f5",
    "200": "#e4e4e7",
    "300": "#d4d4d8",
    "400": "#a1a1aa",
    "500": "#71717a",
    "600": "#52525b",
    "700": "#3f3f46",
    "800": "#27272a",
    "900": "#18181b",
    "950": "#0e0e11",
  }
} as const;

const colors = {
  light: {
    text: Palette["zinc"]["950"],
    textMuted: Palette["zinc"]["500"],
    tint: Palette["blue-gem"]["500"],
    tabIconDefault: Palette["zinc"]["500"],
    tabIconSelected: Palette["blue-gem"]["500"],

    background: Palette["zinc"]["50"],
    containerBackground: Palette["zinc"]["100"],
    border: Palette["zinc"]["200"],
    tintBorder: Palette["blue-gem"]["600"],
  },
  dark: {
    text: Palette["zinc"]["50"],
    textMuted: Palette["zinc"]["400"],
    tint: Palette["blue-gem"]["400"],
    tabIconDefault: Palette["zinc"]["400"],
    tabIconSelected: Palette["blue-gem"]["400"],

    background: Palette["zinc"]["950"],
    containerBackground: Palette["zinc"]["900"],
    border: Palette["zinc"]["800"],
    tintBorder: Palette["blue-gem"]["500"],
  },
} as const;

export default colors;

type DarkColorScheme = keyof typeof colors.dark;
type LightColorScheme = keyof typeof colors.light;
let _darkKey = "text" as DarkColorScheme;
let _lightKey = "text" as LightColorScheme;
let _testDarkKey: DarkColorScheme = _lightKey;
let _testLightKey: LightColorScheme = _darkKey;