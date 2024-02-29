import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import {COLORS, SPACING} from '../theme/theme';
import {
  upcomingMovies,
  popularMovies,
  nowPlayingMovies,
  baseImagePath,
} from '../api/ApiCalls';
import InputHeader from '../components/InputHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';

const {width, height} = Dimensions.get('window');

const getNowPlayingMoviesList = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(
      'Something went wrong in getNowPlayingMoviesList function',
      error,
    );
  }
};

const getUpcomingMoviesList = async () => {
  try {
    let response = await fetch(upcomingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(
      'Something went wrong in getUpcomingMoviesList function',
      error,
    );
  }
};

const getPopularMoviesList = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(
      'Something went wrong in getPopularMoviesList function',
      error,
    );
  }
};

const HomeScreen = ({navigation}: any) => {
  const [nowPlayingMoviesList, setNotPlayingMoviesList] =
    useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);

  useEffect(() => {
    (async () => {
      let tempNowPlaying = await getNowPlayingMoviesList();
      setNotPlayingMoviesList([
        {id: 'dummy1'},
        ...tempNowPlaying.results,
        {id: 'dummy2'},
      ]);
      let tempUpcomingMovies = await getUpcomingMoviesList();
      setUpcomingMoviesList(tempUpcomingMovies.results);
      let tempPopularMovies = await getPopularMoviesList();
      setPopularMoviesList(tempPopularMovies.results);
    })();
  }, []);

  // console.log(nowPlayingMoviesList);

  const searchMoviesFunction = () => {
    navigation.navigate('Search');
  };

  if (
    nowPlayingMoviesList == undefined &&
    nowPlayingMoviesList == null &&
    popularMoviesList == undefined &&
    popularMoviesList == null &&
    upcomingMoviesList == undefined &&
    upcomingMoviesList == null
  ) {
    return (
      <View style={styles.container}>
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.scrollViewContainer}>
          <StatusBar hidden />

          <View style={styles.InputHeaderContainer}>
            <InputHeader searchFunction={searchMoviesFunction} />
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} color={COLORS.Orange} />
          </View>
        </ScrollView>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView bounces={false}>
        <StatusBar hidden />
        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction} />
        </View>
        <CategoryHeader title={'Now Playing'} />
        <FlatList
          data={nowPlayingMoviesList}
          keyExtractor={(item: any) => item.id}
          horizontal
          contentContainerStyle={styles.containerGap36}
          renderItem={({item, index}) => {
            if (!item.original_title) {
              return (
                <View
                  style={{
                    width: (width - (width * 0.8 + SPACING.space_36 * 2)) / 2,
                  }}></View>
              );
            }

            return (
              <MovieCard
                shouldMarginatedAtEnd={true}
                cardFunction={() => {
                  navigation.push('MovieDetails', {movieid: item.id});
                }}
                cardWidth={width * 0.7}
                isFirst={index == 0 ? true : false}
                isLast={index == upcomingMoviesList?.length - 1 ? true : false}
                title={item.original_title}
                imagePath={baseImagePath('w780', item.poster_path)}
                genre={item.genre_ids.slice(1, 4)}
                vote_average={item.vote_average}
                vote_count={item.vote_count}
              />
            );
          }}
        />
        <CategoryHeader title={'Popular'} />
        <FlatList
          data={popularMoviesList}
          keyExtractor={(item: any) => item.id}
          horizontal
          contentContainerStyle={styles.containerGap36}
          renderItem={({item, index}) => (
            <SubMovieCard
              shouldMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push('MovieDetails', {movieid: item.id});
              }}
              cardWidth={width / 3}
              isFirst={index == 0 ? true : false}
              isLast={index == upcomingMoviesList?.length - 1 ? true : false}
              title={item.original_title}
              imagePath={baseImagePath('w342', item.poster_path)}
            />
          )}
        />
        <CategoryHeader title={'Upcoming'} />
        <FlatList
          data={upcomingMoviesList}
          keyExtractor={(item: any) => item.id}
          horizontal
          contentContainerStyle={styles.containerGap36}
          renderItem={({item, index}) => (
            <SubMovieCard
              shouldMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push('MovieDetails', {movieid: item.id});
              }}
              cardWidth={width / 3}
              isFirst={index == 0 ? true : false}
              isLast={index == upcomingMoviesList?.length - 1 ? true : false}
              title={item.original_title}
              imagePath={baseImagePath('w342', item.poster_path)}
            />
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
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
  containerGap36: {
    gap: SPACING.space_36,
  },
});

export default HomeScreen;
