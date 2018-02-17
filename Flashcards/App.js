import React from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { white, black } from './utils/colors';
import { Constants } from 'expo'
import DeckList from './components/Decks/DeckList';
import NewDeck from './components/Decks/NewDeck';
import DeckCardInfo from './components/Cards/DeckCardInfo';

function FlashcardsStatusBar ({ backgroundColor, ...props}) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'DECKS',
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK',
    }
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: black,
    style: {
      height: 56,
      backgroundColor: white,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckCardInfo: {
    screen: DeckCardInfo,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black,
      }
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <FlashcardsStatusBar backgroundColor={white} barStyle='light-content'/>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
