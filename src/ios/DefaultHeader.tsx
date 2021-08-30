import React from 'react';
import { ViewProps, View, Text } from 'react-native';

type IProps = {
  text: string;
} & ViewProps;

export const DefaultHeader = (props: IProps) => {
  return (
    <View
      style={{
        height: 100,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <Text>{props.text}</Text>
    </View>
  );
};

export default DefaultHeader;
