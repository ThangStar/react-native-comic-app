import { View, Text, SafeAreaView, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { ActivityIndicator, Avatar, IconButton, TextInput } from '@react-native-material/core'
import { getAuth, updateProfile } from '@firebase/auth';
import { router } from 'expo-router';
import ThemedAvatar from '@/components/ThemedAvatar';
import { Ionicons } from '@expo/vector-icons';
import { ThemedBottomSheet } from '@/components/ThemedBottomSheet';
import { MView } from '@/components/MView';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { dataUriToBuffer } from 'data-uri-to-buffer';
import { Dialog } from '@rneui/themed';
import MActivityIndicator from './../components/MActivityIndicator';
import { LinearProgress } from '@rneui/base';
import { Toast } from 'toastify-react-native';
const CreateInfo = () => {
  const auth = getAuth();
  useEffect(() => {
    if (!auth.currentUser) {
      router.replace('/')
    }
    return () => {
    }
  }, [auth])
  const [isVisible, setIsVisible] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [displayNameModal, setDisplayNameModal] = useState('')

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    // Upload process
    if (result.assets && result.assets.length > 0) {
      setIsVisibleLoading(true)
      const storage = getStorage();
      const pathRef = ref(storage, getAuth().currentUser?.uid + 'images/avatar.jpg');
      Toast.success("UPDATTING..")
      console.log("URI: " + result.assets[0].uri);
      const res = await fetch(result.assets[0].uri)
      const buffer = await res.blob()
      // let parsed = dataUriToBuffer(result.assets[0].uri);
      // console.log("ArrayBuffer: " + parsed.buffer);
      console.log(getAuth().currentUser)

      await uploadBytes(pathRef, buffer).then(() => {
        // OK!
        console.log("alo2");
        Toast.success("Đã cập nhật!")
        setIsVisibleLoading(false)
      }, (reason) => {
        console.log("alo3", reason);
        Toast.error("Đã xảy ra lỗi", 'top')
      }).catch((reason) => {
        console.log("alo4");
        console.log("ERROR: ", reason);
      }).finally(() => {
        setIsVisibleLoading(false)
      })
      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: displayName ? displayName : 'YOUR NAME',
          photoURL: auth.currentUser?.uid + 'images/avatar.jpg'
        })
      }
    }
  }

  const [isVisibleLoading, setIsVisibleLoading] = useState(false)

  return (
    <SafeAreaView className='py-24'>
      {/* Alert */}
      <ThemedBottomSheet onBackdropPress={() => setIsVisible(false)} isVisible={isVisible} >
        <MView className='bg-red-50 px-3 py-3'>
          <TextInput value={displayNameModal} onChange={(e) => setDisplayNameModal(e.nativeEvent.text)} />
          <Button title='Cập nhật' onPress={() => {
            setDisplayName(displayNameModal)
            setIsVisible(false)
          }}></Button>
        </MView>
      </ThemedBottomSheet>

      <Dialog isVisible={isVisibleLoading} overlayStyle={{
        padding: 0
      }}>
        <MView className='px-6 py-12'>
          <LinearProgress />
          <ThemedText className='my-3 text-end'>Đang cập nhật avatar..</ThemedText>
        </MView>
      </Dialog>
      <ThemedText type='title' className='text-center'>Cập nhật tài khoản của bạn</ThemedText>
      {
        auth.currentUser?.photoURL ? (
          <ThemedAvatar image={{
            uri: auth.currentUser.photoURL
          }} />
        ) : (
          <View className='mx-auto mt-12 relative'>
            <View>
              <ThemedAvatar label="Name" size={100} />
            </View>
            <TouchableOpacity onPress={pickImage} className='absolute -top-1 -right-1 rounded-full bg-[#ffffff10] p-2'>
              <Ionicons name='create-outline' size={18} color={'white'} />
            </TouchableOpacity>
          </View>)
      }

      {/* name */}
      <ThemedText className='text-center my-3 border border-dashed border-white py-3 '>{auth.currentUser?.displayName ?? !displayName ? "YOUR NAME" : displayName}</ThemedText>
      <Button title='Đổi tên' onPress={() => setIsVisible(prev => !prev)} />
      <View className='mt-24'>
        <TouchableOpacity className='bg-blue-500 py-3 w-fit mx-auto px-8'>
          <ThemedText className='text-blue-50'>Tiếp</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default CreateInfo