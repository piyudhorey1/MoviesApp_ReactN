import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, {Component, useState} from 'react';
import {COLORS, SPACING} from '../theme/theme';
import {
  upcomingMovies,
  popularMovies,
  nowPlayingMovies,
  baseImagePath,
} from '../api/ApiCalls';
import InputHeader from '../components/InputHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

const HomeScreen = ({navigation}: any) => {
  const [nowPlayingMoviesList, setNotPlayingMoviesList] = useState(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState(undefined);

  if (
    nowPlayingMoviesList == undefined &&
    nowPlayingMoviesList == null &&
    popularMoviesList == undefined &&
    popularMoviesList == null &&
    upcomingMoviesList == undefined &&
    upcomingMoviesList == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <SafeAreaView>
          <StatusBar hidden />

          <View style={styles.InputHeaderContainer}>
            <InputHeader />
          </View>
        </SafeAreaView>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.Black,
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  InputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
});

export default HomeScreen;
