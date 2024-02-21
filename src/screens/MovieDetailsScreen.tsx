import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import {baseImagePath, movieCastDetails, movieDetails} from '../api/ApiCalls';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcons from '../components/CustomIcons';
import CategoryHeader from '../components/CategoryHeader';
import CastCard from '../components/CastCard';

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
      setMovieCastDetails(tempMovieCastData.cast);
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
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{
            uri: baseImagePath('w780', movieData?.backdrop_path),
          }}
          style={styles.background_image}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linear_gradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name="close"
                header={''}
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.background_image}>
          <Image
            source={{uri: baseImagePath('w342', movieData?.poster_path)}}
            style={styles.cardImage}
          />
        </View>
        <View style={styles.runtimeStyle}>
          <CustomIcons name="clock" style={styles.clockIcon} />
          <Text style={styles.runtimeText}>
            {Math.floor(movieData?.runtime / 60)}h{' '}
            {Math.floor(movieData?.runtime % 60)}m
          </Text>
        </View>
        <View style={styles.titleStyle}>
          <Text style={styles.titleText}>{movieData?.original_title}</Text>

          <View style={styles.genreContainer}>
            {movieData?.genres.map((item: any) => {
              return (
                <View style={styles.genreBox} key={item.id}>
                  <Text style={styles.genreText}>{item.name}</Text>
                </View>
              );
            })}
          </View>
          <Text style={styles.tagLineText}>{movieData?.tagline}</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.ratingContainer}>
            <CustomIcons name="star" style={styles.starIcon} />
            <Text style={styles.runtimeText}>
              {movieData?.vote_average.toFixed(1)} ({movieData?.vote_count})
            </Text>
            <Text style={styles.runtimeText}>
              {movieData?.release_date.substring(8, 10)}{' '}
              {new Date(movieData?.release_date).toLocaleString('default', {
                month: 'long',
              })}{' '}
              {movieData?.release_date.substring(0, 4)}
            </Text>
          </View>
          <Text style={styles.overviewText}>{movieData?.overview}</Text>
        </View>

        <View>
          <CategoryHeader title="Top Cast" />
          <FlatList
            data={movieCastDetails}
            keyExtractor={(item: any) => item.id}
            horizontal
            contentContainerStyle={styles.containerGap24}
            renderItem={({item, index}) => (
              <CastCard
                shouldMarginatedAtEnd={true}
                cardWidth={80}
                isFirst={index == 0 ? true : false}
                isLast={index == movieCastDetails?.length - 1 ? true : false}
                imagePath={baseImagePath('w185', item.profile_path)}
                title={item.original_name}
                subtitle={item.character}
              />
            )}
          />

          <View>
            <TouchableOpacity
              style={styles.buttonBG}
              onPress={() => {
                navigation.push('SeatBooking', {
                  bgImage: baseImagePath('w780', movieData?.backdrop_path),
                  posterImage: baseImagePath(
                    'original',
                    movieData?.poster_path,
                  ),
                });
              }}>
              <Text style={styles.buttonText}>Select Seats</Text>
            </TouchableOpacity>
          </View>
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
    marginTop: SPACING.space_28,
  },
  background_image: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linear_gradient: {
    height: '100%',
  },
  cardImage: {
    width: '60%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  clockIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.WhiteRGBA50,
    marginRight: SPACING.space_8,
  },
  runtimeText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  runtimeStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.space_20 + 2,
  },
  titleStyle: {},
  titleText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    marginHorizontal: SPACING.space_32,
    marginVertical: SPACING.space_15,
    textAlign: 'center',
  },
  genreBox: {
    borderColor: COLORS.WhiteRGBA75,
    borderWidth: 1,
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_25,
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_15,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreText: {
    color: COLORS.WhiteRGBA75,
    fontSize: FONTSIZE.size_12,
  },
  tagLineText: {
    color: COLORS.WhiteRGBA75,
    fontFamily: FONTFAMILY.poppins_regular,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: SPACING.space_15,
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.Yellow,
  },
  ratingContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  infoContainer: {
    marginHorizontal: SPACING.space_28,
  },
  overviewText: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  buttonBG: {
    alignItems: 'center',
    marginVertical: SPACING.space_24,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.Orange,
    marginHorizontal: SPACING.space_36 * 2,
    paddingVertical: SPACING.space_10,
  },
  buttonText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
});

export default MovieDetailsScreen;
