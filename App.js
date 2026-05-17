// =======================================================
// Практическое занятие №6: «Мобильные заметки»
// Студент: Липатов Егор
// Группа: ИУК2-42Б
// =======================================================

import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Мобильные заметки</Text>
      
      <View style={styles.formContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Заголовок заметки" 
          value={title}
          onChangeText={setTitle}
        />
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Текст заметки..." 
          value={text}
          onChangeText={setText}
          multiline={true}
          numberOfLines={4}
        />
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Добавить заметку</Text>
        </TouchableOpacity>
      </View>
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
});