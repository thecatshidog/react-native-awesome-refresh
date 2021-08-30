import React from 'react';
import { requireNativeComponent, ViewProps } from 'react-native';

const RCTAnyHeader = requireNativeComponent('RCTAnyHeader');

type IProps = {
  children: React.ReactNode;
} & ViewProps;

export const AnyHeader = (props: IProps) => {
  return <RCTAnyHeader {...props} />;
};

export default AnyHeader;
