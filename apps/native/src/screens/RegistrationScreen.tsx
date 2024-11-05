import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { useForm } from 'react-hook-form';
import { LinearGradient } from 'expo-linear-gradient';
import FormInput from '../components/FormInput';
import useApiClient from '../hooks/useApiClient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';

const { height } = Dimensions.get('window');

function RegistrationScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const { control, handleSubmit, formState: { errors }, watch } = useForm();
  const [focusedInputs, setFocusedInputs] = useState<{ [key: string]: boolean }>({});
  const password = watch('password'); // Watch password to use it for retypePassword validation
  const apiClient = useApiClient();

  const handleFocus = (field: string) => {
    setFocusedInputs({ ...focusedInputs, [field]: true });
  };

  const handleBlur = (field: string) => {
    setFocusedInputs({ ...focusedInputs, [field]: false });
  };

  const onSubmit = async (data: any) => {
    try {
      const registerData = {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNo: data.phoneNumber,
        password: data.password,
      };

      const response = await apiClient.userApi.register(registerData);

      Alert.alert(
        "Registration Successful",
        "Welcome!",
        [
          {
            text: "OK",
            onPress: () => navigation.replace('MainPage')
          }
        ]
      );
    } catch (error) {
      Alert.alert("Registration Failed", error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={['#4552CB', '#4596EA']}
        style={styles.topBackground}
        start={{ x: 1, y: 0 }}  
        end={{ x: 0, y: 1 }}
      />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Registration</Text>

        <View style={styles.formContainer}>
          {['username', 'firstName', 'lastName', 'email', 'phoneNumber', 'password', 'retypePassword'].map((field, index) => (
            <FormInput
              key={index}
              control={control}
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
              rules={
                field === 'email'
                  ? {
                      required: 'Email is required',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                        message: 'Invalid email address',
                      },
                    }
                  : field === 'password'
                  ? {
                      required: 'Password is required',
                      minLength: { value: 8, message: 'Password must be at least 8 characters' },
                    }
                  : field === 'retypePassword'
                  ? {
                      required: 'Please retype the password',
                      validate: (value: any) => value === password || 'Passwords do not match',
                    }
                  : { required: `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required` }
              }
              errors={errors}
              focused={focusedInputs[field]}
              onFocus={() => handleFocus(field)}
              onBlur={() => handleBlur(field)}
              secureTextEntry={field.toLowerCase().includes('password')}
              keyboardType={field === 'phoneNumber' ? 'numeric' : field === 'email' ? 'email-address' : 'default'}
            />
          ))}

          <Button
            title="Sign Up"
            buttonStyle={styles.button}
            onPress={handleSubmit(onSubmit)}
          />
        </View>

        <View style={styles.signIn}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.link}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F0F4F8',
  },
  topBackground: {
    height: height * 0.4,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  contentContainer: {
    marginTop: height * 0.1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#468ae6',
    borderRadius: 28,
    width: '100%',
    paddingVertical: 15,
  },
  signIn: {
    flexDirection: 'row',
    marginTop: 20,
  },
  link: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
});

export default RegistrationScreen;
