import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { BoomList } from 'react-native-awesome-refresh';

export default function App() {
  const headerRef = useRef<any>();
  const [text, setText] = useState('下拉刷新');
  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          backgroundColor: 'yellow',
          overflow: 'hidden',
        }}
      >
        <BoomList
          data={Array(10).fill(0)}
          headerHeight={80}
          renderItem={() => (
            <View style={{ height: 80, backgroundColor: 'pink' }}>
              <Text>hello item</Text>
            </View>
          )}
          ref={headerRef}
          renderHeader={() => (
            <Text style={{ height: 80, backgroundColor: 'green' }}>{text}</Text>
          )}
          onReleaseToRefresh={() => {}}
          onRefreshing={() => {
            setText('刷新中');
            setTimeout(() => {
              setText('刷新完成');
              headerRef.current && headerRef.current.finishRefresh();
            }, 3000);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'red',
    paddingTop: 200,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
