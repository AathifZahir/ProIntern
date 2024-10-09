import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

const Login_Intern = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.navigate('Home_Intern'); // Navigate to Home if logged in
      }
    });

    // Cleanup the listener when component unmounts
    return unsubscribe;
  }, []);

  const handleLogin = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // User logged in
        setEmail(''); // Clear email field
        setPassword(''); // Clear password field
        setError(''); // Clear any previous errors
        setLoading(false);
        navigation.navigate('Home_Intern');
      })
      .catch(error => {
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to your account</Text>

      <TextInput
        placeholder="Your Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword_Intern')}>
        <Text style={styles.footerText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register_Intern')}>
        <Text style={styles.footerText}>Not registered yet?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#034694',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#034694',
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 15,
  },
  footerText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Login_Intern;