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

const colorTokens = {
  primary: "blue-gem",
  secondary: "fuchsia-pink",
  neutral: "zinc",
} as const;

const colors = {
  light: {
    text: Palette[colorTokens.neutral]["900"],
    textMuted: Palette[colorTokens.neutral]["500"],
    tint: Palette[colorTokens.primary]["500"],
    tabIconDefault: Palette[colorTokens.neutral]["500"],
    tabIconSelected: Palette[colorTokens.primary]["500"],

    background: Palette[colorTokens.neutral]["50"],
    containerBackground: Palette[colorTokens.neutral]["100"],
    inputBackground: Palette[colorTokens.neutral]["200"],
    border: Palette[colorTokens.neutral]["200"],
    tintBorder: Palette[colorTokens.primary]["600"],
  },
  dark: {
    text: Palette[colorTokens.neutral]["50"],
    textMuted: Palette[colorTokens.neutral]["400"],
    tint: Palette[colorTokens.primary]["400"],
    tabIconDefault: Palette[colorTokens.neutral]["400"],
    tabIconSelected: Palette[colorTokens.primary]["400"],

    background: Palette[colorTokens.neutral]["950"],
    containerBackground: Palette[colorTokens.neutral]["900"],
    inputBackground: Palette[colorTokens.neutral]["800"],
    border: Palette[colorTokens.neutral]["800"],
    tintBorder: Palette[colorTokens.primary]["500"],
  },
} as const;

export default colors;

export type Colors = typeof colors;
export type ThemedColors = Colors[keyof Colors];

type DarkColorScheme = keyof typeof colors.dark;
type LightColorScheme = keyof typeof colors.light;
let _darkKey = "text" as DarkColorScheme;
let _lightKey = "text" as LightColorScheme;
let _testDarkKey: DarkColorScheme = _lightKey;
let _testLightKey: LightColorScheme = _darkKey;