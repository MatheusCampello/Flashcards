import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { black, gray } from '../../utils/colors';

export default class DeckCardInfo extends Component {

  render() {
    return (
      <View style={styles.infoCard}>
        <Text style={styles.mainText}> {deck.title} </Text>
        <Text style={styles.subText}> {deck.questions.length} cards </Text>
        <TouchableOpacity>
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Start Quiz</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    color: black,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
  },
  subText: {
    color: gray,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10,
  }
})