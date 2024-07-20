import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Images} from '../Imagespath';
import LottieView from 'lottie-react-native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  }, []);

  return <LottieView source={Images.splash} autoPlay loop style={{flex: 1}} />;
};

export default Splash;

const styles = StyleSheet.create({});
