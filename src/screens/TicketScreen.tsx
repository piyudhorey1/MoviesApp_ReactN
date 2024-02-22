import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Image,
} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import AppHeader from '../components/AppHeader';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CustomIcons from '../components/CustomIcons';
import {SafeAreaView} from 'react-native-safe-area-context';

const TicketScreen = ({navigation, route}: any) => {
  const [ticketData, setTicketData] = useState<any>(route.params);

  useEffect(() => {
    async () => {
      try {
        const ticket = await EncryptedStorage.getItem('ticket');
        if (ticket != undefined && ticket != null) {
          setTicketData(JSON.parse(ticket));
        }
      } catch (error) {
        console.log(
          'Something went wrong while getting data from encrypted storage',
          error,
        );
      }
    };
  }, []);

  if (ticketData != route.params && route.params != undefined) {
    setTicketData(route.params);
  }

  if (ticketData == undefined || ticketData == null) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar hidden />
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header={''}
            action={() => navigation.goBack()}
          />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.appHeaderContainer}>
        <AppHeader
          name="close"
          header={''}
          action={() => navigation.goBack()}
        />
      </View>

      <View style={styles.ticketContainer}>
        <ImageBackground
          source={{uri: ticketData?.ticketImage}}
          style={styles.ticketBGImage}>
          <LinearGradient
            colors={[COLORS.OrangeRGBA0, COLORS.Orange]}
            style={styles.linearGradient}>
            <View
              style={[
                styles.blackSemiCircle,
                {position: 'absolute', bottom: -40, left: -40},
              ]}></View>
            <View
              style={[
                styles.blackSemiCircle,
                {position: 'absolute', bottom: -40, right: -40},
              ]}></View>
          </LinearGradient>
        </ImageBackground>
        <View style={styles.liner}></View>
        <View style={styles.ticketFooter}>
          <View
            style={[
              styles.blackSemiCircle,
              {position: 'absolute', top: -40, right: -40},
            ]}></View>
          <View
            style={[
              styles.blackSemiCircle,
              {position: 'absolute', top: -40, left: -40},
            ]}></View>
          <View style={styles.ticketDateContainer}>
            <View>
              <Text style={styles.dateTitle}>{ticketData?.date.date}</Text>
              <Text style={styles.subTitle}>{ticketData?.date.day}</Text>
            </View>
            <View>
              <CustomIcons name="clock" style={styles.clockIcon} />
              <Text style={styles.subTitle}>{ticketData?.time}</Text>
            </View>
          </View>
          <View style={styles.ticketSeatContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Hall</Text>
              <Text style={styles.subTitle}>02</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Row</Text>
              <Text style={styles.subTitle}>04</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Seats</Text>
              <Text style={styles.subTitle}>
                {ticketData?.seatArray
                  .slice(1, 4)
                  .map((item: any, index: number, arr: any) => {
                    return item + (index == arr.length - 1 ? '' : ', ');
                  })}
              </Text>
            </View>
          </View>

          <Image
            style={styles.barcodeImage}
            source={require('../assets/image/barcode.png')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_20,
    marginTop: SPACING.space_28,
  },
  ticketContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  ticketBGImage: {
    alignSelf: 'center',
    width: 300,
    aspectRatio: 200 / 300,
    borderTopLeftRadius: BORDERRADIUS.radius_25,
    borderTopRightRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  linearGradient: {
    height: '70%',
  },
  liner: {
    borderTopColor: COLORS.Black,
    borderTopWidth: 2,
    width: 300,
    alignSelf: 'center',
    backgroundColor: COLORS.Orange,
    borderStyle: 'solid',
  },
  ticketFooter: {
    backgroundColor: COLORS.Orange,
    width: 300,
    alignItems: 'center',
    paddingBottom: SPACING.space_36,
    alignSelf: 'center',
    borderBottomLeftRadius: BORDERRADIUS.radius_25,
    borderBottomRightRadius: BORDERRADIUS.radius_25,
  },
  ticketDateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  dateTitle: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
  },
  subTitle: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
  },
  clockIcon: {
    color: COLORS.White,
    fontSize: FONTSIZE.size_24,
    paddingBottom: SPACING.space_10,
  },
  subheading: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
  },
  ticketSeatContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: SPACING.space_10,
  },
  subtitleContainer: {
    alignItems: 'center',
  },
  blackSemiCircle: {
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: COLORS.Black,
  },
  barcodeImage: {
    height: 50,
    aspectRatio: 158 / 52,
  },
});

export default TicketScreen;
