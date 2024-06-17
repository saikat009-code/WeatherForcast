import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Images} from './Imagespath';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [city, setCity] = useState('');

  const handleSearch = () => {
    if (!city.trim()) {
      Alert.alert('Please enter a city name');
      return;
    }
    navigation.navigate('Weather', {city});
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.txt1}>Weather Forecast</Text>
      </View>
      <View style={styles.mainCon}>
        <View style={styles.searchCon}>
          <TextInput
            style={{
              color: 'white',
              width: '85%',
              fontSize: 18,
            }}
            onChangeText={txt => setCity(txt)}
            placeholder="Enter your city"></TextInput>
          <Image
            source={Images.search}
            style={{height: 22, width: 22, alignSelf: 'center'}}
          />
        </View>

        <TouchableOpacity onPress={handleSearch} style={styles.btn}>
          <Text style={styles.txt2}>Search</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: Colors.darker,
    justifyContent: 'center',
  },
  txt1: {color: 'white', fontSize: 25, alignSelf: 'center'},
  mainCon: {
    backgroundColor: '#787d78',
    flex: 1,
  },
  searchCon: {
    width: '85%',
    borderWidth: 2,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 46,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 4,
    paddingHorizontal: 5,
  },
  btn: {
    height: 46,
    width: '40%',
    backgroundColor: 'black',
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 10,
    justifyContent: 'center',
  },
  txt2: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
  },
});
