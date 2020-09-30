import React,{Component} from "react";
import { StyleSheet, Text, View, StatusBar,Button } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class Loading extends Component {
  render(){
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.text}>위치를 탐색중입니다.</Text>
        <Text></Text>
        <Button style={backgroundColor = "#2c2c2c" }title="뒤로가기" onPress={() => navigation.goBack()}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 30,
    paddingVertical: 100,
    backgroundColor: "#FDF6AA"
  },
  text: {
    color: "#2c2c2c",
    fontSize: 30
  }
});