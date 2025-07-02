const FontSizes = {
    xxxs: 10,   // Extra extra extra small (e.g., captions, overlines)
    xxs: 12,    // Extra extra small (e.g., secondary captions)
    xs: 14,     // Extra small (e.g., footnotes, small labels)
    sm: 16,     // Small (e.g., body text, inputs)
    md: 18,     // Medium (e.g., subheadings, buttons)
    lg: 20,     // Large (e.g., headings, section titles)
    xl: 24,     // Extra large (e.g., main headings)
    xxl: 32,    // Extra extra large (e.g., hero titles)
    xxxl: 40,   // Extra extra extra large (e.g., splash/landing hero)
} as const;

export enum FontFamily {
    BebasNeue = "BebasNeue",
    Roboto = "Roboto",
    SpaceMono = "SpaceMono",
}

const Fonts = {
    display: {
        fontFamily: FontFamily.BebasNeue,
        fontWeight: "bold",
        fontSize: FontSizes.xxxl,
        letterSpacing: 2,
        textTransform: "uppercase",
    },
    hero: {
        fontFamily: FontFamily.BebasNeue,
        fontWeight: "bold",
        fontSize: FontSizes.xxl,
        letterSpacing: 1.5,
        textTransform: "uppercase",
    },
    heading1: {
        fontFamily: FontFamily.BebasNeue,
        fontWeight: "bold",
        fontSize: FontSizes.xl,
        letterSpacing: 1.2,
        textTransform: "uppercase",
    },
    heading2: {
        fontFamily: FontFamily.BebasNeue,
        fontWeight: "bold",
        fontSize: FontSizes.lg,
        letterSpacing: 1,
        textTransform: "uppercase",
    },
    heading3: {
        fontFamily: FontFamily.BebasNeue,
        fontWeight: "bold",
        fontSize: FontSizes.md,
        letterSpacing: 0.8,
        textTransform: "uppercase",
    },
    subtitle: {
        fontFamily: FontFamily.Roboto,
        fontWeight: "500",
        fontSize: FontSizes.md,
        letterSpacing: 0.5,
    },
    body: {
        fontFamily: FontFamily.Roboto,
        fontWeight: "400",
        fontSize: FontSizes.sm,
        letterSpacing: 0.25,
    },
    bodyBold: {
        fontFamily: FontFamily.Roboto,
        fontWeight: "bold",
        fontSize: FontSizes.sm,
        letterSpacing: 0.25,
    },
    monospace: {
        fontFamily: FontFamily.SpaceMono,
        fontWeight: "400",
        fontSize: FontSizes.sm,
        letterSpacing: 0.25,
    },
    caption: {
        fontFamily: FontFamily.Roboto,
        fontWeight: "400",
        fontSize: FontSizes.xxs,
        letterSpacing: 0.2,
    },
    label: {
        fontFamily: FontFamily.Roboto,
        fontWeight: "500",
        fontSize: FontSizes.xs,
        letterSpacing: 0.3,
        textTransform: "uppercase",
    },
    button: {
        fontFamily: FontFamily.Roboto,
        fontWeight: "bold",
        fontSize: FontSizes.sm,
        letterSpacing: 0.5,
        textAlign: "center",
        textTransform: "uppercase",
    },
    input: {
        fontFamily: FontFamily.Roboto,
        fontWeight: "400",
        fontSize: FontSizes.sm,
        letterSpacing: 0.25,
    },
    overline: {
        fontFamily: FontFamily.Roboto,
        fontWeight: "500",
        fontSize: FontSizes.xxxs,
        letterSpacing: 1,
        textTransform: "uppercase",
    },
    mono: {
        fontFamily: FontFamily.SpaceMono,
        fontWeight: "400",
        fontSize: FontSizes.sm,
        letterSpacing: 0.25,
    },
} as const;
 
export default Fonts;