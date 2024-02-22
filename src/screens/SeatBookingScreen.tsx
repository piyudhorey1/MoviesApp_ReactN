import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import React, {Component, useState} from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../components/AppHeader';
import CustomIcons from '../components/CustomIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
import EncryptedStorage from 'react-native-encrypted-storage';

const timeArray: string[] = [
  '10:30',
  '12:30',
  '14:30',
  '15:00',
  '19:30',
  '21:30',
];

const generateDate = () => {
  const date = new Date();
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekdays.push(tempDate);
  }
  return weekdays;
};

const generateSeats = () => {
  let numRow = 8;
  let numColumn = 3;
  let rowArray = [];
  let start = 1;
  let reachnine = false;

  for (let i = 0; i < numRow; i++) {
    let columnArray = [];
    for (let j = 0; j < numColumn; j++) {
      let seatObject = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };
      columnArray.push(seatObject);
      start++;
    }
    if (i == 3) {
      numColumn += 2;
    }
    if (numColumn < 9 && !reachnine) {
      numColumn += 2;
    } else {
      reachnine = true;
      numColumn -= 2;
    }
    rowArray.push(columnArray);
  }
  return rowArray;
};

const SeatBookingScreen = ({navigation, route}: any) => {
  const [dateArray, setDateArray] = useState<any>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [price, setPrice] = useState(0);

  const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats());
  const [selectedSeatArray, setSelectedSeaArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();

  const selectSeat = (index: number, subindex: number, num: number) => {
    if (!twoDSeatArray[index][subindex].taken) {
      let array: any = [...selectedSeatArray];
      let temp = [...twoDSeatArray];
      temp[index][subindex].selected = !temp[index][subindex].selected;
      if (!array.includes(num)) {
        array.push(num);
        setSelectedSeaArray(array);
      } else {
        const tempIndex = array.indexOf(num);
        if (tempIndex > -1) {
          array.splice(tempIndex, 1);
          setSelectedSeaArray(array);
        }
      }

      setPrice(array.length * 7.0);
      setTwoDSeatArray(temp);
    }
  };

  const BookSeats = async () => {
    if (
      selectedSeatArray.length !== 0 &&
      timeArray[selectedTimeIndex] != undefined &&
      dateArray[selectedDateIndex] !== undefined
    ) {
      try {
        await EncryptedStorage.setItem(
          'ticket',
          JSON.stringify({
            seatArray: selectedSeatArray,
            time: timeArray[selectedTimeIndex],
            date: dateArray[selectedDateIndex],
            ticketImage: route.params.posterImage,
          }),
        );
      } catch (error) {
        console.log(
          'Something went wrong while storing in Book seats function',
        );
      }
      navigation.navigate('Ticket', {
        seatArray: selectedSeatArray,
        time: timeArray[selectedTimeIndex],
        date: dateArray[selectedDateIndex],
        ticketImage: route.params.posterImage,
      });
    } else {
      ToastAndroid.showWithGravity(
        'Please select seats, date and time',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View>
          <ImageBackground
            style={styles.ImageBG}
            source={{uri: route.params?.bgImage}}>
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
          <Text style={styles.screenText}>Screen this side</Text>
        </View>

        <View style={styles.seatContainer}>
          <View style={styles.seatContainerGap20}>
            {twoDSeatArray?.map((item, index) => {
              return (
                <View key={index} style={styles.seatRow}>
                  {item?.map((subitem, subindex) => {
                    return (
                      <TouchableOpacity
                        key={subitem.number}
                        onPress={() => {
                          selectSeat(index, subindex, subitem.number);
                        }}>
                        <CustomIcons
                          name="seat"
                          style={[
                            styles.seatIcon,
                            subitem.taken ? {color: COLORS.Grey} : {},
                            subitem.selected ? {color: COLORS.Orange} : {},
                          ]}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            })}
          </View>

          <View style={styles.seatRadioContainer}>
            <View style={styles.radioContainer}>
              <CustomIcons name="radio" style={styles.radioIcon} />
              <Text style={styles.radioText}>Available</Text>
            </View>
            <View style={styles.radioContainer}>
              <CustomIcons
                name="radio"
                style={[styles.radioIcon, {color: COLORS.Grey}]}
              />
              <Text style={styles.radioText}>Taken</Text>
            </View>
            <View style={styles.radioContainer}>
              <CustomIcons
                name="radio"
                style={[styles.radioIcon, {color: COLORS.Orange}]}
              />
              <Text style={styles.radioText}>Selected</Text>
            </View>
          </View>

          <View>
            <FlatList
              data={dateArray}
              keyExtractor={item => item.date}
              horizontal
              contentContainerStyle={styles.seatContainerGap24}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedDateIndex(index);
                    }}>
                    <View
                      style={[
                        styles.dateContainer,
                        index == 0
                          ? {marginLeft: SPACING.space_24}
                          : index == dateArray.length - 1
                          ? {marginRight: SPACING.space_24}
                          : {},
                        index == selectedDateIndex
                          ? {backgroundColor: COLORS.Orange}
                          : {},
                      ]}>
                      <Text style={styles.dateText}>{item.date}</Text>
                      <Text style={styles.dayText}>{item.day}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          <View style={styles.outerContainer}>
            <FlatList
              data={timeArray}
              keyExtractor={item => item}
              horizontal
              contentContainerStyle={styles.seatContainerGap24}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedTimeIndex(index);
                    }}>
                    <View
                      style={[
                        styles.timeContainer,
                        index == 0
                          ? {marginLeft: SPACING.space_24}
                          : index == dateArray.length - 1
                          ? {marginRight: SPACING.space_24}
                          : {},
                        index == selectedTimeIndex
                          ? {backgroundColor: COLORS.Orange}
                          : {},
                      ]}>
                      <Text style={styles.timeText}>{item}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>

          <View style={styles.buyTicketsMainContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.screenText}>Total Price</Text>
              <Text style={styles.priceText}>$ {price}.00</Text>
            </View>
            <TouchableOpacity style={styles.buttonBuy} onPress={BookSeats}>
              <Text style={styles.buttonText}>Buy Tickets</Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar hidden />
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
  ImageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linear_gradient: {
    height: '100%',
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_20,
    marginTop: SPACING.space_28,
  },
  screenText: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA32,
  },
  seatContainer: {
    marginVertical: SPACING.space_20,
  },
  seatContainerGap20: {
    gap: SPACING.space_20,
  },
  seatRow: {
    flexDirection: 'row',
    gap: SPACING.space_20,
    justifyContent: 'center',
  },
  seatIcon: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  seatRadioContainer: {
    marginVertical: SPACING.space_24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  radioContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  radioText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.WhiteRGBA75,
  },
  radioIcon: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  seatContainerGap24: {
    gap: SPACING.space_24,
  },
  dateContainer: {
    width: SPACING.space_10 * 7,
    height: SPACING.space_10 * 10,
    borderRadius: SPACING.space_10 * 10,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.poppins_extrabold,
    color: COLORS.White,
  },
  dayText: {
    fontSize: FONTSIZE.size_12,
    color: COLORS.WhiteRGBA75,
  },
  outerContainer: {
    marginVertical: SPACING.space_24,
  },
  timeContainer: {
    borderColor: COLORS.WhiteRGBA15,
    borderWidth: 1,
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    color: COLORS.WhiteRGBA75,
    fontSize: FONTSIZE.size_12,
  },
  buyTicketsMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_32,
    paddingBottom: SPACING.space_32,
  },
  priceContainer: {
    alignItems: 'center',
  },
  priceText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  buttonBuy: {
    borderRadius: BORDERRADIUS.radius_25,
    backgroundColor: COLORS.Orange,
  },
  buttonText: {
    color: COLORS.White,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_12,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
});

export default SeatBookingScreen;
