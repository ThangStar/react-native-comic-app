import { View, Text } from 'react-native'
import React from 'react'
import { Avatar, AvatarProps } from '@react-native-material/core'
import { useThemeColor } from '@/hooks/useThemeColor'
type ThemedAvatarProps = AvatarProps & {

}
const ThemedAvatar = (props: ThemedAvatarProps) => {
  const color = useThemeColor({ light: 'white', dark: 'black' }, 'text');
  return (
    <View className='rounded-full border-2 border-[#ffffff20]'>
      <Avatar {...props} color={color}/>
    </View>
  )
}

export default ThemedAvatar