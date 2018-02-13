import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getDecks } from '../../utils/api';

export default class DeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckList: []
    };
  }

  componentDidMount () {
    getDecks()
      .then((decks) => this.setState({
        deckList: decks
      }));
  }

  render () {
    const { deckList } = this.state;
    return(
      <View>
        {deckList.length > 0 ?
          <Text> a {deckList} </Text>
          : <Text> b {deckList} </Text>
        }
        <Text>Deck List</Text>
      </View>
    )
  }
}
