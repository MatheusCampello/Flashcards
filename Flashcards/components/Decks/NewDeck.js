import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { black, white } from '../../utils/colors';
import { saveDeckTitle } from '../../utils/api';

export default class NewDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckTitle: 'New Deck'
    };
  }
  submitDeck = () => {
    const { deckTitle } = this.state;
    saveDeckTitle(deckTitle);
    this.props.navigation.navigate('DeckList')
  }

  render () {
    return(
      <KeyboardAvoidingView behaviour='padding' style={styles.container}>
        <Text style={styles.text}>What is the title of your new Deck?</Text>
        <TextInput
          style={{borderColor: black, borderWidth: 1, width: '70%', borderRadius: 5}}
          onChangeText={(deckTitle) => this.setState({deckTitle})}
          value={this.state.text}
          placeholder='Deck Title'
        />
        <TouchableOpacity style={styles.button} onPress={this.submitDeck}>
          <Text style={styles.buttonText}>
            Submit
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    fontSize: 49,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#757575'
  },
  button: {
    padding: 10,
    backgroundColor: black,
    alignSelf: 'center',
    borderRadius: 5,
    margin: 20,
  },
  buttonText :{
    color: white,
    fontSize: 20,
  },
});
