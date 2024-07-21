import React from 'react';
import {View, StyleSheet} from 'react-native';

const TrafficLight = ({color}: any) => {
  return (
    <View style={styles.container}>
      <View style={[styles.light, color === 'red' && styles.redLight]} />
      <View style={[styles.light, color === 'yellow' && styles.yellowLight]} />
      <View style={[styles.light, color === 'green' && styles.greenLight]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
  },
  light: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#bbb',
    margin: 5,
  },
  redLight: {
    backgroundColor: 'red',
  },
  yellowLight: {
    backgroundColor: 'yellow',
  },
  greenLight: {
    backgroundColor: 'green',
  },
});

export default TrafficLight;
