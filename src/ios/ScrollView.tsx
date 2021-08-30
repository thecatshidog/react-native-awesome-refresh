import React from 'react';
import {
  requireNativeComponent,
  ScrollViewProps,
  StyleSheet,
} from 'react-native';
const AwesomeScrollViewRn = requireNativeComponent<any>('RCTMJScrollView');

const AwesomeScrollContentView = requireNativeComponent<any>(
  'RCTMJScrollContentView'
);
export class AwesomeScrollView extends React.PureComponent<
  ScrollViewProps,
  any
> {
  render() {
    return (
      <AwesomeScrollViewRn style={styles.baseVertical}>
        {this.props.refreshControl && this.props.refreshControl}
        <AwesomeScrollContentView collapsable={false}>
          {this.props.children}
        </AwesomeScrollContentView>
      </AwesomeScrollViewRn>
    );
  }
}

const styles = StyleSheet.create({
  baseVertical: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: 'column',
    overflow: 'scroll',
  },
});

export default AwesomeScrollView;
