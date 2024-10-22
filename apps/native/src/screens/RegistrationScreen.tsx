import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { useForm } from 'react-hook-form';
import { LinearGradient } from 'expo-linear-gradient';
import FormInput from '../components/FormInput'; 

const { height } = Dimensions.get('window');

function RegistrationScreen() {
  const { control, handleSubmit, formState: { errors }, watch } = useForm();
  const [focusedInputs, setFocusedInputs] = useState<{ [key: string]: boolean }>({});

  const handleFocus = (field: string) => {
    setFocusedInputs({ ...focusedInputs, [field]: true });
  };

  const handleBlur = (field: string) => {
    setFocusedInputs({ ...focusedInputs, [field]: false });
  };

  // Watch password to use it for retypePassword validation
  const password = watch('password');

  const onSubmit = (data: any) => {
    console.log('Username:', data.username); // For testing for now
    console.log('First Name:', data.firstName); // For testing for now
    console.log('Last Name:', data.lastName); // For testing for now
    console.log('Email:', data.email); // For testing for now
    console.log('Phone Number:', data.phoneNumber); // For testing for now
    console.log('Password:', data.password); // For testing for now
    console.log('Retype Password:', data.retypePassword); // For testing for now
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
          <TouchableOpacity>
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
