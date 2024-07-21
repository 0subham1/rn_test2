// TrafficSimulation.js
import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import TrafficLight from '../components/TrafficLight';

const TrafficSimulation = ({navigation}) => {
  const [lights, setLights] = useState({
    north: 'red',
    east: 'red',
    south: 'red',
    west: 'red',
  });
  const [isAmbulance, setIsAmbulance] = useState(false);
  const [duration, setDuration] = useState(3000); // Default duration

  useEffect(() => {
    if (isAmbulance) {
      setLights({
        north: 'red',
        east: 'red',
        south: 'red',
        west: 'red',
      });
      return;
    }

    const interval = setInterval(() => {
      setLights(prevLights => {
        const nextLights = {...prevLights};
        if (prevLights.north === 'green') {
          nextLights.north = 'yellow';
        } else if (prevLights.north === 'yellow') {
          nextLights.north = 'red';
          nextLights.east = 'green';
        } else if (prevLights.east === 'green') {
          nextLights.east = 'yellow';
        } else if (prevLights.east === 'yellow') {
          nextLights.east = 'red';
          nextLights.south = 'green';
        } else if (prevLights.south === 'green') {
          nextLights.south = 'yellow';
        } else if (prevLights.south === 'yellow') {
          nextLights.south = 'red';
          nextLights.west = 'green';
        } else if (prevLights.west === 'green') {
          nextLights.west = 'yellow';
        } else if (prevLights.west === 'yellow') {
          nextLights.west = 'red';
          nextLights.north = 'green';
        } else {
          nextLights.north = 'green';
        }
        return nextLights;
      });
    }, duration); // Change light every `duration` milliseconds

    return () => clearInterval(interval);
  }, [isAmbulance, duration]);

  const handleAmbulance = () => {
    setIsAmbulance(true);
    setTimeout(() => setIsAmbulance(false), 5000); // Ambulance presence duration
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TrafficLight color={lights.north} />
      </View>
      <View style={styles.row}>
        <TrafficLight color={lights.west} />
        <View style={styles.spacer} />
        <TrafficLight color={lights.east} />
      </View>
      <View style={styles.row}>
        <TrafficLight color={lights.south} />
      </View>
      <View style={{margin: 10}}>
        <Button title="Activate Ambulance" onPress={handleAmbulance} />
      </View>
      <Button
        title="Configure Light Duration"
        onPress={() =>
          navigation.navigate('Config', {
            duration,
            setDuration,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spacer: {
    width: 100,
    height: 100,
  },
});

export default TrafficSimulation;
