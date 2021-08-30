import React, { Component } from 'react';
import type { ViewProps } from 'react-native';

export interface AwesomeRefreshViewProps extends ViewProps {
  onHeaderMoving?: (e: RefreshEvent) => void; //向外提供的接口,下拉和释放过程中执行,区别在于是否有手势
  onRefreshing?: () => void;
  onReleaseToRefresh?: () => void; // 释放刷新位置
  onRefreshEnd?: (e: any) => void;
  renderHeader?: () => React.ReactElement | React.ReactElement;
  headerHeight: number;
}
type RefreshEvent = {
  nativeEvent: RefreshNativeEvent;
};
type RefreshNativeEvent = {
  percent: number;
  offset: number;
  headerHeight: number;
};
type FinishRefreshParams = { delayed?: number; success?: boolean };
export const SmartRefreshControl: any = null;
export interface AwesomeRefreshView extends Component<AwesomeRefreshViewProps> {
  finishRefresh: (params?: FinishRefreshParams) => void;
}

interface ClassicsHeaderProps extends ViewProps {
  primaryColor?: string;
  accentColor?: string;
}
export class ClassicsHeader extends Component<ClassicsHeaderProps> {}

interface DefaultHeaderProps extends ClassicsHeaderProps {}
export class DefaultHeader extends Component<DefaultHeaderProps> {}

interface AnyHeaderProps extends ViewProps {}
export class AnyHeader extends Component<AnyHeaderProps> {}

// export const AwesomeRefreshViewManager =
//   requireNativeComponent<AwesomeRefreshViewProps>('AwesomeRefreshView');

// export default AwesomeRefreshViewManager;
