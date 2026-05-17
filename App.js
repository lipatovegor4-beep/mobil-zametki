import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  SafeAreaView, 
  Keyboard 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  // Загружаем заметки из памяти устройства при старте приложения
  useEffect(() => {
    loadNotes();
  }, []);

  // Функция чтения из AsyncStorage
  const loadNotes = async () => {
    try {
      const savedNotes = await AsyncStorage.getItem('@notes_key');
      if (savedNotes !== null) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (error) {
      console.error("Ошибка при загрузке заметок:", error);
    }
  };

  // Функция добавления новой заметки с сохранением
  const addNote = async () => {
    if (!title.trim() || !text.trim()) {
      alert("Пожалуйста, заполните заголовок и текст заметки!");
      return;
    }

    const newNote = {
      id: Date.now().toString(),
      title: title,
      text: text,
    };

    const updatedNotes = [newNote, ...notes];
    setNotes(updatedNotes);
    
    setTitle('');
    setText('');
    Keyboard.dismiss();

    // Сохраняем обновленный массив в память устройства
    try {
      await AsyncStorage.setItem('@notes_key', JSON.stringify(updatedNotes));
    } catch (error) {
      console.error("Ошибка при сохранении заметки:", error);
    }
  };

  // Функция удаления заметки с обновлением памяти
  const deleteNote = async (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);

    try {
      await AsyncStorage.setItem('@notes_key', JSON.stringify(updatedNotes));
    } catch (error) {
      console.error("Ошибка при удалении записи:", error);
    }
  };

  const renderNoteItem = ({ item }) => (
    <View style={styles.noteCard}>
      <View style={styles.noteContent}>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text style={styles.noteText}>{item.text}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteNote(item.id)}>
        <Text style={styles.deleteButtonText}>Удалить</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Мобильные заметки</Text>
      
      <View style={styles.formContainer}>
        <TextInput style={styles.input} placeholder="Заголовок заметки" value={title} onChangeText={setTitle} />
        <TextInput style={[styles.input, styles.textArea]} placeholder="Текст заметки..." value={text} onChangeText={setText} multiline={true} numberOfLines={4} />
        <TouchableOpacity style={styles.addButton} onPress={addNote}>
          <Text style={styles.addButtonText}>Добавить заметку</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        renderItem={renderNoteItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>У вас нет сохраненных заметок.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingTop: 40 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginVertical: 15, color: '#333' },
  formContainer: { backgroundColor: '#fff', padding: 15, marginHorizontal: 15, borderRadius: 10, elevation: 3, marginBottom: 15 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 6, padding: 10, marginBottom: 10, fontSize: 16 },
  textArea: { height: 80, textAlignVertical: 'top' },
  addButton: { backgroundColor: '#007AFF', padding: 12, borderRadius: 6, alignItems: 'center' },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  listContainer: { paddingHorizontal: 15 },
  noteCard: { backgroundColor: '#fff', padding: 15, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, borderLeftWidth: 5, borderLeftColor: '#007AFF' },
  noteContent: { flex: 1, paddingRight: 10 },
  noteTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5, color: '#222' },
  noteText: { fontSize: 14, color: '#666' },
  deleteButton: { backgroundColor: '#FF3B30', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  deleteButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 40, fontSize: 16 }
});