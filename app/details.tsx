
import { View, SafeAreaView, Image, FlatList, TouchableOpacity, ScrollView, useWindowDimensions, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { ActivityIndicator, Chip, IconButton } from '@react-native-material/core'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import Utils from '@/constants/Utils'
import HeaderHome from '@/components/HeaderHome'
import { useQuery } from '@tanstack/react-query'
import apis from '@/apis/apis'
import { Chapter } from '@/types/details.type'
import { useLocalSearchParams, useRouter } from 'expo-router'

const ChapterList = ({ chapters }: { chapters: Chapter }) => {
  const colorScheme = useColorScheme()
  let items = chapters.server_data
  if(items.length > 20){
    items = items.slice(0, 20)
  }
  return (
    <View className='w-full px-3'>
      <FlatList
        className='mt-3'
        contentContainerStyle={{ gap: 8 }}
        columnWrapperStyle={{ gap: 8 }}
        scrollEnabled={false}
        numColumns={3}
        data={items} renderItem={({ item, index }) => (
          <View className='flex-1'>
            <Chip style={{ backgroundColor: '', borderWidth: 1, borderColor: colorScheme === 'dark' ? "#ffffff50" : '#00000060' }} labelStyle={{ color: colorScheme === 'dark' ? "#ffffff" : '#000000' }} label={item.chapter_name} className='text-center'></Chip>
          </View>)} />
    </View>
  );
}

const Details = () => {
  const params = useLocalSearchParams()
  const { data: detailsData, isLoading, isFetching } = useQuery({ queryKey: ['details'], queryFn: () => apis.detailsApi(params.slug as string) })
  const router = useRouter()
  const size = useWindowDimensions()
  const colorScheme = useColorScheme();
  const [isLove, setIsLove] = useState(false)

  if (isLoading || isFetching) {
    return (
      <SafeAreaView>
        <View className='w-full h-full flex-row items-center justify-center'>
          <ActivityIndicator size={'large'}></ActivityIndicator>
        </View>
      </SafeAreaView>
    )
  } else {
    return (
      <ScrollView className='dark:bg-[#d7dce0]'>
        <View className='h-full'>
          <View className='relative' style={{ height: size.height / 2 }}>
            <View className='w-full h-full'>
              <Image className='h-full w-full z-10' resizeMode='cover' source={{ uri: detailsData?.data.seoOnPage.seoSchema.image }} />
            </View>
            <View className='absolute top-10 left-0 z-40'>
              <IconButton onPress={() => router.back()} className='' icon={() => (
                <Ionicons color='white' size={24} name='arrow-back' />
              )} />
            </View>
            <View className='z-30 absolute w-full h-full'>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} className='w-full h-full' colors={colorScheme == 'dark' ? ['#17181C00', '#17181C'] : ['#ffffff00', '#000000']} />
            </View>
            <View className='absolute justify-between left-0 px-3 right-0 gap-4 w-screen bottom-6 z-50'>
              <View className='flex-row'>
                <View className='flex-1'>
                  <ThemedText lightColor='white' type='subtitle' className=' opacity-90' style={{ letterSpacing: 4 }}>{detailsData?.data.seoOnPage.seoSchema.director}</ThemedText>
                  <ThemedText lightColor='white' type='title' className='text-xl' numberOfLines={2}>{detailsData?.data.seoOnPage.titleHead}</ThemedText>
                </View>
                <View>
                  <IconButton
                    onPress={() => setIsLove(prev => !prev)}
                    className='bg-red-500'
                    style={{
                      backgroundColor: isLove ? '#E7292950' : '#B0C5A430'
                    }}
                    color='red'
                    icon={() => (
                      <Ionicons className='' name='heart' size={26} color={isLove ? 'red' : '#B0C5A4'} />
                    )} />
                </View>
              </View>
              <View className='flex-1'>
                <ThemedText className='text-red-500' type='defaultSemiBold'>{detailsData?.data.item.chapters[0].server_data.length} <ThemedText lightColor='white'>Chương</ThemedText>
                </ThemedText>
              </View>
            </View>
          </View>
          <View className='border-l-2 mx-3 border-l-[#4d8ba0] my-3 px-3'>
            <View className='border py-2 px-2 bg-[#4d8ba011]' style={{
              borderColor: colorScheme === 'dark' ? '#306172' : '#4d8ba0'
            }}>
              <TouchableOpacity onPress={() => router.push({
                pathname: '/read'
              })}>
                <ThemedText type='link' className='font-bold'> ĐỌC TRUYỆN</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
          <View className='flex-row gap-2 px-3 mt-1 flex-wrap'>
            {
              detailsData?.data.breadCrumb.map(e => {
                return (
                  <Chip key={e.name} label={e.name} style={{ backgroundColor: '', borderWidth: 1, borderColor: '#94897980' }} color={colorScheme === 'dark' ? Utils.ranColorRangeForDark() : Utils.ranColorRangeForLight()} />
                )
              })
            }
          </View>
          <View className='px-3 mt-6'>
            <ThemedText>{detailsData?.data.seoOnPage.descriptionHead}</ThemedText>
          </View>

          <View className='px-3 mt-6'>
            <HeaderHome title='Chapter' subTitle='Danh sách chapter' />
          </View >
          <View className='px-3 mt-3'>
          </View>
          <ChapterList chapters={detailsData?.data.item.chapters[0] as Chapter} />
        </View>
      </ScrollView>
    )
  }
}

export default Details