import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {Component} from 'react';
import {COLORS} from '../theme/theme';

const HomeScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.push('MovieDetails');
        }}>
        <Text>HomeScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black,
    marginTop: 90,
  },
});

export default HomeScreen;
