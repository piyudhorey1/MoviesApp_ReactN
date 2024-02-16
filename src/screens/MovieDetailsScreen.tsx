import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import {baseImagePath, movieCastDetails, movieDetails} from '../api/ApiCalls';
import {COLORS, SPACING} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const getMovieDetails = async (movieid: number) => {
  console.log(movieDetails(movieid));
  try {
    let response = await fetch(movieDetails(movieid));
    let json = await response.json();
    return json;
  } catch (error) {
    console.log('Something went wrong in getMovieDetails function', error);
  }
};

const getMovieCastDetails = async (movieid: number) => {
  try {
    let response = await fetch(movieCastDetails(movieid));
    let json = await response.json();
    return json;
  } catch (error) {
    console.log('Something went wrong in getMovieCastDetails function', error);
  }
};

const MovieDetailsScreen = ({navigation, route}: any) => {
  const [movieData, setMovieData] = useState(undefined);
  const [movieCastDetails, setMovieCastDetails] = useState(undefined);

  useEffect(() => {
    (async () => {
      const tempMovieData = await getMovieDetails(route.params.movieid);
      setMovieData(tempMovieData);
    })();
    (async () => {
      const tempMovieCastData = await getMovieCastDetails(route.params.movieid);
      setMovieData(tempMovieCastData);
    })();
  }, []);

  if (
    movieData == undefined &&
    movieData == null &&
    movieCastDetails == undefined &&
    movieCastDetails == null
  ) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContainer}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.appHeaderContainer}>
            <AppHeader
              name="close"
              header={''}
              action={() => navigation.goBack()}
            />
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} color={COLORS.Orange} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        {/* <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header={''}
            action={() => navigation.goBack()}
          />
        </View> */}
        <View>
          <ImageBackground
            source={{
              uri: baseImagePath('w780', movieData?.backdrop_path),
            }}
            style={styles.background_image}>
            <LinearGradient
              colors={[COLORS.BlackRGB10, COLORS.Black]}
              style={styles.linear_gradient}></LinearGradient>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flex: 1,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_20,
  },
  background_image: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linear_gradient: {
    height: '100%',
  },
});

export default MovieDetailsScreen;
