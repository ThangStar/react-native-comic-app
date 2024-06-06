import { View, SafeAreaView, NativeSyntheticEvent, TextInputChangeEventData, TouchableOpacity, Image, FlatList, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { Button } from '@react-native-material/core'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Toast } from 'toastify-react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
const Login = () => {
    const params = useLocalSearchParams()
    const auth = getAuth();
    const router = useRouter()
    const handleLogin = async (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password).then(e => {
            Toast.success("Đăng nhập thành công!")
            router.push('index')
        }).catch(err => {
            switch (err.code) {
                case 'auth/invalid-email':
                    Toast.error("Địa chỉ email không chính xác", 'top');
                    break;
                case 'auth/invalid-credential':
                    console.log("Tài khoản hoặc mật khẩu không chính xác");
                    Toast.error("Tài khoản hoặc mật khẩu không chính xác", 'center');
                    break;
                default:
            }
        })
    }

    const handleCreateAccount = async (email: string, password: string) => {
        console.log('start register!');
        createUserWithEmailAndPassword(auth, email, password).then(data => {
            // Toast.success("Đăng kí thành công!")
        }).catch(err => {
            switch (err.code) {
                case 'auth/email-already-in-use':
                    console.log("email da dc su dung");
                    break
                case 'auth/invalid-email':
                    console.log("email ko hop le");
                    break;
                default:
                // Toast.error("Đã xảy ra lỗi", 'top');
            }
        })

    }
    const [email, setemail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const onChangeemail = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setemail(e.nativeEvent.text)
    }
    const onChangePassword = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setPassword(e.nativeEvent.text)
    }

    const [remember, setRemember] = useState(false)
    return (
        <View className='flex-1'>
            <View className='mb-2 flex-1'>
                <View className='relative'>
                    <Image className='w-full h-full' resizeMode='cover' source={require('@/assets/images/spiderman.jpg')} />
                    <LinearGradient colors={['#00000000', '#17181C']} className='absolute w-full h-full ' />
                </View>
            </View>
            <KeyboardAwareScrollView  className='flex-[1.9]'>
                <View className='px-6'>
                    <ThemedText className='text-center text-3xl text-[#9c3b3b] mb-3' type='title'>Chào mừng quay trở lại</ThemedText>
                    <ThemedText className='text-xl mt-6 mb-3 text-[#b43030]'>Địa chỉ email</ThemedText>
                    <TextInput
                        placeholder='Example@email.com'
                        placeholderTextColor={'#9c3b3b80'}
                        onChange={onChangeemail}
                        value={email}
                        className='bg-transparent outline-none py-3 px-4 text-red-500  border-[#9c3b3b] focus:border-red-500'
                        underlineColorAndroid={'#00000000'}
                        style={{
                            backgroundColor: '#9c3b3b10',
                            borderWidth: 2,
                            // borderColor: '#9c3b3b',
                        }}></TextInput>
                    <ThemedText className='text-xl mt-6 mb-3 text-[#b43030]'>Mật khẩu</ThemedText>
                    <TextInput
                        secureTextEntry
                        placeholderTextColor={'#9c3b3b80'}
                        placeholder='*********'
                        className='bg-transparent outline-none text-red-500 py-3 px-4  border-[#9c3b3b] focus:border-red-500'
                        value={password}
                        onChange={onChangePassword}
                        style={{
                            backgroundColor: '#9c3b3b10',
                            borderWidth: 2,
                        }}></TextInput>
                    <View className='my-6 flex-row gap-x-3 items-start' >
                        <Checkbox value={remember} color={'#b43030'} onValueChange={() => setRemember(prev => !prev)} />
                        <ThemedText className='text-[#c54b4b]'>Ghi nhớ đăng nhập</ThemedText>
                    </View>
                    <TouchableOpacity onPress={() => handleLogin(email, password)}>
                        <LinearGradient colors={['#770000', '#9c3b3b']} start={{ x: 0, y: 1 }} style={{ borderRadius: 6 }} className='py-4'>
                            <ThemedText className='text-center text-xl text-white' type='defaultSemiBold' >ĐĂNG NHẬP</ThemedText>
                        </LinearGradient>
                    </TouchableOpacity>
                    {/* <ThemedText onPress={() => handleCreateAccount(email, password)} >ĐĂNG KÍ</ThemedText> */}
                    <View className='flex-row justify-between items-center mt-3 border-[#9c3b3b50] border-b pb-3'>
                        <TouchableOpacity>
                            <ThemedText className='text-[#c54b4b] text-end' type='link'>Bạn quên mật khẩu?</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <ThemedText className='text-[#c54b4b] text-end'>Tạo tài khoản mới</ThemedText>
                        </TouchableOpacity>
                    </View>
                    <ThemedText className='text-[#c54b4b] text-center py-4' type='link'>@commic_app</ThemedText>
                </View>
            </KeyboardAwareScrollView>
        </View>
    )
}

export default Login