import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { RoundedButton } from '../../Components/RoundedButton';
export const Timing = ({ changeTime }) => {
  return (
    <>
      <View style={styles.timingButton}>
        <RoundedButton size={90} title="10" onPress={() => changeTime(10)} />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton size={90} title="15" onPress={() => changeTime(15)} />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton size={90} title="20" onPress={() => changeTime(20)} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
