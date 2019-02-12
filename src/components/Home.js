import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    ImageBackground,
    Image,
    Dimensions,
    Button,
    CheckBox,
    Alert,
    TouchableHighlight,
    TouchableOpacity,
    Icon,
} from 'react-native';

const {width:WIDTH} = Dimensions.get('window');

type Props = {};
class Home extends Component<Props> {

  render() {
    return (
      <ImageBackground style={styles.backgroundContainer}>
        <View>
            <Text>Home</Text>
        </View>
      </ImageBackground>
    );
  }
}

export default Home

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height:null,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  }
});
