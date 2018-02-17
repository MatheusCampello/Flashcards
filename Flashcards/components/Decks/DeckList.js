import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getDecks } from '../../utils/api';
import DeckDetails from './DeckDetails';

export default class DeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckList: [] //Use Redux
    };
  }

  _keyExtractor = (item, index) => item.title;

  componentDidMount () {
    getDecks()
      .then((decks) => this.setState({
        deckList: JSON.parse(decks)
      }));
  }

  openDeck = (item) => {
    this.props.navigation.navigate(
      'DeckCardInfo',
      { deck: item }
    );
  }

  renderItem = ({ item }) => {
    return <DeckDetails deck={item} navigation={this.props.navigation} />
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
