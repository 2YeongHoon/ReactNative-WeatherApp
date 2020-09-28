import React,{Component} from "react";
import {Alert,View,Button,StyleSheet,Text} from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";
import { render } from 'react-dom';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const API_KEY = "241051bf13976dd3ddf8b8d9f247255e";

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.getWeather = this.getWeather.bind(this);
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
    this.setState({
      isLoading: false,
      condition: weather[0].main,
      temp,
      name
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
      Alert.alert("위치를 찾을 수 없습니다.", "So sad");
    }
  };
   _onPressButton1(){
    this.getWeather(37.5665352, 126.9779692);
    console.log(this.state);
    this.state.isLoading ? (this.props.navigation.navigate("Loading")) : (this.props.navigation.navigate("Weather",{"state": this.state}))
    this.state.isLoading = true;
    console.log(this.stats);
  }
  _onPressButton2(){
    this.getWeather(37.3798877, 126.8031025);
    this.state.isLoading ? (this.props.navigation.navigate("Loading")) : (this.props.navigation.navigate("Weather",{"state": this.state}))
    this.state.isLoading = true;
  }
  _onPressButton3(){
    this.getWeather(35.1279222, 129.0556277);
    this.state.isLoading ? (this.props.navigation.navigate("Loading")) : (this.props.navigation.navigate("Weather",{"state": this.state}))
    this.state.isLoading = true;
  }
  _onPressButton4(){
    this.getLocation();
    this.state.isLoading ? (this.props.navigation.navigate("Loading")) : (this.props.navigation.navigate("Weather",{"state": this.state}))
    this.state.isLoading = true;
  }
  componentDidMount() {
    this.getLocation();
    console.log(this.state);
  }
    render() {
      return (
         <View style={styles.halfContainer}>
          <Button title='서울' onPress={this._onPressButton1}> </Button>
          <Button title='시흥' onPress={this._onPressButton2}> </Button>
          <Button title='부산' onPress={this._onPressButton3}> </Button>
          <Button title='현재 위치로 탐색' onPress={this._onPressButton4}> </Button>
        </View>
      );
  }
}

const AppNavigator  = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Loading: {
    screen: Loading,
  },
  Weather: {
    screen: Weather,
  }
});

const styles = StyleSheet.create({
  halfContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default createAppContainer(AppNavigator);


/* export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
    this.getWeather = this.getWeather.bind(this);
    this._onPressButton1 = this._onPressButton1.bind(this);
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
    this.setState({
      isLoading: false,
      condition: weather[0].main,
      temp,
      name
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
      Alert.alert("위치를 찾을 수 없습니다.", "So sad");
    }
  };

  // _onPressButton1 =() =>{
  //   getWeather(37.566535, 126.9779692);
  //   const { isLoading, temp, name, condition } = this.state;
  //   console.log(this.state);
  //   <Weather temp={Math.round(temp)} condition={condition} name={name} />
  // }
  _onPressButton1(){
    this.getWeather(37.566535,126.9779692)
    console.log(this.state);
    <Loading></Loading>
  }

    // this.getLocation();
    // const { isLoading, temp, name, condition } = this.state;
    // isLoading ? (
    //   <Loading />
    //   ) : (
    //   <Weather temp={Math.round(temp)} condition={condition} name={name} />
    //   );

}
*/


