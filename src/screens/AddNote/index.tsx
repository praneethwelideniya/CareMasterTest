import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker, {
  ItemType,
  ValueType,
} from 'react-native-dropdown-picker';
import {useDispatch} from 'react-redux';
import {AddNoteProps} from '../../App';
import {
  addNote,
  Category,
  Client,
  editNote,
  Note,
  removeNote,
} from '../../redux/note/noteSlice';

const AddNote: React.FC<AddNoteProps> = ({route}: AddNoteProps) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [client, setClient] = useState<Client>();
  const [category, setCategory] = useState<Category>();
  const [clients, setClients] = useState([
    {label: 'Client 1', value: 'client 1', id: '1'},
    {label: 'Client 2', value: 'client 2', id: '2'},
    {label: 'Client 3', value: 'client 3', id: '3'},
    {label: 'Client 4', value: 'client 4', id: '4'},
    {label: 'Client 5', value: 'client 5', id: '5'},
  ]);

  const [categories, setCategoris] = useState([
    {label: 'Goal Evidence', value: 'Goal Evidence', id: '1'},
    {label: 'Support Coordination', value: 'Support Coordination', id: '2'},
    {label: 'Active Duty', value: 'Active Duty', id: '3'},
  ]);

  const [enabled, setEnabled] = useState(false);

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const data = route.params.data;

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setClient(data.client);
      setCategory(data.category);
      setBody(data.body);
    }
  }, [data]);

  useEffect(() => {
    if (title && body && client && category) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, [title, body, client, category]);

  const onAddNote = (add: boolean) => {
    const NoteObject: Note = {
      id: add ? `${Math.floor(Math.random() * 1000000) + 1234}` : data.id,
      title: title,
      body: body,
      client: client,
      category: category,
    };
    if (add) {
      dispatch(addNote(NoteObject));
    } else {
      dispatch(editNote(NoteObject));
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={{height: '90%'}}>
        <AppTextInput
          value={title}
          setValue={(value: string) => setTitle(value)}
          label={'Title'}
        />
        <AppTextInput
          value={body}
          setValue={(value: string) => setBody(value)}
          label={'Body'}
          multiline
        />
        <View style={{elevation:100,zIndex:100}}>
        <AppDropDown
          value={client}
          items={clients}
          setValue={setClient}
          label={'Client'}
        />
        </View>
        <AppDropDown
          value={category}
          items={categories}
          setValue={setCategory}
          label={'Category'}
        />
      </View>
      <View style={{height: '10%'}}>
        {data ? (
          <View style={styles.editButtonsContainer}>
            <TouchableOpacity
              onPress={() => onAddNote(false)}
              disabled={!enabled}
              style={[
                styles.buttonStyle,
                {
                  width: '40%',
                  backgroundColor: enabled ? '#000' : 'gray',
                },
              ]}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                dispatch(removeNote(data.id));
                navigation.navigate('NoteList');
              }}
              style={[
                styles.buttonStyle,
                {
                  width: '40%',
                },
              ]}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Delete</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => onAddNote(true)}
            disabled={!enabled}
            style={[
              styles.buttonStyle,
              {
                backgroundColor: enabled ? '#000' : 'gray',
              },
            ]}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>ADD</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export type TextInputProps = {
  label: string;
  value: string;
  setValue: (value: string) => void;
  multiline?: boolean;
};

const AppTextInput: React.FC<TextInputProps> = ({
  label,
  value = '',
  setValue,
  multiline = false,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.labelText}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={(text: string) => setValue(text)}
        style={{
          borderWidth: 2,
          borderRadius: 5,
          borderColor: 'black',
          fontSize: 20,
          height: multiline ? 150 : 50,
          textAlignVertical: 'top',
        }}
        returnKeyType='done'
        blurOnSubmit={true}
        multiline={multiline}
      />
    </View>
  );
};

export type DropDownProps = {
  label: string;
  value: ValueType;
  items: ItemType<ValueType>[];
  setValue: () => void;
};

const AppDropDown: React.FC<DropDownProps> = ({
  value,
  items,
  setValue,
  label,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.labelText}>{label}</Text>
      <DropDownPicker
        style={styles.dropDownStyle}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {marginHorizontal: 20, marginTop: 15},
  labelText: {fontSize: 20},
  dropDownStyle: {borderWidth: 2, borderRadius: 5, borderColor: 'black'},
  buttonStyle: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: '#000',
  },
  editButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default AddNote;
