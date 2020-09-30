import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { setStatusBarBackgroundColor } from "expo-status-bar";
const weatherOptions = {
  Thunderstorm: {
    iconName: "weather-lightning",
    gradient: ["#373B44", "#4286f4"],
    title: "천둥번개",
    subtitle: "비가 너무많이 오네요 ㅠㅠ"
  },
  Drizzle: {
    iconName: "weather-hail",
    gradient: ["#89F7FE", "#66A6FF"],
    title: "이슬비",
    subtitle: "우산을 가져가야 할까요 말까요"
  },
  Rain: {
    iconName: "weather-rainy",
    gradient: ["#00C6FB", "#005BEA"],
    title: "비",
    subtitle: "커피 한잔의 여유를..."
  },
  Snow: {
    iconName: "weather-snowy",
    gradient: ["#7DE2FC", "#B9B6E5"],
    title: "눈",
    subtitle: "눈사람 만들러 나가볼래요?"
  },
  Atmosphere: {
    iconName: "weather-hail",
    gradient: ["#89F7FE", "#66A6FF"],
    title: "안개",
    subtitle: "운전조심하세요"
  },
  Clear: {
    iconName: "weather-sunny",
    gradient: ["#FF7300", "#FEF253"],
    title: "태양 쨍쨍",
    subtitle: "불타는 날씨!"
  },
  Clouds: {
    iconName: "weather-cloudy",
    gradient: ["#D7D2CC", "#304352"],
    title: "구름많음",
    subtitle: "석양에 물든 구름을 바라보며 오늘 하루를 정리해보세요."
  },
  Mist: {
    iconName: "weather-hail",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "안개!",
    subtitle: "안개조심!"
  },
  Dust: {
    iconName: "weather-hail",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "미세먼지 조심",
    subtitle: "마스크 꼭 끼세요"
  },
  Haze: {
    iconName: "weather-hail",
    gradient: ["#4DA0B0", "#D39D38"],
    title: "실 안개",
    subtitle: "안개조심!"
  }
};

export default class Weather extends Component {
  render() {
    const { navigation } = this.props;
    const {
      temp,
      condition,
      name,
      humidity,
      pressure,
      visibility,
      speed,
    } = navigation.getParam("state");
    return (
      <LinearGradient
        colors={weatherOptions[condition].gradient}
        style={styles.container}
      >
        <StatusBar barStyle="light-content" />
        <View style={styles.halfContainer}>
          <MaterialCommunityIcons
            size={96}
            name={weatherOptions[condition].iconName}
            color="white"
          />
          <Text style={styles.name}>현재 {name}의 기온은?</Text>
          <Text style={styles.temp}>{parseInt(temp)}°C{"\n"}</Text>
          <Text style={{ alignSelf: 'flex-start', color: "white", fontSize: 13 }}>          (생활 지수)</Text>
          <View style={styles.a}>
            <View style={styles.redView}><Text style={styles.text}>풍속{"\n"}{speed}m/s</Text></View>
            <View style={styles.redView}><Text style={styles.text}>시정{"\n"}{visibility}</Text></View>
            <View style={styles.redView}><Text style={styles.text}>습도{"\n"}{humidity}%</Text></View>
            <View style={styles.redView}><Text style={styles.text}>기압{"\n"}{pressure}</Text></View>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{weatherOptions[condition].title}</Text>
          <Text style={styles.subtitle}>
            {weatherOptions[condition].subtitle}
          </Text>
        </View>
      </LinearGradient>
    );
  }
}

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf([
    "Thunderstorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Atmosphere",
    "Clear",
    "Clouds",
    "Haze",
    "Mist",
    "Dust"
  ]).isRequired
};

Weather.propTypes = {
  temp: PropTypes.number.isRequired,
  condition: PropTypes.oneOf([
    "Thunderstorm",
    "Drizzle",
    "Rain",
    "Snow",
    "Atmosphere",
    "Clear",
    "Clouds",
    "Haze",
    "Mist",
    "Dust"
  ]).isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  a: {
    flex: 0.5,
    flexDirection: 'row', 
    flexWrap: 'wrap',   
    justifyContent: 'center',  
    alignItems: 'center', 
  },
  text: {
    fontSize: 15,
    color: "white",
    textAlign: "center"
  },
  redView: {
    width: 170,
    height: 50,
    borderColor: 'white',
    borderWidth: 1,
  },
  temp: {
    fontSize: 42,
    color: "white"
  },
  name: {
    fontSize: 15,
    color: "white"
  },
  halfContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 44,
    fontWeight: "300",
    marginBottom: 10,
    textAlign: "left"
  },
  subtitle: {
    fontWeight: "600",
    color: "white",
    fontSize: 24,
    textAlign: "left"
  },
  textContainer: {
    paddingHorizontal: 20,
    alignItems: "flex-start",
    paddingHorizontal: 40,
    justifyContent: "center",
    flex: 1
  }
});