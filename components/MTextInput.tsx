import { View, Text, TextInput, NativeSyntheticEvent, TextInputChangeEventData, TextInputProps } from 'react-native'
import React from 'react'

type Props = TextInputProps & {
    
}
const MTextInput = ({ ...otherProps }: Props) => {
    return (
        <TextInput
            {...otherProps}
            placeholderTextColor={'#9c3b3b80'}
            className='bg-transparent outline-none py-3 px-4 text-red-500  border-[#9c3b3b] focus:border-red-500'
            underlineColorAndroid={'#00000000'}
            style={{
                backgroundColor: '#9c3b3b10',
                borderWidth: 2,
                // borderColor: '#9c3b3b',
            }}></TextInput>
    )
}

export default MTextInput