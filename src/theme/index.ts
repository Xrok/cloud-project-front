import { extendTheme } from "@chakra-ui/react";
import colors from "./foundations/colors"
import config from "./foundations/config"
import breakpoints from "./foundations/breakpoints"

const overrides = {
    colors,
    config,
    breakpoints
}

const unleashTheme = extendTheme(overrides);

export default unleashTheme;