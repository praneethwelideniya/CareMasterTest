import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import { Note} from '../../redux/note/noteSlice';
import {RootState} from '../../store';

const NoteList: React.FC = () => {
  const navigation = useNavigation();
  const notes = useSelector((state: RootState) => state.notes.notes);

  return (
    <View style={styles.container}>
      {notes && notes.length > 0 ? (
        <FlatList
          data={notes}
          renderItem={({item}) => <NoteElement data={item} />}
          keyExtractor={(item: Note) => item.id}
        />
      ) : (
        <View style={styles.noNoteContainer}>
          <Text style={{fontSize: 25, fontWeight: 'bold', marginBottom:15}}>
            No Notes - Please Add
          </Text>
          <Button
            onPress={() => {
              navigation.navigate('AddNote');
            }}
            title="Add Note"
            color="#000"
          />
        </View>
      )}
    </View>
  );
};

export type NoteElementProps = {
  data: Note;
};

const NoteElement: React.FC<NoteElementProps> = ({data}) => {

  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={()=>{navigation.navigate('AddNote',{data})}}
      style={styles.noteContainer}>
      <Text style={styles.titleText}>{data.title}</Text>
      <Text style={styles.bodyText}>{data.body}</Text>
      <Text
        style={styles.bodyText}>{`Category : ${data.category}`}</Text>
      <Text
        style={styles.bodyText}>{`Client : ${data.client}`}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  noNoteContainer:{marginBottom: 80,flex:1, alignItems:'center', justifyContent:'center'},
  noteContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom:10
  },
  titleText:{fontSize: 25, fontWeight: 'bold'},
  bodyText:{fontSize: 20, fontWeight: 'bold'}
});

export default NoteList;
