import { DefaultTheme } from "@react-navigation/native";
import color from "./color";
import { Colors } from "react-native/Libraries/NewAppScreen";

const CusthomTheme = {
    DefaultTheme,
    Colors:{
        ...DefaultTheme.colors,
        background: color.principal,
        card: color.variante1,
        text: colors.Default,
    }

    }

    export default  CusthomTheme


