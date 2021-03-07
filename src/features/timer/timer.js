import React, { useState } from 'react';
import { Text, View, StyleSheet, Vibration } from 'react-native';
import { CountDown } from '../../Components/CountDown';
import { RoundedButton } from '../../Components/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import { Timing } from './timing';
import { useKeepAwake } from 'expo-keep-awake';
const DEFAULT_TIME = 0.2
export const Timer = ({ focusSubject,onTimerEnd, isPause,addToHistory,setFocusSubject }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [progress, setProgress] = useState(1);
  const onProgress = (progress) => setProgress(progress);
  const onChangeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false)
  };
  const onEnd = () => {
    setMinutes(DEFAULT_TIME);
    vibrate()
    setProgress(1);
    setIsStarted(false);
    addToHistory(focusSubject,1);
    setFocusSubject(null);
  };
  const vibrate = () => {
   const interval = setInterval(() =>Vibration.vibrate(),1000)
   setTimeout(() => clearInterval(interval),8000)
  }
  return (
    <View style={styles.container}>
      <View style={styles.countDown}>
        <CountDown
          isPaused={!isStarted}
          onProgress={onProgress}
          min={minutes}
          onEnd={onEnd}
        />
      </View>
      <Text style={styles.title}> You are focusing on: </Text>
      <Text style={styles.task}>{focusSubject}</Text>
      <View style={{ padding: 10 }}>
        <ProgressBar
          color="#4326ef"
          style={{ height: 10 }}
          progress={progress}
        />
      </View>
      <View style={styles.button}>
        <Timing changeTime={onChangeTime} />
      </View>
      <View style={styles.button}>
        <RoundedButton
          title={isStarted ? 'pause' : 'start'}
          size={150}
          textStyle={{ fontSize: 20 }}
          onPress={() => setIsStarted(!isStarted)}
        />
      </View>
      <View style={styles.button}>
        <RoundedButton
          title='cancel'
          size={50}
          textStyle={{ fontSize: 10 }}
          onPress={() => {
                addToHistory(focusSubject,0);
                setFocusSubject(null);
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
  },
  task: {
    textAlign: 'center',
    fontSize: 30,
    textWeight: 'bold',
  },
  countDown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    flex: 0.3,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
