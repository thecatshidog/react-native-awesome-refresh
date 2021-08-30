import React from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';
const RCTDefaultHeader = requireNativeComponent('RCTDefaultHeader');

type IProps = {
  primaryColor?: string;
  accentColor?: string;
} & ViewProps;

export const DefaultHeader = (props: IProps) => {
  return <RCTDefaultHeader {...props} />;
};

export default DefaultHeader;
