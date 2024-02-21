import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {Component, useState} from 'react';
import {COLORS, SPACING} from '../theme/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import SubMovieCard from '../components/SubMovieCard';
import {baseImagePath, searchMovies} from '../api/ApiCalls';
import InputHeader from '../components/InputHeader';

const {width, height} = Dimensions.get('screen');

const SearchScreen = ({navigation}: any) => {
  const [searchList, setSearchList] = useState([]);

  const searchMoviesFunction = async (name: string) => {
    try {
      let response = await fetch(searchMovies(name));
      let json = await response.json();
      setSearchList(json.results);
    } catch (error) {
      console.error('Something went wrong searchMoviesFunction', error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View>
        <FlatList
          data={searchList}
          keyExtractor={(item: any) => item.id}
          numColumns={2}
          ListHeaderComponent={
            <View style={styles.InputHeaderContainer}>
              <InputHeader searchFunction={searchMoviesFunction} />
            </View>
          }
          contentContainerStyle={styles.centerContainer}
          renderItem={({item, index}) => (
            <SubMovieCard
              shouldMarginatedAtEnd={false}
              shouldMarginatedAround={true}
              cardFunction={() => {
                navigation.push('MovieDetails', {movieid: item.id});
              }}
              cardWidth={width / 2 - SPACING.space_12 * 2}
              title={item.original_title}
              imagePath={baseImagePath('w342', item.poster_path)}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    width,
    alignItems: 'center',
    backgroundColor: COLORS.Black,
  },
  InputHeaderContainer: {
    display: 'flex',
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  centerContainer: {
    alignItems: 'center',
  },
});

export default SearchScreen;
