import React from 'react';
import { Platform, FlatList, StyleSheet } from 'react-native';
import { AwesomeRefreshControl as AwesomeRefreshControlAndroid } from './android';
import {
  AwesomeRefreshControl as AwesomeRefreshControlIOS,
  AwesomeScrollView,
} from './ios';

export interface BoomListProps {
  data: any[];
  headerHeight: number;
  renderItem: (item?: any) => React.ReactElement;
  renderHeader: () => React.ReactElement;
  onHeaderMoving?: () => void;
  onReleaseToRefresh?: () => void;
  onRefreshing?: () => void;
}

function noop() {}

export const BoomList = React.forwardRef(
  (props: BoomListProps, headerRef: any) => {
    const {
      headerHeight,
      onHeaderMoving = noop,
      onReleaseToRefresh = noop,
      onRefreshing = noop,
    } = props;
    return (
      <>
        {Platform.OS === 'android' ? (
          <FlatList
            data={props.data}
            renderItem={() => props.renderItem()}
            keyExtractor={(_, index) => index.toString()}
            refreshControl={
              <AwesomeRefreshControlAndroid
                ref={headerRef}
                headerHeight={headerHeight}
                onHeaderMoving={onHeaderMoving}
                onRefreshing={onRefreshing}
                onReleaseToRefresh={onReleaseToRefresh}
                renderHeader={() => props.renderHeader()}
              />
            }
          />
        ) : null}
        {Platform.OS === 'ios' ? (
          <FlatList
            data={props.data}
            renderItem={(item) => props.renderItem(item)}
            keyExtractor={(_, index) => index.toString()}
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
                    {props.renderHeader && props.renderHeader()}
                  </AwesomeRefreshControlIOS>
                }
                {...scrollProps}
              />
            )}
          />
        ) : null}
      </>
    );
  }
);

const styleSheet = StyleSheet.create({
  iosControl: { flex: 1 },
});

export default BoomList;
