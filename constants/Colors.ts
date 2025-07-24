const Palette = {
  lavenderMagenta: {
    "50": "#fcf5fe",
    "100": "#f6e9fe",
    "200": "#eed2fc",
    "300": "#e3aff8",
    "400": "#db94f5", // Original
    "500": "#be4ee7",
    "600": "#a52ecb",
    "700": "#8a23a8",
    "800": "#721e8a",
    "900": "#611e71",
    "950": "#3e074b",
  },
  bittersweet: {
    "50": "#fff2f1",
    "100": "#ffe3e1",
    "200": "#ffcbc7",
    "300": "#ffa7a0",
    "400": "#ff5f53", // Original
    "500": "#f8483b",
    "600": "#e52b1d",
    "700": "#c12014",
    "800": "#a01e14",
    "900": "#842018",
    "950": "#480c07",
  },
  seagull: {
    "50": "#f0faff",
    "100": "#dff3ff",
    "200": "#b8e9ff",
    "300": "#5fd2ff", // Original
    "400": "#33c7fd",
    "500": "#09b1ee",
    "600": "#008dcc",
    "700": "#0071a5",
    "800": "#045f88",
    "900": "#0a4f70",
    "950": "#06324b",
  },
  malachite: {
    "50": "#edfff6",
    "100": "#d5ffed",
    "200": "#aeffdb",
    "300": "#70ffc1",
    "400": "#2bfd9f",
    "500": "#00e37e", // Original
    "600": "#00c066",
    "700": "#009653",
    "800": "#067545",
    "900": "#07603b",
    "950": "#00371f",
  },
  ripeLemon: {
    "50": "#feffe7",
    "100": "#fbffc1",
    "200": "#fcff86",
    "300": "#fffc41",
    "400": "#ffef0d",
    "500": "#f4d700", // Original
    "600": "#d1a600",
    "700": "#a67702",
    "800": "#895d0a",
    "900": "#744c0f",
    "950": "#442804",
  },
  silverChalice: {
    "50": "#f7f7f7",
    "100": "#ededed",
    "200": "#dfdfdf",
    "300": "#c8c8c8",
    "400": "#b3b3b3", // Original
    "500": "#999999",
    "600": "#888888",
    "700": "#7b7b7b",
    "800": "#676767",
    "900": "#545454",
    "950": "#363636",
  },
  pictonBlue: {
    "50": "#effaff",
    "100": "#def4ff",
    "200": "#b6ecff",
    "300": "#75dfff",
    "400": "#2cd0ff",
    "500": "#00bcf9", // Original
    "600": "#0096d4",
    "700": "#0077ab",
    "800": "#00648d",
    "900": "#065374",
    "950": "#04354d",
  },

  zinc: {
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
  },
} as const;

