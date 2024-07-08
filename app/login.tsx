import { View, NativeSyntheticEvent, TextInputChangeEventData, TouchableOpacity, Image, LayoutAnimation } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedText } from '@/components/ThemedText'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from '@firebase/auth';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Toast } from 'toastify-react-native'
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import MTextInput from '@/components/MTextInput';
import MActivityIndicator from '@/components/MActivityIndicator';
import { getStoreData, storeData } from '@/utils/utils';
const Login = () => {
    const params = useLocalSearchParams()
    const auth = getAuth();
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const handleLogin = async (email: string, password: string) => {
        setIsLoading(true)
        try {
            // basic check
            if (!email || !password) {
                Toast.warn("Tài khoản hoặc mật khẩu không được để trống", "top")
                return
            }
            await signInWithEmailAndPassword(auth, email, password).then(e => {
                const authUser: AuthUser = {
                    username: email,
                    password: password
                }
                if (auth.currentUser?.photoURL && auth.currentUser?.displayName) {
                    Toast.success("Đăng nhập thành công!")
                    // router.replace('/')
                    router.navigate('/createInfo')
                } else {
                    router.navigate('/createInfo')
                }
                // if(aut)
            }).catch(err => {
                switch (err.code) {
                    case 'auth/invalid-email':
                        Toast.error("Địa chỉ email không chính xác", 'top');
                        break;
                    case 'auth/invalid-credential':
                        Toast.error("Tài khoản hoặc mật khẩu không chính xác", 'top');
                        break;
                    default:
                }
            })
        } catch (error) {

        } finally {
            setIsLoading(false)
        }

    }

    const handleCreateAccount = async (email: string, password: string, rePassword: string) => {
        console.log('start register!');
        setIsLoading(true)
        try {
            if (!email || !password || !rePassword) {
                Toast.warn("Bạn chưa điền đầy đủ thông tin", "top")
                return
            }
            if (password !== rePassword) {
                Toast.warn("Nhập lại mật khẩu không giống nhau", "top")
                return
            }
            await createUserWithEmailAndPassword(auth, email, password).then(data => {
                Toast.success("Đăng kí thành công!")
            }).catch(err => {
                switch (err.code) {
                    case 'auth/email-already-in-use':
                        console.log("email da dc su dung");
                        Toast.warn("Email này đã được sử dụng", 'top');
                        break
                    case 'auth/invalid-email':
                        Toast.warn("Email không hợp lệ", 'top');
                        console.log("Email không hợp lệ");
                        break;
                    default:
                        Toast.error("Đã xảy ra lỗi", 'top');
                }
            })
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    const [email, setemail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rePassword, setRePassword] = useState<string>('')

    interface AuthUser {
        username: string,
        password: string
    }
    const getAuthUser = async () => {
        const authUser = await getStoreData('AUTH_USER')
        if (authUser) {
            setemail((authUser as AuthUser).username)
            setPassword((authUser as AuthUser).password)
        }
    }

    const saveAuthUser = async (authUser: AuthUser) => {
        await storeData("AUTH_USER", authUser)
    }
    useEffect(() => {
        getAuthUser()
    }, [])
    const onChangemail = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setemail(e.nativeEvent.text)
    }
    const onChangePassword = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setPassword(e.nativeEvent.text)
    }
    const onChangeRePassword = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setRePassword(e.nativeEvent.text)
    }

    const [remember, setRemember] = useState(false)
    const [isLogin, setisLogin] = useState(true)
    return (
        // <SQLiteProvider databaseName='comic_db.db' onInit={SqlLiteInit}>
        <View className='flex-1 bg-[#17181C]'>
            <View className='mb-2' style={{
                flex: isLogin ? 1 : 0.5
            }}>
                <View className='relative'>
                    <Image className='w-full h-96' resizeMode='cover' source={require('@/assets/images/spiderman.jpg')} />
                    <LinearGradient colors={['#00000000', '#17181C']} className='absolute w-full h-full ' />
                </View>
            </View>
            <KeyboardAwareScrollView className='flex-[1.9]'>
                <View className='px-6 h-full translate-x-0'>
                    <ThemedText className='text-center text-3xl text-[#9c3b3b] mb-3' type='title'>{isLogin ? 'Chào mừng quay trở lại' : 'Đăng kí thành viên mới'}</ThemedText>
                    <ThemedText className='text-xl mt-6 mb-3 text-[#b43030]'>Địa chỉ email</ThemedText>
                    <MTextInput onChange={onChangemail} value={email} placeholder='Example@email.com'></MTextInput>
                    <ThemedText className='text-xl mt-6 mb-3 text-[#b43030]'>Mật khẩu</ThemedText>
                    <MTextInput onChange={onChangePassword} value={password} placeholder='******' secureTextEntry></MTextInput>
                    {!isLogin && (<View>
                        <ThemedText className='text-xl mt-6 mb-3 text-[#b43030]'>Nhập lại mật khẩu</ThemedText>
                        <MTextInput onChange={onChangeRePassword} value={rePassword} placeholder='******' secureTextEntry></MTextInput>
                    </View>)}
                    <View className='my-6 flex justify-start' >
                        {isLogin && (<View className=' flex-row gap-x-3 items-start'>
                            <Checkbox value={remember} color={'#b43030'} onValueChange={() => setRemember(prev => !prev)} />
                            <ThemedText className='text-[#c54b4b]'>Ghi nhớ đăng nhập</ThemedText>
                        </View>)}
                    </View>
                    <TouchableOpacity onPress={() => {
                        isLogin ?
                            handleLogin(email, password)
                            :
                            handleCreateAccount(email, password, rePassword)
                    }}>

                        <LinearGradient colors={!isLoading ? ['#770000', '#9c3b3b'] : ['#77000020', '#9c3b3b20']} start={{ x: 0, y: 1 }} style={{ borderRadius: 6 }} className='py-4 relative'>
                            {isLoading && (
                                <MActivityIndicator className='absolute top-0 bottom-0 left-10' />
                            )}
                            <ThemedText className='text-center text-xl' style={{
                                color: !isLoading ? '#ffffffda' : '#ffffff60'
                            }} type='defaultSemiBold' >{isLogin ? !isLoading ? 'ĐĂNG NHẬP' : 'Đang đăng nhập..' : isLoading ? 'Đang đăng kí' : 'ĐĂNG KÍ'}</ThemedText>
                        </LinearGradient>
                    </TouchableOpacity>
                    {/* <ThemedText onPress={() => handleCreateAccount(email, password)} >ĐĂNG KÍ</ThemedText> */}
                    <View className='flex-row justify-between items-center mt-3 border-[#9c3b3b50] border-b pb-3'>
                        <TouchableOpacity>
                            <ThemedText className='text-[#c54b4b] text-end' type='link'>Bạn quên mật khẩu?</ThemedText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                            setisLogin(prev => !prev)
                        }}>
                            <ThemedText className='text-[#c54b4b] text-end'>{isLogin ? 'Tạo tài khoản mới' : 'Đã có tài khoản?'}</ThemedText>
                        </TouchableOpacity>
                    </View>
                    <ThemedText className='text-[#c54b4b] text-center py-4' type='link'>@commic_app</ThemedText>
                </View>
            </KeyboardAwareScrollView>
        </View>
        // </SQLiteProvider>
    )
}

export default Login