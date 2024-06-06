import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { ReactNode } from 'react'
import { Slot } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
interface Props {
    children: ReactNode,
    onPress?: () => void
}
const Icon = (prop: Props) => {
    return (
        <LinearGradient className="p-2 shadow-2xl rounded-md border-[#ffffff31] border" start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#34C8E860', '#4E4AF260']}>
            <TouchableOpacity onPress={prop.onPress}>
                {prop.children}
            </TouchableOpacity>
        </LinearGradient>
    )
}
export default Icon;

