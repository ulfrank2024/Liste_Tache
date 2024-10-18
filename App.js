import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View, Alert } from "react-native";
import { s } from "./App.style.js";
import { Header } from "./components/header/Header.jsx";
import { Carteliste } from "./components/Carteliste/Carteliste.jsx";
import { TabBottunMenu } from "./components/TabBottunMenu/TabBottumMenu.jsx";
import { useEffect, useState } from "react";
import { ButtonAdd } from "./components/ButtonAdd/ButtonAdd.jsx";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid"
import AsyncStorage from "@react-native-async-storage/async-storage";
let isFirstRender = true
let isLoadUpdate = false
export default function App() {
  const [selectedTabName, setSelectedTabName] = useState("enCour");
  const [tacheListe, setTacheListe] = useState([]);
  const [isAddDialogVisible, setIsAddDialogVisible] = useState(false);
  const [inputValue, setInputValue]=useState("")
useEffect(()=>{
  loadTacheListe()
},[])

useEffect(()=>{
  if(isLoadUpdate){
    isLoadUpdate= false
  }
  else{if(!isFirstRender){
    saveTacheList()
  }
  else{
    isFirstRender=false
  }}
},[tacheListe])

//function de sauvegarde des donnees
async function saveTacheList(){
  try{
    await AsyncStorage.setItem("@tacheList", JSON.stringify(tacheListe))
  }
  catch(err){
 alert("Erreur "+err)
  }
}
//fonction pour charger les donnees
async function loadTacheListe(){
  try{
   const stringifiedTachelist = await AsyncStorage.getItem("@tacheList")
   if(stringifiedTachelist !== null){
    const parsetacheList= JSON.parse(stringifiedTachelist)
    isLoadUpdate= true
    setTacheListe(parsetacheList)
   }
  }
  catch(err){
 alert("Erreur "+err)
  }
}

  function getFilterRedList() {
    switch (selectedTabName) {
      case "tous":
        return tacheListe;
      case "enCour":
        return tacheListe.filter((tache) => !tache.isCompled);
      case "fait":
        return tacheListe.filter((tache) => tache.isCompled);
    }
  }

  function updateListe(liste) {
    const updateListe = {
      ...liste,
      isCompled: !liste.isCompled,
    };
    const indexToupdate = tacheListe.findIndex(
      (liste) => liste.id === updateListe.id
    );
    const updatetacheListe = [...tacheListe];
    updatetacheListe[indexToupdate] = updateListe;
    setTacheListe(updatetacheListe);
  }
  function deletTache(tacheToDelete) {
    Alert.alert("Suppression", "Supprimer cette tache ?", [
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          setTacheListe(
            tacheListe.filter((liste) => liste.id !== tacheToDelete.id)
          );
        },
      },
      { text: "Annuler", style: "cancel" },
    ]);
  }
  function rendertacheListe() {
    return getFilterRedList().map((liste) => (
      <View style={s.cardItem} key={liste.id}>
        <Carteliste
          onLonPress={deletTache}
          onPress={updateListe}
          liste={liste}
        />
      </View>
    ));
  }
  function showAddDialoge() {
    setIsAddDialogVisible(true)
  }
  function addTache(){
    const newTache ={
      id: uuid.v4(),
      title: inputValue,
      isCompled:false
    }
    setTacheListe([...tacheListe, newTache])
    setIsAddDialogVisible(false)
  }
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            <ScrollView>{rendertacheListe()}</ScrollView>
          </View>
          <ButtonAdd onPress={showAddDialoge} />
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <TabBottunMenu
          tacheList={tacheListe}
          onPress={setSelectedTabName}
          selectedTabName={selectedTabName}
        />
      </View>
      <Dialog.Container
        visible={isAddDialogVisible}
        onBackdropPress={() => setIsAddDialogVisible(false)}
      >
        <Dialog.Title>Créer une nouvelle tache</Dialog.Title>
        <Dialog.Description>
          Choisi un nom pour la nouvelle tache
        </Dialog.Description>
        <Dialog.Input onChangeText={setInputValue} />
        <Dialog.Button onPress={addTache} label="Créer" disabled={inputValue.trim().length ===0} />
      </Dialog.Container>
    </>
  );
}
