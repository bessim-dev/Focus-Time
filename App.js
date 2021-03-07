import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Focus } from './src/features/focus/focus';
import { FocusHistory } from './src/features/focus/focusHistory';
import { Timer } from './src/features/timer/timer';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);
  const addToHistory = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
  };
  const saveFocusHistory = async () => {
    try{
      AsyncStorage.set('focusHistory', JSON.stringify(focusHistory) )
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
    saveFocusHistory();
  },[focusHistory])
  const loadFocusHistory = async () => {
    try{
      const history = await AsyncStorage.getItem('focusHistory');
      if(history && JSON.parse(history).length){
        setFocusHistory(JSON.parse(history))
      }
    }catch(e){
      console.log(e)
    }
  }
  useEffect(()=>{
    loadFocusHistory();
  },[])
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          setFocusSubject={setFocusSubject}
          addToHistory={addToHistory}
        />
      ) : (
        <>
          <Focus
            addSubject={setFocusSubject}
            onTimerEnd={() => setFocusSubject(null)}
          />
          <FocusHistory focusHistory={focusHistory} setFocusHistory={setFocusHistory} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: '#26efa8',
  },
});
