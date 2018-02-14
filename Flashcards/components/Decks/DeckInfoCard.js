import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { black } from '../../utils/colors';

export default function DeckInfoCard ({ deck, onPress, style = {} }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.infoCard, style]}> {deck.title} </Text>
      <Text style={[styles.infoCard, style]}> {deck.questions.length} cards </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    textAlign: 'center',
    color: black,
  }
})
