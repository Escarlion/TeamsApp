import AsyncStorage from "@react-native-async-storage/async-storage";

import { GROUP_COLLECTION } from "@storage/storageConfig";
import { groupsGetAll } from "./groupsGetAll";
import { AppError } from "@utils/AppError";

//Cria um novo grupo verificando se ja existe algum com o mesmo nome
export async function groupCreate(newGroup: string) {
  try {

    const storedGroups = await groupsGetAll();

    //verifica se ja existe um grupo com este nome 
    const groupAlreadyExists = storedGroups.includes(newGroup);

    //lança uma nova exceção caso o group ja exista
    if(groupAlreadyExists){
      throw new AppError("Já existe um grupo cadastrado com este nome");
    }

    //converte o array de objetos em um texto para poder salvar
    const storage = JSON.stringify([...storedGroups, newGroup]);
    //chave e valor
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);

  } catch (error) {
    throw error;
  }
}
