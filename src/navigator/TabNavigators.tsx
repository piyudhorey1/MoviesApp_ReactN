import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import TicketScreen from '../screens/TicketScreen';
import AccountScreen from '../screens/AccountScreen';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
import CustomIcons from '../components/CustomIcons';
import {StyleSheet, View, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <View style={styles.tabContainer}>
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: COLORS.Grey,
            borderTopWidth: 0,
            height: SPACING.space_10 * 10,
            marginBottom: SPACING.space_20,
            marginHorizontal: SPACING.space_16,
            paddingHorizontal: SPACING.space_10,
            borderRadius: BORDERRADIUS.radius_20 * 2,
            ...Platform.select({
              ios: {
                paddingBottom: 0,
              },
              android: {
                marginTop: 0,
              },
            }),
          },
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused, color, size}) => {
              return (
                <View
                  style={[
                    styles.activeTabBackground,
                    focused ? {backgroundColor: COLORS.Orange} : {},
                  ]}>
                  <CustomIcons
                    name="video"
                    size={FONTSIZE.size_24}
                    color={COLORS.White}
                  />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused, color, size}) => {
              return (
                <View
                  style={[
                    styles.activeTabBackground,
                    focused ? {backgroundColor: COLORS.Orange} : {},
                  ]}>
                  <CustomIcons
                    name="search"
                    size={FONTSIZE.size_24}
                    color={COLORS.White}
                  />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Ticket"
          component={TicketScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused, color, size}) => {
              return (
                <View
                  style={[
                    styles.activeTabBackground,
                    focused ? {backgroundColor: COLORS.Orange} : {},
                  ]}>
                  <CustomIcons
                    name="ticket"
                    size={FONTSIZE.size_24}
                    color={COLORS.White}
                  />
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused, color, size}) => {
              return (
                <View
                  style={[
                    styles.activeTabBackground,
                    focused ? {backgroundColor: COLORS.Orange} : {},
                  ]}>
                  <CustomIcons
                    name="user"
                    size={FONTSIZE.size_24}
                    color={COLORS.White}
                  />
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: COLORS.Black,
  },
  activeTabBackground: {
    backgroundColor: COLORS.Black,
    padding: SPACING.space_20,
    borderRadius: SPACING.space_18 * 10,
  },
});

export default TabNavigator;
