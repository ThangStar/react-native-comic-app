import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText'
import { Item } from '@/types/type'
import { useNavigation, useRouter } from 'expo-router'

const ComicCard = ({ item, image }: { item: Item, image: string }) => {
    const navigator = useRouter()
    const handleGoToDetails = () => {
        navigator.push({ pathname: "/details", params: { slug: item.slug } })
    }
    return (
        <View className='h-38 flex-1'>
            <TouchableOpacity onPress={handleGoToDetails}>
                <Image className='border-2 w-full h-32 border-gray-600 rounded-2xl' source={{ uri: image }} />
                <View className='py-2'>
                    <ThemedText ellipsizeMode='tail' className='font-bold ' numberOfLines={2}>{item.name}</ThemedText>
                    <ThemedText numberOfLines={2} className='text-sm' >{item.origin_name} </ThemedText>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default ComicCard