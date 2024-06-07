import { View, Text, ActivityIndicator, ActivityIndicatorProps } from 'react-native'
import React from 'react'

type Props = ActivityIndicatorProps & {

}
const MActivityIndicator = ({ ...props }: Props) => {
    return (
        <ActivityIndicator {...props} color={'red'} />
    )
}

export default MActivityIndicator