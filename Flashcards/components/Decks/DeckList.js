import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getDecks } from '../../utils/api';
import DeckInfoCard from './DeckInfoCard';

export default class DeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckList: []
    };
  }

  _keyExtractor = (item, index) => item.title;

  componentDidMount () {
    getDecks()
      .then((decks) => this.setState({
        deckList: JSON.parse(decks)
      }));
  }

  renderItem = ({ item }) => {
    return <DeckInfoCard deck={item} />
  }

  render () {
    const { deckList } = this.state;
    return(
      <View>
        {deckList.length > 0 ?
          <FlatList
            data={deckList}
            renderItem={this.renderItem}
            keyExtractor={this._keyExtractor}
          />
          : <Text> No Decks yet </Text>
        }
      </View>
    )
  }
}
