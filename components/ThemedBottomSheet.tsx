import { BottomSheet, BottomSheetProps, ListItem } from '@rneui/themed';
import { ReactNode, useState } from 'react';
type Props = BottomSheetProps & {
    children?: ReactNode
}
export const ThemedBottomSheet = (props: Props) => {
    return (
        <BottomSheet {...props} modalProps={{}} containerStyle={{
        }}>
            {props.children}
        </BottomSheet>
    )
}
