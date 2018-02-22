import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { black, white, gray } from '../../utils/colors';

export class DeckCardInfo extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deck } = navigation.state.params
    return {
      title: deck.title,
    }
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.deck !== null
  }

  navigateNewCard(navigation) {
    const { deck } = navigation.state.params;
    navigation.navigate(
      'NewCard',
      { deckTitle: deck.title}
    );
  }

  navigateQuestionary(navigation) {
    const { deck } = navigation.state.params;
    navigation.navigate(
      'Questionary',
      { cards: deck.questions }
    );
  }

  render() {
    // const { deck } = this.props.navigation.state.params
    const deck = this.props.deckList.find((deck) => deck.title === this.props.navigation.state.params.deck.title)
    return (
      <View style={styles.infoCard}>
        {deck &&
          <View>
            <Text style={styles.mainText}> {deck.title} </Text>
            {deck.questions.length > 0
              ? <Text style={styles.subText}> {deck.questions.length} {deck.questions.length === 1 ? 'card' : 'cards'} </Text>
              : <Text style={styles.subText}> No Cards Yet </Text>
            }
            <TouchableOpacity style={styles.buttonAdd} onPress={() => this.navigateNewCard(this.props.navigation)}>
              <Text style={{color: black, alignSelf: 'center'}}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonQuiz} onPress={() => this.navigateQuestionary(this.props.navigation)}>
              <Text style={{color: white, alignSelf: 'center'}}>Start Quiz</Text>
            </TouchableOpacity>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  infoCard: {
    flex:1,
    padding: 10,
    paddingTop: 10,
    marginTop: 10,
    width: '100%',
    height: 45,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: black,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  mainText: {
    color: black,
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
  },
  subText: {
    color: gray,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10,
  },
  buttonAdd: {
    justifyContent: 'flex-end',
    marginTop: '50%',
    padding: 10,
    backgroundColor: white,
    alignSelf: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: black,
    width: 130,
    height: 40,
  },
  buttonQuiz: {
    justifyContent: 'flex-end',
    marginTop: 10,
    padding: 10,
    backgroundColor: black,
    alignSelf: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    width: 130,
    height: 40,
  },
})


function mapStateToProps (deckList) {
  return {
    deckList
  }
}

export default connect(
  mapStateToProps,
)(DeckCardInfo)
