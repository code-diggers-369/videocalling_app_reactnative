// In App.js in a new project

import React, {useState} from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//
import CallingScreen from './CallingScreen';

function HomeScreen() {
  const [randomId, setRandomId] = useState('');

  const navigation = useNavigation();

  const generateRandomId = () => {
    return `${Math.floor(Math.random() * 10000)}-${Math.floor(
      Math.random() * 10000,
    )}-${Math.floor(Math.random() * 10000)}`;
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{width: '90%'}}>
        <TextInput
          style={{borderWidth: 1, borderColor: 'black', marginBottom: 20}}
          value={randomId}
          onChangeText={text => setRandomId(text)}
        />
        <Button
          title="join meeting"
          onPress={() => {
            //
            if (randomId.length > 5) {
              navigation.navigate('CallingScreen', {
                callId: randomId,
              });
            } else {
              //
              alert('Enter Valid Id');
            }
          }}
        />
        <TouchableOpacity
          style={{marginTop: 30, alignItems: 'center'}}
          onPress={() => {
            const id = generateRandomId();
            setRandomId(id);
          }}>
          <Text style={{color: 'blue'}}>Generate Meeting Id</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="CallingScreen"
          component={CallingScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
