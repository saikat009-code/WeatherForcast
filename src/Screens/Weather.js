import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';
import {API_KEY} from '../config';
import {Images} from '../Imagespath';

const Weather = ({route, navigation}) => {
  const {city} = route.params;
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWeather();
  }, [city]);

  const getWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}&units=metric`,
    )
      .then(data => data.json())
      .then(result => {
        setLoading(false);
        console.log(result, 'abcd');
        setWeatherData(result);
      });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No data available</Text>
      </View>
    );
  }

  const {name, main, weather} = weatherData;
  const iconUrl =
    weatherData?.weather &&
    `http://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@2x.png`;

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.container1}>
        <View style={styles.cc}>
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => navigation.goBack('')}>
            <Image
              source={Images.arrow}
              style={{
                height: 22,
                width: 22,
                alignSelf: 'center',
                tintColor: 'white',
                right: 30,
              }}
            />
          </TouchableOpacity>
          <Text style={[styles.txt1, {color: 'white', fontSize: 20}]}>
            Weather Forecast
          </Text>
        </View>
      </View>

      {weatherData?.weather ? (
        <View style={styles.mainCon}>
          <View style={styles.inCon}>
            <Text style={styles.txt2}>City :</Text>
            <Text style={[styles.txt1, {marginLeft: 10}]}>{city || '--'}</Text>
          </View>
          <View style={styles.inCon}>
            <Text style={styles.txt2}>Temperature :</Text>
            <Text style={[styles.txt1, {marginLeft: 10}]}>
              {weatherData?.main?.temp + ' °C' || '--'}
            </Text>
          </View>
          <View style={styles.inCon}>
            <Text style={styles.txt2}>Weather :</Text>
            <Text style={[styles.txt1, {marginLeft: 10}]}>
              {(weatherData?.weather && weatherData?.weather[0]?.main) || '--'}
            </Text>
          </View>
          <View style={styles.inCon}>
            <Text style={styles.txt2}>Icon :</Text>

            <Image source={{uri: iconUrl}} style={styles.icon} />
          </View>

          <View style={styles.inCon}>
            <Text style={styles.txt2}>Humidity :</Text>
            <Text style={[styles.txt1, {marginLeft: 10}]}>
              {weatherData?.main?.humidity + ' °C' || '--'}
            </Text>
          </View>

          <View style={styles.inCon}>
            <Text style={styles.txt2}>Wind Speed :</Text>
            <Text style={[styles.txt1, {marginLeft: 10}]}>
              {weatherData?.wind?.speed + ' km/h' || '--'}
            </Text>
          </View>

          <View style={styles.inCon}>
            <Text style={styles.txt2}>Brief forecast :</Text>
            <Text style={[styles.txt1, {marginLeft: 10}]}>
              {(weatherData?.weather && weatherData?.weather[0]?.description) ||
                '--'}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.mainCon}>
          <Text style={styles.txt3}>City not found. Please try again.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container1: {
    height: 80,
    backgroundColor: '#031c45',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  txt1: {color: '#7d151e', fontSize: 18, alignSelf: 'center'},
  mainCon: {
    backgroundColor: '#94f2e1',
    flex: 1,
  },
  inCon: {
    marginTop: 20,
    width: '50%',
    flexDirection: 'row',
    marginLeft: '13%',
  },
  txt2: {color: 'black', fontSize: 22, alignSelf: 'center', fontWeight: '500'},
  icon: {
    height: 30,
    width: 30,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  txt3: {
    color: 'black',
    alignSelf: 'center',
    marginTop: 65,
    fontSize: 20,
  },
  cc: {
    flexDirection: 'row',
    width: '60%',
    alignSelf: 'center',
  },
});
