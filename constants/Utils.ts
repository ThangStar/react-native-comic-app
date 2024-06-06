import Constants from "./Constants"

const Utils = {
    ranColorRangeForDark: (): string => {
        return Constants.colorsRandForDark[Math.floor(Math.random() * Constants.colorsRandForDark.length)]
    },
    ranColorRangeForLight: (): string => {
        return Constants.colorsRandForLight[Math.floor(Math.random() * Constants.colorsRandForLight.length)]
    }
}

export default Utils