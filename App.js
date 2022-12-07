// App.js
import React, {Component} from 'react';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import ZegoUIKitPrebuiltCall, {
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

export default function VoiceCallPage(props) {
  const userId = String(Math.floor(Math.random() * 100000));

  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        appID={560831595}
        appSign={
          '546915037a2019c8ca4a1e7bc42dfe4d19c3df80b330a8b652a405dfd94d6d04'
        }
        userID={userId} // userID can be something like a phone number or the user id on your own user system.
        userName={`user_${userId}`}
        callID={'group123'} // callID can be any unique string.
        config={{
          // You can also use ONE_ON_ONE_VOICE_CALL_CONFIG/GROUP_VIDEO_CALL_CONFIG/GROUP_VOICE_CALL_CONFIG to make more types of calls.
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onOnlySelfInRoom: () => {
            // props.navigation.navigate('HomePage');
          },
          onHangUp: () => {
            // props.navigation.navigate('HomePage');
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
