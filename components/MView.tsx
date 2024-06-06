import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type MViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function MView({ style, lightColor, darkColor, ...otherProps }: MViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
