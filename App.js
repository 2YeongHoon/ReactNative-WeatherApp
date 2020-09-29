import React, { Component } from "react";
import { Alert, View, Button, StyleSheet, Text } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";
import { render } from 'react-dom';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CustomButton from "./CustomButton";


const API_KEY = "241051bf13976dd3ddf8b8d9f247255e";

class HomeScreen extends React.Component {
  constructor() {
    super();
    this._onPressButton1 = this._onPressButton1.bind(this);
    this._onPressButton2 = this._onPressButton2.bind(this);
    this._onPressButton3 = this._onPressButton3.bind(this);
    this._onPressButton4 = this._onPressButton4.bind(this);
  }

  state = {
    isLoading: true
  };
  getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather,
        name
      }
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );
  //  Console.log(data);
    this.setState({
      isLoading: false,
      condition: weather[0].main,
      temp,
      name
    }, () => {
    });
    
  };

  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("위치를 찾을 수 없습니다.", "위치 정보를 확인해주세요");
    }
  };
  _onPressButton1() {
    this.getWeather(37.5665352, 126.9779692);
  }
  _onPressButton2() {
    this.getWeather(37.3798877, 126.8031025);
  }
  _onPressButton3() {
    this.getWeather(35.1279222, 129.0556277);
  }
  _onPressButton4() {
    this.getLocation();
  }

  componentDidUpdate() {
    this.state.isLoading ? (this.props.navigation.navigate("Loading")) : (this.props.navigation.navigate("Weather", { "state": this.state }))
    this.state.isLoading = true;
  }
  // componentDidMount() {
  //   this.getLocation();
  // }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={fontSize= 40}>지역을 선택해주세요!</Text>
        </View>
        <View style={styles.footer}>
          <CustomButton
            buttonColor={'#ECADFF'}
            title={'서울'}
            onPress={this._onPressButton1} />
          <CustomButton
            buttonColor={'#ECADFF'}
            title={'시흥'}
            onPress={this._onPressButton2} />
          <CustomButton
            buttonColor={'#ECADFF'}
            title={'부산'}
            onPress={this._onPressButton3} />
          <CustomButton
            buttonColor={'#ECADFF'}
            title={'현재 위치로 탐색'}
            onPress={this._onPressButton4} />
          <CustomButton
            buttonColor={'#D1B2FF'}
            title={'+'}
            onPress={()=>{Alert.alert("지역 추가 기능은 추후 업데이트 예정입니다.")}} />
        </View>
      </View>
    );

  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  Loading: {
    screen: Loading,
    navigationOptions: {
      header: null
    }
  },
  Weather: {
    screen: Weather,
    navigationOptions: {
      header: null
    }
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: 'white',
  },
  title: {
    width:'100%',
    height:'13%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    height: '30%',
  },
});

export default createAppContainer(AppNavigator);


