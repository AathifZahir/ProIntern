import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'expo-image-picker';
import { db, storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';
import { format } from 'date-fns';

const JournalCreate = ({ route, navigation }) => {
  const { date } = route.params;
  const [journalTitle, setJournalTitle] = useState('');
  const [journalContent, setJournalContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageFileName, setImageFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [previousContent, setPreviousContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const formattedDate = format(new Date(date), 'EEEE, MMMM d, yyyy');

  // Load existing journal entry if available
  useEffect(() => {
    const loadJournalEntry = async () => {
      const journalRef = doc(db, 'journals', date.toString());
      const journalDoc = await getDoc(journalRef);

      if (journalDoc.exists()) {
        const data = journalDoc.data();
        setJournalTitle(data.title);
        setJournalContent(data.content);
        setImageFileName(data.imageUrl.split('/').pop());
        setImage(data.imageUrl);
        setIsEditing(false);
      } else {
        setJournalTitle('');
        setJournalContent('');
        setImage(null);
        setImageFileName('');
        setIsEditing(false);
      }
    };

    loadJournalEntry();
  }, [date]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageFileName(result.assets[0].uri.split('/').pop());
    }
  };

  const handleSave = async () => {
    if (!journalTitle || !journalContent) {
      alert('Please fill in the title and content.');
      return;
    }

    setUploading(true);
    let imageUrl = null;

    try {
      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        const imageRef = ref(storage, `images/${imageFileName}`);
        await uploadBytes(imageRef, blob);
        imageUrl = await getDownloadURL(imageRef);
      }

      const journalRef = doc(db, 'journals', date.toString());
      await setDoc(journalRef, {
        title: journalTitle,
        content: journalContent,
        date: formattedDate,
        imageUrl: imageUrl || '',
      });

      alert('Journal saved successfully!');
      setUploading(false);
      navigation.goBack();
    } catch (error) {
      console.error("Error saving journal entry: ", error);
      alert("Failed to save journal entry. Please try again.");
      setUploading(false);
    }
  };

  const handleContentChange = (text) => {
    setPreviousContent(journalContent); // Store previous content for undo
    setJournalContent(text);
  };

  const handleEdit = () => {
    if (!isEditing) {
      setIsEditing(true);
      Alert.alert('Edit mode activated! You can now make changes.');
    }
  };

  const handleUndo = () => {
    setJournalContent(previousContent); // Restore previous content
    Alert.alert('Changes have been undone.');
  };

  const handleViewImage = () => {
    if (image) {
      setModalVisible(true);
    } else {
      Alert.alert("No image uploaded.");
    }
  };

  // Delete journal entry
  const handleDelete = async () => {
    Alert.alert(
      "Delete Entry",
      "Are you sure you want to delete this journal entry?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const journalRef = doc(db, 'journals', date.toString());
              await deleteDoc(journalRef);
              alert('Journal entry deleted successfully!');
              navigation.goBack();
            } catch (error) {
              console.error("Error deleting journal entry: ", error);
              alert("Failed to delete journal entry. Please try again.");
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Journal Title</Text>
        <TextInput
          placeholder="Enter title here..."
          style={styles.titleInput}
          value={journalTitle}
          onChangeText={setJournalTitle}
          editable={isEditing}
        />

        <Text style={styles.label}>Journal Content</Text>
        <TextInput
          placeholder="Write your thoughts and experiences here..."
          style={styles.contentInput}
          multiline
          numberOfLines={4}
          value={journalContent}
          onChangeText={handleContentChange}
          textAlignVertical="top"
          editable={isEditing}
        />

        <Text style={styles.label}>Journal Image</Text>
        <TouchableOpacity onPress={pickImage} style={styles.imageIconContainer}>
          {image ? (
            <TouchableOpacity onPress={handleViewImage}>
              <Image source={{ uri: image }} style={styles.imageThumbnail} />
            </TouchableOpacity>
          ) : (
            <Icon name="image" size={50} color="#ccc" />
          )}
        </TouchableOpacity>

        {/* Button container for edit and delete buttons */}
        <View style={styles.buttonContainer}>
          {/* Edit button positioned here */}
          <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
            <Icon name="edit" size={24} color="#fff" />
          </TouchableOpacity>

          {/* Undo button positioned here */}
          <TouchableOpacity onPress={handleUndo} style={styles.editButton}>
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>

          {/* Trash button for deleting the journal entry */}
          <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
            <Icon name="trash" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={uploading}>
        <Text style={styles.saveButtonText}>{uploading ? 'Saving...' : 'Save'}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Image source={{ uri: image }} style={styles.modalImage} />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  headerContainer: {
    marginBottom: 15,
    alignItems: 'center', // Center the content
  },
  dateText: {
    fontSize: 18,
    color: '#495057',
    fontWeight: 'bold',
    textAlign: 'center', // Center align the text
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    padding: 8,
    backgroundColor: '#023E8A', // Theme color
    borderRadius: 7,
  },
  deleteButton: {
    padding: 8,
    backgroundColor: '#e63946', // Color for delete button
    borderRadius: 7,
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#023E8A', // Theme color
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#023E8A', // Set text color here
    
  },
  titleInput: {
    borderWidth: 0.5,
    borderColor: '#023E8A',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    
  },
  contentInput: {
    borderWidth: 0.5,
    borderColor: '#023E8A',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    height: 100,
  },
  imageIconContainer: {
    marginBottom: 10,
  },
  imageThumbnail: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: '#023E8A', // Color for save button
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#ff0000',
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default JournalCreate;
