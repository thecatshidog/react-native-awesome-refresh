import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { BoomList } from 'react-native-awesome-refresh';

function BoomHeader(props: any) {
  console.log('update', props);
  return (
    <Text style={{ height: 80, backgroundColor: 'green' }}>{props.text}</Text>
  );
}

export default function App() {
  const headerRef = useRef<any>();
  const [text, setText] = useState('下拉刷新');
  console.log('更新');
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
          data={Array(30).fill(0)}
          headerHeight={80}
          renderItem={() => (
            <TouchableWithoutFeedback
              onPress={(e) => {
                e.stopPropagation();
                console.log('track');
              }}
            >
              <View style={{ height: 80, backgroundColor: 'pink' }}>
                <Text>hello item</Text>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                  }}
                  source={{ uri: 'https://z3.ax1x.com/2021/07/29/WbEpjJ.png' }}
                />
              </View>
            </TouchableWithoutFeedback>
          )}
          ref={headerRef}
          renderHeader={() => <BoomHeader text={text} />}
          onReleaseToRefresh={() => {}}
          onRefreshing={() => {
            setText('刷新中');
            setTimeout(() => {
              setText('刷新完成');
              headerRef.current && headerRef.current.finishRefresh();
            }, 2000);
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