const colors = {
  light: {
    text: Palette.zinc["900"],
    textMuted: Palette.zinc["500"],

    tint: Palette.malachite["600"],
    tabIconDefault: Palette.zinc["500"],
    tabIconSelected: Palette.malachite["500"],

    background: Palette.zinc["50"],
    containerBackground: Palette.zinc["100"],
    inputBackground: Palette.zinc["200"],
    overlayBackground: Palette.zinc["950"],
    border: Palette.zinc["200"],

    lavenderMagenta: Palette["lavenderMagenta"]["400"],
    lavenderMagentaContrast: Palette.zinc["900"],
    lavenderMagentaBorder: Palette["lavenderMagenta"]["500"],

    lavenderMagentaLight: Palette["lavenderMagenta"]["200"],
    lavenderMagentaLightContrast: Palette.zinc["900"],
    lavenderMagentaLightBorder: Palette["lavenderMagenta"]["400"],

    bittersweet: Palette["bittersweet"]["400"],
    bittersweetContrast: Palette.zinc["900"],
    bittersweetBorder: Palette["bittersweet"]["500"],

    bittersweetLight: Palette["bittersweet"]["200"],
    bittersweetLightContrast: Palette.zinc["900"],
    bittersweetLightBorder: Palette["bittersweet"]["500"],

    seagull: Palette["seagull"]["300"],
    seagullContrast: Palette.zinc["900"],
    seagullBorder: Palette["seagull"]["400"],

    seagullLight: Palette["seagull"]["100"],
    seagullLightContrast: Palette.zinc["900"],
    seagullLightBorder: Palette["seagull"]["400"],

    malachite: Palette["malachite"]["500"],
    malachiteContrast: Palette.zinc["900"],
    malachiteBorder: Palette["malachite"]["600"],

    malachiteLight: Palette["malachite"]["300"],
    malachiteLightContrast: Palette.zinc["900"],
    malachiteLightBorder: Palette["malachite"]["600"],

    ripeLemon: Palette["ripeLemon"]["500"],
    ripeLemonContrast: Palette.zinc["900"],
    ripeLemonBorder: Palette["ripeLemon"]["600"],

    ripeLemonLight: Palette["ripeLemon"]["300"],
    ripeLemonLightContrast: Palette.zinc["900"],
    ripeLemonLightBorder: Palette["ripeLemon"]["600"],

    silverChalice: Palette["silverChalice"]["400"],
    silverChaliceContrast: Palette.zinc["900"],
    silverChaliceBorder: Palette["silverChalice"]["500"],

    silverChaliceLight: Palette["silverChalice"]["200"],
    silverChaliceLightContrast: Palette.zinc["900"],
    silverChaliceLightBorder: Palette["silverChalice"]["500"],

    pictonBlue: Palette["pictonBlue"]["500"],
    pictonBlueContrast: Palette.zinc["900"],
    pictonBlueBorder: Palette["pictonBlue"]["600"],

    pictonBlueLight: Palette["pictonBlue"]["300"],
    pictonBlueLightContrast: Palette.zinc["900"],
    pictonBlueLightBorder: Palette["pictonBlue"]["600"],

    zinc: Palette.zinc["600"],
    zincContrast: Palette.zinc["50"],
    zincBorder: Palette.zinc["950"],

    zincLight: Palette.zinc["400"],
    zincLightContrast: Palette.zinc["50"],
    zincLightBorder: Palette.zinc["950"],
  },
  dark: {
    text: Palette.zinc["50"],
    textMuted: Palette.zinc["400"],

    tint: Palette.malachite["400"],
    tabIconDefault: Palette.zinc["400"],
    tabIconSelected: Palette.malachite["400"],

    background: Palette.zinc["950"],
    containerBackground: Palette.zinc["900"],
    inputBackground: Palette.zinc["800"],
    overlayBackground: Palette.zinc["50"],
    border: Palette.zinc["800"],

    lavenderMagenta: Palette["lavenderMagenta"]["300"],
    lavenderMagentaContrast: Palette.zinc["900"],
    lavenderMagentaBorder: Palette["lavenderMagenta"]["400"],

    lavenderMagentaLight: Palette["lavenderMagenta"]["200"],
    lavenderMagentaLightContrast: Palette.zinc["900"],
    lavenderMagentaLightBorder: Palette["lavenderMagenta"]["400"],

    bittersweet: Palette["bittersweet"]["400"],
    bittersweetContrast: Palette.zinc["900"],
    bittersweetBorder: Palette["bittersweet"]["400"],

    bittersweetLight: Palette["bittersweet"]["300"],
    bittersweetLightContrast: Palette.zinc["900"],
    bittersweetLightBorder: Palette["bittersweet"]["400"],

    seagull: Palette["seagull"]["300"],
    seagullContrast: Palette.zinc["900"],
    seagullBorder: Palette["seagull"]["300"],

    seagullLight: Palette["seagull"]["100"],
    seagullLightContrast: Palette.zinc["900"],
    seagullLightBorder: Palette["seagull"]["300"],

    malachite: Palette["malachite"]["400"],
    malachiteContrast: Palette.zinc["900"],
    malachiteBorder: Palette["malachite"]["500"],

    malachiteLight: Palette["malachite"]["200"],
    malachiteLightContrast: Palette.zinc["900"],
    malachiteLightBorder: Palette["malachite"]["500"],

    ripeLemon: Palette["ripeLemon"]["400"],
    ripeLemonContrast: Palette.zinc["900"],
    ripeLemonBorder: Palette["ripeLemon"]["500"],

    ripeLemonLight: Palette["ripeLemon"]["200"],
    ripeLemonLightContrast: Palette.zinc["900"],
    ripeLemonLightBorder: Palette["ripeLemon"]["500"],

    silverChalice: Palette["silverChalice"]["300"],
    silverChaliceContrast: Palette.zinc["900"],
    silverChaliceBorder: Palette["silverChalice"]["400"],

    silverChaliceLight: Palette["silverChalice"]["100"],
    silverChaliceLightContrast: Palette.zinc["900"],
    silverChaliceLightBorder: Palette["silverChalice"]["400"],

    pictonBlue: Palette["pictonBlue"]["400"],
    pictonBlueContrast: Palette.zinc["900"],
    pictonBlueBorder: Palette["pictonBlue"]["500"],

    pictonBlueLight: Palette["pictonBlue"]["200"],
    pictonBlueLightContrast: Palette.zinc["900"],
    pictonBlueLightBorder: Palette["pictonBlue"]["500"],

    zinc: Palette.zinc["300"],
    zincContrast: Palette.zinc["900"],
    zincBorder: Palette.zinc["400"],

    zincLight: Palette.zinc["100"],
    zincLightContrast: Palette.zinc["900"],
    zincLightBorder: Palette.zinc["100"],

  },
} as const;

export default colors;

export type Color = keyof typeof Palette | `${keyof typeof Palette}Light`;
export type ThemedColors = (typeof colors)[keyof typeof colors];

type DarkColorScheme = keyof typeof colors.dark;
type LightColorScheme = keyof typeof colors.light;
let _darkKey = "text" as DarkColorScheme;
let _lightKey = "text" as LightColorScheme;
let _testDarkKey: DarkColorScheme = _lightKey;
let _testLightKey: LightColorScheme = _darkKey;
