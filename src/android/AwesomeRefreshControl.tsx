import React, { Component } from 'react';
import {
  requireNativeComponent,
  findNodeHandle,
  UIManager,
  NativeModules,
  Platform,
} from 'react-native';
import DefaultHeader from './DefaultHeader';
import { AnyHeader } from './AnyHeader';
import type { AwesomeRefreshViewProps } from '../type';

const SPModule =
  Platform.OS === 'android' ? NativeModules.SpinnerStyleModule : {};

export const AwesomeRefreshView =
  requireNativeComponent<AwesomeRefreshViewProps>('AwesomeRefreshView');

export class AwesomeRefreshControl extends Component<
  AwesomeRefreshViewProps,
  {}
> {
  private refreshRef = React.createRef<any>();
  static defaultProps = {
    overScrollBounce: false,
  };

  static constants = {
    TRANSLATE: SPModule.translate,
    SCALE: SPModule.scale,
    FIX_BEHIND: SPModule.fixBehind,
    FIX_FRONT: SPModule.fixFront,
    MATCH_LAYOUT: SPModule.matchLayout,
  };

  /**
   * 参数格式为{delayed:number,success:bool}
   * delayed:延迟刷新
   * success:是否刷新成功
   * @param params
   */
  finishRefresh = (
    { delayed = -1, success = true } = { delayed: -1, success: true }
  ) => {
    this.dispatchCommand('finishRefresh', [delayed, success]);
  };

  dispatchCommand = (commandName: string, params: any[]) => {
    UIManager.dispatchViewManagerCommand(
      this.findNode(),
      (UIManager.getViewManagerConfig
        ? UIManager.getViewManagerConfig('AwesomeRefreshView')
        : (UIManager as any).AwesomeRefreshView
      ).Commands[commandName],
      params
    );
  };

  findNode = () => {
    return findNodeHandle(this.refreshRef.current);
  };

  shiftPercent = 0; //header位移百分比，默认为0

  footerShiftPercent = 0; // footer位移百分比
  /**
   * 渲染Header
   * @return {*}
   */
  renderHeader = () => {
    const { renderHeader, headerHeight } = this.props;
    if (renderHeader) {
      return (
        <AnyHeader
          style={{
            height: headerHeight,
            overflow: 'hidden',
          }}
        >
          {React.isValidElement(renderHeader) ? renderHeader : renderHeader()}
        </AnyHeader>
      );
    }
    return <DefaultHeader />;
  };
  /**
   * 刷新时触发
   * @private
   */
  _onSmartRefresh = () => {
    let { onRefreshing } = this.props;
    onRefreshing && onRefreshing();
  };
  /**
   * 底部位移过程
   * @param event
   * @private
   */
  onHeaderMoving = (event: any) => {
    let { onHeaderMoving } = this.props;
    onHeaderMoving && onHeaderMoving(event);
  };
  /**
   * 底部位移过程
   * @param event
   * @private
   */
  onFooterMoving = (event: any) => {
    this.footerShiftPercent = event.nativeEvent.percent;
  };

  render() {
    const nativeProps = {
      ...this.props,
      ...{
        onSmartRefresh: this._onSmartRefresh,
        onHeaderMoving: this.onHeaderMoving,
        onFooterMoving: this.onFooterMoving,
      },
    };
    return (
      <AwesomeRefreshView ref={this.refreshRef} {...nativeProps}>
        {this.renderHeader()}
        {this.props.children}
      </AwesomeRefreshView>
    );
  }
}
export default AwesomeRefreshControl;
