import { requireNativeComponent, ViewStyle } from 'react-native';

type AwesomeRefreshProps = {
  color: string;
  style: ViewStyle;
};

export const AwesomeRefreshViewManager = requireNativeComponent<AwesomeRefreshProps>(
'AwesomeRefreshView'
);

export default AwesomeRefreshViewManager;
