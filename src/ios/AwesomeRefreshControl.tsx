import React, { Component } from 'react';
import {
  requireNativeComponent,
  StyleSheet,
  findNodeHandle,
  UIManager,
} from 'react-native';
import type { AwesomeRefreshViewProps } from '../type';

const AwesomeRefreshView = requireNativeComponent<any>('RCTMJRefreshView');

type Props = AwesomeRefreshViewProps;

export class AwesomeRefreshControl extends Component<Props, {}> {
  private refreshRef = React.createRef<any>();

  private onRefreshing = () => {
    const { onRefreshing } = this.props;
    onRefreshing && onRefreshing();
  };

  private onHeaderMoving = (e: any) => {
    const { onHeaderMoving } = this.props;
    onHeaderMoving && onHeaderMoving(e);
  };

  private onRefreshEnd = (e: any) => {
    const { onRefreshEnd } = this.props;
    onRefreshEnd && onRefreshEnd(e);
  };

  public finishRefresh = () => {
    this.dispatchCommand('finishRefresh');
  };

  public beginRefresh = () => {
    this.dispatchCommand('beginRefresh');
  };

  private dispatchCommand = (commandName: string, params?: any[]) => {
    UIManager.dispatchViewManagerCommand(
      this.findNode(),
      (UIManager.getViewManagerConfig
        ? UIManager.getViewManagerConfig('RCTMJRefreshView')
        : (UIManager as any).RCTMJRefreshView
      ).Commands[commandName],
      params
    );
  };

  private findNode = () => {
    return findNodeHandle(this.refreshRef.current);
  };

  render() {
    const { style } = this.props;
    return (
      <AwesomeRefreshView
        ref={this.refreshRef}
        {...this.props}
        onMJRefreshIdle={this.onRefreshEnd}
        onMJRefresh={this.onRefreshing}
        onMJReleaseToRefresh={this.onHeaderMoving}
        onMJPulling={this.onHeaderMoving}
        style={[style, styleSheet.refreshView]}
      />
    );
  }
}
const styleSheet = StyleSheet.create({
  refreshView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    right: 0,
  },
});
export default AwesomeRefreshControl;
