import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { black, white } from '../../utils/colors';
import { addCard } from '../../actions';
import { addCardToDeck } from '../../utils/api';

export class NewCard extends Component {
  static navigationOptions = ({ navigation }) => {
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
    const { deckTitle } =   this.props.navigation.state.params;
    const newCard = {
      question,
      answer
    };
    //update redux
    this.props.dispatch(addCard(deckTitle, newCard));
    // addCard(deckTitle, newCard);
    addCardToDeck(deckTitle, newCard)
      .then(() => {
        this.props.navigation.goBack()
      });
    // this.props.navigation.navigate(
    //   'DeckCardInfo',
    //   { deck: { title: "Teste", questions: [] } }
    // )
  }

  render() {
    return(
      <KeyboardAvoidingView behaviour='padding' style={styles.container}>
        <Text>{this.props.navigation.state.params.deckTitle}</Text>
        <TextInput
          style={styles.text}
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
          placeholder='Question'
        />
        <TextInput
          style={styles.text}
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
    marginTop: 20,
    borderColor: black,
    borderWidth: 1,
    width: '70%',
    borderRadius: 5
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

function mapStateToProps (deckList) {
  return {
    deckList
  }
}

export default connect(
  mapStateToProps,
)(NewCard)
