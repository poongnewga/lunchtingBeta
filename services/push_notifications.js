import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';

export default async () => {
  let previousToken = await AsyncStorage.getItem('pushtoken');
  console.log("PUSH_TOKEN: ", previousToken);
  if (previousToken) {
    return previousToken;
  } else {
     let { status } = await Permissions.getAsync(Permissions.REMOTE_NOTIFICATIONS);

     if (status !== 'granted') {
       return false;
     }

     let token = await Notifications.getExponentPushTokenAsync();

     //  우리 서버에 토큰 등록 필요
     console.log("PUSH_TOKEN: ", token);
     AsyncStorage.setItem('pushtoken', token);
     return token;
  }
}
