import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import { RootStackParamList } from '../types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
