import {Text, StyleSheet, View, StatusBar} from 'react-native';
import React, {Component} from 'react';
import {COLORS} from '../theme/theme';
import {SafeAreaView} from 'react-native-safe-area-context';

const SearchScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.Black,
  },
});

export default SearchScreen;
