import React from 'react';
import { Text, StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import { RoundedButton } from '../../Components/RoundedButton';
const renderHistoryItem = ({ item, index }) => (
  <Text style={{ color: `${item.status ? 'green' : 'red'}`, fontSize: 20 }}>
    {item.subject}
  </Text>
);

export const FocusHistory = ({ focusHistory, setFocusHistory }) => {
  return (
    <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
      {!!focusHistory.length && (
        <>
          <Text style={{ fontSize: 35, fontWeight: 'bold', padding: 10 }}>
            Things youve focused on:
          </Text>
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{ flex: 1, alignItems: 'center' }}
            data={focusHistory}
            keyExtractor={(item) => item.subject}
            renderItem={renderHistoryItem}
          />
          <View style={styles.button}>
            <RoundedButton
              title="clear"
              size={80}
              textStyle={{ fontSize: 15 }}
              onPress={() => {
                setFocusHistory([]);
              }}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
