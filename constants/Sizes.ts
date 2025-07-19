const sizes = {
    compact: {
        xxxs: 2,
        xxs: 4,
        xs: 6,
        sm: 8,
        md: 10,
        lg: 12,
        xl: 16,
        xxl: 20,
        xxxl: 24,
    },
    comfortable: {
        xxxs: 4,
        xxs: 8,
        xs: 12,
        sm: 16,
        md: 20,
        lg: 24,
        xl: 32,
        xxl: 40,
        xxxl: 48,
    },
}

export default sizes;

export type Sizes = typeof sizes;   
export type ThemedSizes = Sizes[keyof Sizes];

type CompactSizeScheme = keyof typeof sizes.compact;
type ComfortableSizeScheme = keyof typeof sizes.comfortable;
let _compactKey = "text" as CompactSizeScheme;
let _comfortableKey = "text" as ComfortableSizeScheme;
let _testCompactKey: CompactSizeScheme = _comfortableKey;
let _testComfortableKey: ComfortableSizeScheme = _compactKey;