/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  Button,
  StatusBar,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {store,persistor} from './store';
import {Provider} from 'react-redux';
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import NoteList from './screens/NoteList';
import AddNote from './screens/AddNote';
import { Note } from './redux/note/noteSlice';
import { PersistGate } from 'redux-persist/integration/react';

type StackParamList = {
  NoteList: undefined;
  AddNote: { data: Note };
};

const Stack = createNativeStackNavigator<StackParamList>();

export type AddNoteProps = NativeStackScreenProps<StackParamList, 'AddNote'>;

function Navigator(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NoteList">
        <Stack.Screen
          name="NoteList"
          component={NoteList}
          options={({navigation}) => ({
            title: 'My Notes',
            headerRight: () => (
              <Button
                onPress={() => {
                  navigation.navigate('AddNote');
                }}
                title="Add Note"
                color="#000"
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddNote"
          component={AddNote}
          options={{title: 'Add new note'}}
          initialParams={{ data: undefined }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor:Colors.lighter,
  };

  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Navigator />
      </PersistGate>
    </Provider>
  );
}

export default App;
