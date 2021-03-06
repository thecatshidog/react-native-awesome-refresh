import React from 'react';
import {
  Platform,
  FlatList,
  StyleSheet,
  FlatListProps,
  PanResponder,
} from 'react-native';
import { AwesomeRefreshControl as AwesomeRefreshControlAndroid } from './android';
import {
  AwesomeRefreshControl as AwesomeRefreshControlIOS,
  AwesomeScrollView,
} from './ios';

export interface BoomListProps extends FlatListProps<any> {
  data: any[];
  headerHeight: number;
  renderItem: (item?: any) => React.ReactElement;
  renderHeader: () => React.ReactElement | React.ReactElement;
  onHeaderMoving?: () => void;
  onReleaseToRefresh?: () => void;
  onRefreshing?: () => void;
}

function noop() {}

const BoomListAndroid = React.forwardRef(
  (props: BoomListProps, headerRef: any) => {
    const {
      data,
      headerHeight,
      renderItem,
      renderHeader,
      onHeaderMoving = noop,
      onReleaseToRefresh = noop,
      onRefreshing = noop,
      ...restProps
    } = props;
    const _panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        const { dy, dx } = gestureState;
        if (dy === 0 && dx === 0) {
          return false;
        }
        return true;
      },
      onMoveShouldSetPanResponderCapture: () => false,
      onPanResponderTerminationRequest: () => true,
      onShouldBlockNativeResponder: () => {
        return false;
      },
    });

    return (
      <FlatList
        {..._panResponder.panHandlers}
        key="flatList"
        data={data}
        renderItem={(item) => renderItem(item)}
        keyExtractor={(_, index) => index.toString()}
        {...restProps}
        refreshControl={
          <AwesomeRefreshControlAndroid
            ref={headerRef}
            headerHeight={headerHeight}
            onHeaderMoving={onHeaderMoving}
            onHeaderReleased={onRefreshing}
            onReleaseToRefresh={onReleaseToRefresh}
            renderHeader={renderHeader}
          />
        }
      />
    );
  }
);

const BoomListIOS = React.forwardRef((props: BoomListProps, headerRef: any) => {
  const {
    data,
    headerHeight,
    renderItem,
    renderHeader,
    onHeaderMoving = noop,
    onReleaseToRefresh = noop,
    onRefreshing = noop,
    ...restProps
  } = props;
  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponder: (_, gestureState) => {
      const { dy, dx } = gestureState;
      if (dy === 0 && dx === 0) {
        return false;
      }
      return true;
    },
    onMoveShouldSetPanResponderCapture: () => false,
    onPanResponderTerminationRequest: () => true,
    onShouldBlockNativeResponder: () => {
      return false;
    },
  });

  return (
    <FlatList
      {..._panResponder.panHandlers}
      data={data}
      renderItem={(item) => renderItem(item)}
      keyExtractor={(_, index) => index.toString()}
      key="flatList"
      {...restProps}
      renderScrollComponent={(scrollProps: any) => (
        <AwesomeScrollView
          style={styleSheet.iosControl}
          refreshControl={
            <AwesomeRefreshControlIOS
              ref={headerRef}
              headerHeight={headerHeight}
              onHeaderMoving={onHeaderMoving}
              onRefreshing={onRefreshing}
              onReleaseToRefresh={onReleaseToRefresh}
            >
              {renderHeader && renderHeader()}
            </AwesomeRefreshControlIOS>
          }
          {...scrollProps}
        />
      )}
    />
  );
});

export const BoomList = Platform.select({
  ios: BoomListIOS,
  android: BoomListAndroid,
  default: BoomListAndroid,
});

const styleSheet = StyleSheet.create({
  iosControl: { flex: 1 },
});

export default BoomList;
