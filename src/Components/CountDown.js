import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
const minutesToMilli = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);
export const CountDown = ({ isPaused, min, onProgress,onEnd }) => {
  const interval = useRef(null);
  const countDown = () => {
    setTime((time) => {
      if (time === 0) {
        clearInterval(interval.current)
        
        return time;
      }
      const timeLeft = time - 1000;
      
      return timeLeft;
    });
  };
  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countDown, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);
  const [time, setTime] = useState(null);
  useEffect(() => {
    setTime(minutesToMilli(min));
    onEnd()
  }, [min]);
  useEffect(() => {
    onProgress(time / minutesToMilli(min));
    if(time ===0){

    }
  }, [time]);
  const minutes = Math.floor(time / 1000 / 60) % 60;
  const seconds = Math.floor(time / 1000) % 60;
  return (
    <Text style={styles.time}>
      {formatTime(minutes)} : {formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  time: {
    textAlign: 'center',
    fontSize: 80,
    textWeight: 'bold',
  },
});
