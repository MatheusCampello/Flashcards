import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { black, white, gray } from '../../utils/colors';

export class Questionary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      correctAnswers: 0,
      isQuestion: true,
      endOfQuiz: false,
    };
    this.correctAnswer = this.correctAnswer.bind(this);
    this.incorrectAnswer = this.incorrectAnswer.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz',
    }
  }

  shouldComponentUpdate (nextProps) {
    return nextProps.deck !== null
  }

  navigateNewCard(navigation) {
    const { cards } = navigation.state.params
  }

  correctAnswer() {
    const { cards } = this.props.navigation.state.params;
    const nextCard = this.state.index + 1;

    if (nextCard > cards.length) {
      this.setState({
        endOfQuiz: true,
        correctAnswers: this.state.correctAnswers + 1,
        index: 0
      })
    } else {
      this.setState({
        correctAnswers: this.state.correctAnswers + 1,
        isQuestion: true,
        index: nextCard
      })
    }
  }

  incorrectAnswer() {
    const { cards } = this.props.navigation.state.params;
    const nextCard = this.state.index + 1;

    if (nextCard > cards.length) {
      this.setState({
        endOfQuiz: true,
        index: 0
      })
    } else {
      this.setState({
        isQuestion: true,
        index: nextCard
      })
    }

  }

  render() {
    const { correctAnswers, index } = this.state;
    const { cards } = this.props.navigation.state.params;
    const currentCard = cards[index];
    return (
      <View style={styles.infoCard}>
        <View>
          <Text>{index}/{cards.length}</Text>
          {!endOfQuiz && isQuestion
            ?
            <View>
              <Text>{currentCard.question}</Text>
              <TouchableOpacity onPress={() => this.setState({isQuestion: false})}>
                <Text>Answer</Text>
              </TouchableOpacity>
            </View>
            :
            <View>
              <Text>{currentCard.answer}</Text>
              <TouchableOpacity onPress={() => this.setState({isQuestion: true})}>
                <Text>Question</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.correctAnswer}>
                <Text>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.incorrectAnswer}>
                <Text>Incorrect</Text>
              </TouchableOpacity>
            </View>
          }
          {endOfQuiz &&
            <View>
              <Text>You answered correct {correctAnswers} from {currentCard.length} questions.</Text>
            </View>
          }
        </View>
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
)(Questionary)
