import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedText } from '@/components/ThemedText'
import { MView } from '@/components/MView'
import { LinearGradient } from 'expo-linear-gradient'
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons'
import ComicCard from '@/components/ComicCard'
import { useQuery } from '@tanstack/react-query'
import apis from '@/apis/apis'
import { ActivityIndicator } from '@react-native-material/core'
import { Data, Item, SeoOnPage } from '@/types/type'
import { Root } from "@/types/type";
import HeaderHome from '@/components/HeaderHome'

const ListComicCard = ({ dataSource }: { dataSource: Data }) => {
  const items = dataSource.items
  return (
    <View className='w-full'>
      <FlatList
        className='mt-3'
        contentContainerStyle={{ gap: 8 }}
        columnWrapperStyle={{ gap: 8 }}
        scrollEnabled={false}
        numColumns={3}
        data={items} renderItem={({ item, index }) => (
          <ComicCard item={item} key={index} image={dataSource?.APP_DOMAIN_CDN_IMAGE + dataSource.seoOnPage.og_image[index]} />
        )} />
    </View>
  );
}

const Index = () => {
  const { data, isLoading } = useQuery({ queryKey: ['home'], queryFn: apis.homeApi });

  if (isLoading) {
    return <ActivityIndicator></ActivityIndicator>
  } else {
    const item: Item[] = data?.data.items as Item[]
    const dataSource = data?.data as Data
    const og_image: string[] = data?.data.seoOnPage.og_image as string[]
    return (
      <ScrollView>
        <View className='px-3'>
          <View className='mt-3'>
            <HeaderHome title='Hàng đầu' subTitle='Top truyện hot gần đây' />
          </View>
          <View className='rounded-2xl mt-3 shadow-sm shadow-slate-800 border-gray-900 border-2'>
            <LinearGradient colors={['', '']} className='flex-row justify-between items-center rounded-2xl shadow-lg relative overflow-hidden'>
              <View className='flex-row justify-between items-center rounded-2xl shadow-lg px-3 py-4 relative overflow-hidden z-40'>
                <LinearGradient className='absolute left-0 top-0 z-20 right-0 bottom-0' colors={['#00000000', '#000000']} />
                <View className='flex-col justify-between h-36 z-30 flex-1'>
                  <View className=''>
                    <ThemedText numberOfLines={3} className='text-white' type='title' ellipsizeMode='tail'>
                      {item[0].name}
                    </ThemedText>
                  </View>
                  <View className='mr-2'>
                    <ThemedText numberOfLines={2} className='text-white'>{item[0].origin_name}</ThemedText>
                  </View>
                </View>
                <View className='rounded-2xl z-40'>
                  <Image className='w-24 border-2 h-36 border-white rounded-2xl' source={{ uri: dataSource?.APP_DOMAIN_CDN_IMAGE + og_image[0] }} />
                </View>
              </View>
              <Image className='rounded-2xl absolute  w-full h-full top-0 bottom-0 z-10 left-0' blurRadius={6} resizeMode='cover' source={{ uri: dataSource?.APP_DOMAIN_CDN_IMAGE + og_image[0] }} />
            </LinearGradient>
          </View>
          <View className="mt-6" >
            <HeaderHome title='Truyện khác' subTitle='Danh sách truyện khác' />
          </View>
          <ListComicCard dataSource={dataSource} />
        </View>
      </ScrollView>
    )
  }
}

export default Index
const styles = StyleSheet.create({})