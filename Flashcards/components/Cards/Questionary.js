import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, View, StyleSheet, Animated } from 'react-native';
import { black, white, green, red } from '../../utils/colors';

export class Questionary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      correctAnswers: 0,
      isQuestion: true,
      endOfQuiz: false,
      bounceValue: new Animated.Value(1),
    };
    this.correctAnswer = this.correctAnswer.bind(this);
    this.incorrectAnswer = this.incorrectAnswer.bind(this);
    this.retryQuiz = this.retryQuiz.bind(this);
    this.setQuestionOrAnswer = this.setQuestionOrAnswer.bind(this);
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

    if (nextCard === cards.length) {
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

    if (nextCard === cards.length) {
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
  retryQuiz() {
    this.setState({
      index: 0,
      correctAnswers: 0,
      isQuestion: true,
      endOfQuiz: false,
    })
  }

  setQuestionOrAnswer() {
    const { bounceValue, isQuestion } = this.state;

    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.04}),
      Animated.spring(bounceValue, { toValue: 1, friction: 4})
    ]).start()

    this.setState({
      isQuestion: !isQuestion
    });

  }

  render() {
    const { correctAnswers, index, endOfQuiz, isQuestion, bounceValue } = this.state;
    const { cards } = this.props.navigation.state.params;
    const currentCard = cards[index];
    return (
      <View style={styles.infoCard}>
        <View>
          {!endOfQuiz &&
            <View>
              {isQuestion
                ?
                <View>
                  <Text style={{fontSize: 18}}>{index + 1}/{cards.length}</Text>
                  <Animated.Text style={[styles.mainText, {transform: [{ scale: bounceValue}]}]}>
                    {currentCard.question}
                  </Animated.Text>
                  <TouchableOpacity onPress={this.setQuestionOrAnswer}>
                    <Text style={styles.subText}>Answer</Text>
                  </TouchableOpacity>
                </View>
                :
                <View>
                  <Text style={{fontSize: 18}}>{index + 1}/{cards.length}</Text>
                  <Animated.Text style={[styles.mainText, {transform: [{ scale: bounceValue}]}]}>
                    {currentCard.answer}
                  </Animated.Text>
                  <TouchableOpacity onPress={this.setQuestionOrAnswer}>
                    <Text style={styles.subText}>Question</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonCorrect} onPress={this.correctAnswer}>
                    <Text style={{color: white, alignSelf: 'center'}}>Correct</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonIncorrect} onPress={this.incorrectAnswer}>
                    <Text style={{color: white, alignSelf: 'center'}}>Incorrect</Text>
                  </TouchableOpacity>
                </View>
              }
            </View>
          }
          {endOfQuiz &&
            <View>
              <Text style={styles.mainText}>You answered correct {correctAnswers} from {cards.length} questions.</Text>
              <TouchableOpacity onPress={this.retryQuiz}>
                <Text style={styles.subText}>Retry</Text>
              </TouchableOpacity>
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
  },
  mainText: {
    color: black,
    fontSize: 38,
    textAlign: 'center',
    paddingTop: 10,
    alignItems: 'center',
  },
  subText: {
    color: red,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10,
  },
  buttonCorrect: {
    justifyContent: 'flex-end',
    marginTop: '50%',
    padding: 10,
    backgroundColor: green,
    alignSelf: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: green,
    width: 130,
    height: 40,
  },
  buttonIncorrect: {
    justifyContent: 'flex-end',
    marginTop: 10,
    padding: 10,
    backgroundColor: red,
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
