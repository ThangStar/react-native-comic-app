import { View, Text, Image, useWindowDimensions, FlatList, SafeAreaView, ActivityIndicator, useColorScheme, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { useLocalSearchParams } from 'expo-router'
import { QueryCache, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import apis from '@/apis/apis'
import { RootDetails } from '@/types/details.type'
import { Ionicons } from '@expo/vector-icons'
import { IconButton } from '@react-native-material/core'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur'
import { isLoading } from 'expo-font'
import { RootChapter } from '@/types/chapter.type'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import Config from '@/constants/Config'
import { Colors } from '@/constants/Colors'

const ImageRead = ({ uri }: { uri: string }) => {
    const [isLoading, setIsLoading] = useState(true)
    const handleLoadStart = () => {
        setIsLoading(true);
    };

    const handleLoadEnd = () => {
        setIsLoading(false);
    };

    const size = useWindowDimensions()
    return (
        <View>
            {isLoading && <View className='w-full p-12 h-96'>
                <ActivityIndicator className='border w-full h-full border-gray-800  border-separate' size={'large'} />
            </View>}
            <Image
                onLoadStart={handleLoadStart}
                onLoadEnd={handleLoadEnd}
                resizeMode='center' className='bg-transparent'
                style={{ height: size.height, width: size.width }} source={{ uri: uri }} />
        </View>
    )

}

const Read = () => {
    const queryClient = useQueryClient();
    const detailsData = queryClient.getQueryData(["details"]) as RootDetails
    const params = useLocalSearchParams()
    const [data, setData] = useState<RootChapter | undefined>()
    const colorScheme = useColorScheme()
    const [darkModeSetting, setDarkModeSetting] = useState<boolean>(Config.darkModeReadPage)
    const [chapter, setChapter] = useState({
        page: 0
    })
    const { data: chapterData, isLoading, isError, error, isFetching, isPending } = useQuery({
        queryKey: ['read'], queryFn: () => apis.chapterApi(detailsData.data.item.chapters[0].server_data[chapter.page].chapter_api_data as string)
    })

    const totalChapter = detailsData.data.item.chapters[0].server_data.length
    const chapterMutation = useMutation({
        mutationKey: ['read'], mutationFn: (chapter: {
            page: number
        }) => apis.chapterApi(detailsData.data.item.chapters[0].server_data[chapter.page].chapter_api_data as string), onError(error, variables, context) {
            return (<ThemedText>ERROR {error.message}</ThemedText>)
        },
        onSuccess(data, variables, context) {
            console.log("mutation OK!");
            setData(data)
        },
    })

    const handleNextChapter = () => {
        if (chapter.page > totalChapter) {
            return
        }

        // setChapter(prev => ++prev)
        chapter.page = chapter.page + 1
        chapterMutation.mutateAsync(chapter)
    }
    const handlePreviousChapter = () => {
        if (chapter.page < 1) {
            return
        }
        // setChapter(prev => --prev)
        chapter.page = chapter.page - 1
        chapterMutation.mutateAsync(chapter)
    }
    useEffect(() => {
        if (!isLoading) {
            setData(chapterData)
        }
    }, [chapterData, isLoading])

    if (isLoading || isFetching || isPending || chapterMutation.isPending) {
        return (<SafeAreaView>
            <View className='w-full h-full flex-row items-center justify-center'>
                <ActivityIndicator size={'large'}></ActivityIndicator>
            </View>
        </SafeAreaView>)
    } else if (isError) {
        return (
            <SafeAreaView>
                <ThemedText>Đã xảy ra lỗi {JSON.stringify(error.message)} </ThemedText>
            </SafeAreaView>)
    }
    const handleChangeMode = (isDark: boolean) => {
        Config.darkModeReadPage = isDark    
        setDarkModeSetting(isDark)
    }
    return (
        <View className='relative' style={{
            backgroundColor: darkModeSetting ? 'black' : Colors.light.background
        }}>
            <View className='absolute p-24'>
                <ThemedText></ThemedText>
            </View>
            <View className='bottom-0 left-0 right-0 absolute z-10'>
                <BlurView intensity={50}>
                    <View className='w-full flex-row relative'>
                        <LinearGradient colors={['#00000060', '#000000']} className='pb-6 pt-3 ' >
                            <View className='flex-row justify-between w-full items-center'>
                                <View className=''>
                                    <IconButton onPress={handlePreviousChapter} icon={() => (
                                        <Ionicons name='arrow-back' className='px-3 ' size={24} color={'#ffffff90'}></Ionicons>
                                    )} />
                                </View>
                                <View>
                                    <ThemedText type='title' lightColor='#ffffff'>Chương <ThemedText type='title' style={{
                                        color: '#FF9F66'
                                    }}>{chapter.page + 1}</ThemedText> / {totalChapter}</ThemedText>
                                </View>
                                <View className='flex-row'>
                                    <View className='rounded-full '>
                                        <IconButton icon={
                                            (
                                                <Menu style={{
                                                    width: "100%",
                                                    height: "100%"
                                                }}>
                                                    <MenuTrigger style={{
                                                        width: "100%",
                                                        height: "100%"
                                                    }}>
                                                        <View className='flex-row items-center h-full justify-center'>
                                                            <Ionicons name='settings' size={24} color={'#E2DFD0'}></Ionicons>
                                                        </View>
                                                    </MenuTrigger>
                                                    <MenuOptions optionsContainerStyle={{ backgroundColor: colorScheme === 'dark' ? '#322C2B' : '#eee' }}>
                                                        <ThemedText type='subtitle' className='px-3 py-3 border-b  ' style={{
                                                            borderColor: colorScheme === 'dark' ? 'white' : 'rgb(209 213 219)'
                                                        }}>Chế độ</ThemedText>
                                                        <MenuOption customStyles={{
                                                            optionWrapper: {
                                                                padding: 12
                                                            }
                                                        }} onSelect={() => handleChangeMode(false)}>
                                                            <View className='flex-row justify-between items-center'>
                                                                <ThemedText>Sáng</ThemedText>
                                                                {!darkModeSetting && <Ionicons name='checkmark' size={18} color={colorScheme === 'dark' ? 'white' : ''} />}
                                                            </View>
                                                        </MenuOption>
                                                        <MenuOption customStyles={{
                                                            optionWrapper: {
                                                                padding: 12
                                                            }
                                                        }} onSelect={() => handleChangeMode(true)}>
                                                            <View className='flex-row justify-between items-center'>
                                                                <ThemedText>Tối</ThemedText>
                                                                {darkModeSetting && <Ionicons name='checkmark' size={18} color={colorScheme === 'dark' ? 'white' : ''} />}
                                                            </View>
                                                        </MenuOption>
                                                    </MenuOptions>
                                                </Menu>

                                            )
                                        }>
                                        </IconButton>
                                    </View>
                                    <View className=''>
                                        <IconButton onPress={handleNextChapter} icon={() => (
                                            <Ionicons name='arrow-forward' className='px-3' size={24} color={'#ffffff90'}></Ionicons>
                                        )} />
                                    </View>
                                </View>
                            </View>
                        </LinearGradient>
                    </View>
                </BlurView>
            </View>

            <View>
                <FlatList data={data?.data.item.chapter_image}
                    renderItem={({ item, index }) => (
                        <ImageRead key={index} uri={`${data?.data.domain_cdn}/${data?.data.item.chapter_path}/${item.image_file}`} />
                    )}
                >
                </FlatList>
            </View>
        </View>
    )
}

export default Read