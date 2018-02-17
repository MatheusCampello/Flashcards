import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { black, white } from '../../utils/colors';

export default class NewCard extends Component {
  static navigationOptions = ({ navigation }) => {
    // const { deck } = navigation.state.params USAR ISSO AQUE
    return {
      title: 'Add Card'
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answer: ''
    };
  }

  submitCard = () => {
    const { question, answer } = this.state;
    const { deckTitle } = navigation.state.params;
    const newCard = {
      question,
      answer
    };
    //update redux
    // this.props.dispatch(addDeck(newDeck));
    addCardToDeck(deckTitle, newCard)
      .then(() => {
        this.props.navigation.navigate(
          'DeckCardInfo'
        );
      });
  }

  render() {
    return(
      <KeyboardAvoidingView behaviour='padding' style={styles.container}>
        <TextInput
          style={{borderColor: black, borderWidth: 1, width: '70%', borderRadius: 5}}
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
          placeholder='Question'
        />
        <TextInput
          style={{borderColor: black, borderWidth: 1, width: '70%', borderRadius: 5}}
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
          placeholder='Answer'
        />
        <TouchableOpacity style={styles.button} onPress={this.submitCard}>
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
