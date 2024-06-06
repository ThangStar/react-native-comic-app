import { View, useColorScheme } from "react-native"
import { ThemedText } from "./ThemedText"
import { Ionicons } from "@expo/vector-icons"

const HeaderHome = ({ title, subTitle }: { title: string, subTitle: string }) => {
    const colorScheme = useColorScheme()
    return (
        <>
            <ThemedText type='title'>{title}</ThemedText>
            <View className='flex-row items-center justify-between'>
                <ThemedText className="opacity-80">{subTitle}</ThemedText>
                <View className='flex-row items-center gap-1 justify-center'>
                    <ThemedText className='mt-2 opacity-80'>Xem thêm</ThemedText>
                    <Ionicons name='chevron-forward' size={16} color={colorScheme === 'dark' ? '#ffffff80' : '#00000080'} />
                </View>
            </View>
        </>
    )
}

export default HeaderHome