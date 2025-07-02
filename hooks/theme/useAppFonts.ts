import { FontFamily } from "@/constants/Fonts";
import { useFonts } from "expo-font";
import { useEffect } from "react";

type UseAppFontsProps = {
    onLoad?: () => void;
    onError?: (error: Error) => void;
}

export function useAppFonts({
    onLoad,
    onError,
}: UseAppFontsProps ) {
    const [loaded, error] = useFonts({
        [FontFamily.BebasNeue]: require("@/assets/fonts/BebasNeue-Regular.ttf"),
        [FontFamily.Roboto]: require("@/assets/fonts/Roboto-Regular.ttf"),
        [FontFamily.SpaceMono]: require("@/assets/fonts/SpaceMono-Regular.ttf"),
        [FontFamily.AlPedo]: require("@/assets/fonts/Alpedo-Regular.ttf"),
        [FontFamily.Poppins]: require("@/assets/fonts/Poppins-Regular.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            onLoad?.();
        }
    }, [loaded]);

    useEffect(() => {
        if (error) {
            onError?.(error);
        }
    }, [error]);

    return { loaded, error };
}