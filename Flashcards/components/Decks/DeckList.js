import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getDecks } from '../../utils/api';
import DeckDetails from './DeckDetails';
import { loadDecks } from '../../actions';

export class DeckList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckList: [] //Use Redux
    };
  }

  _keyExtractor = (item, index) => item.title;

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(loadDecks());
  }

  openDeck = (item) => {
    const { navigation } = this.props
    navigation.navigate(
      'DeckCardInfo',
      { deck: item }
    );
  }

  renderItem = ({ item }) => {
    return <DeckDetails deck={item} onPress={this.openDeck} />
  }

  render () {
    return(
      <View>
        {this.props.deckList && this.props.deckList.length > 0 ?
          <FlatList
            data={this.props.deckList}
            renderItem={this.renderItem}
            keyExtractor={this._keyExtractor}
          />
          : <Text> No Decks yet </Text>
        }
      </View>
    )
  }
}

function mapStateToProps (deckList) {
  return {
    deckList
  }
}

export default connect(
  mapStateToProps,
)(DeckList)
