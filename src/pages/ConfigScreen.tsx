import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import {useDebounce} from '../components/useDebounce';

const ConfigScreen = ({navigation, route}: any) => {
  const [duration, setDuration] = useState(route.params.duration.toString());
  const debouncedDuration = useDebounce(duration, 300);

  const handleSave = () => {
    const newDuration = parseInt(debouncedDuration, 10);
    if (!isNaN(newDuration) && newDuration > 0) {
      route.params.setDuration(newDuration);
      navigation.goBack();
    } else {
      Alert.alert('Please enter a valid number');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Light Duration (in milliseconds):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    width: '80%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    borderRadius: 4,
    fontSize: 18,
  },
});

export default ConfigScreen;
