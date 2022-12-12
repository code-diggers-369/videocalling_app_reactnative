// App.js
import {
  ZegoUIKitPrebuiltCallWithInvitation,
  ZegoStartCallInvitationButton,
  ZegoInvitationType,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
  GROUP_VIDEO_CALL_CONFIG,
  GROUP_VOICE_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import ZegoUIKitSignalingPlugin from '@zegocloud/zego-uikit-signaling-plugin-rn';

// In App.js in a new project

import React, {useState} from 'react';
import {View, Text, TextInput, Button, TouchableOpacity} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//
import CallingScreen from './CallingScreen';

function HomeScreen() {
  const [userId, setUserId] = useState('');
  const [invitees, setInvitees] = useState([]);

  const navigation = useNavigation();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{width: '90%'}}>
        <TextInput
          style={{borderWidth: 1, borderColor: 'black', marginBottom: 20}}
          value={userId}
          onChangeText={text => {
            setUserId(text);
            setInvitees(text.split(','));
          }}
          placeholder={'Invite Your Friend Please Enter All Id'}
        />

        <View style={{alignItems: 'center'}}>
          <ZegoStartCallInvitationButton
            invitees={invitees} // ID of the invited user.
            isVideoCall={true}
          />
        </View>
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  const userID = `${String(Math.floor(Math.random() * 10000))}`;

  const userName = `user_${userID}`;

  return (
    <ZegoUIKitPrebuiltCallWithInvitation
      appID={560831595}
      appSign={
        '546915037a2019c8ca4a1e7bc42dfe4d19c3df80b330a8b652a405dfd94d6d04'
      }
      userID={userID} // userID can be something like a phone number or the user id on your own user system.
      userName={userName}
      ringtoneConfig={{
        incomingCallFileName: 'zego_incoming.mp3',
        outgoingCallFileName: 'zego_outgoing.mp3',
      }}
      requireConfig={data => {
        const config =
          data.invitees.length > 1
            ? ZegoInvitationType.videoCall === data.type
              ? GROUP_VIDEO_CALL_CONFIG
              : GROUP_VOICE_CALL_CONFIG
            : ZegoInvitationType.videoCall === data.type
            ? ONE_ON_ONE_VIDEO_CALL_CONFIG
            : ONE_ON_ONE_VOICE_CALL_CONFIG;
        return config;
      }}
      plugins={[ZegoUIKitSignalingPlugin]} // The signaling plug-in used for call invitation must be set here.
    >
      <Text
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          textAlign: 'center',
          color: 'black',
          fontWeight: 'bold',
        }}>
        UserId :- {userID}
      </Text>
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
    </ZegoUIKitPrebuiltCallWithInvitation>
  );
}

export default App;
