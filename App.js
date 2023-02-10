import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert,Button, Image,TextInput } from 'react-native';

export default function App() {

  const [ingredient, setIngredient] = useState('')
  const [recipies, setRecipies] = useState([]);

  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`



  const getRecipes = () => {
    fetch(url)
    .then(response => response.json())
    .then(responseJson => setRecipies(responseJson.meals))
    
    .catch(error => { 
        Alert.alert('Error', error); 
    });    
  }
  

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.searchView}>
        <TextInput 
      style={{fontSize: 18, width: 200, border: 2}} 
      placeholder='ingredient' 
      value={ingredient}
      onChangeText={text => setIngredient(text)} 
     />
    <Button title="Find" onPress={getRecipes} />

    </View>

      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item}) => 
          <View>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}</Text>
            <Image style={styles.tinyLogo} source={{uri: item.strMealThumb}} ></Image>
          </View>}
        data={recipies} 
        ItemSeparatorComponent={listSeparator} /> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  searchView: {
    marginTop:30,
    borderWidth: 4
  }
});
