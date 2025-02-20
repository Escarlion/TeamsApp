import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";

//Retorna os dados de todos os grupos salvos
export async function groupsGetAll() {
  try {
    //obtem informações armazenadas no dispositivo
    const storage = await AsyncStorage.getItem(GROUP_COLLECTION);

    //Se tiver conteudo no storage, ele faz um parse (passa string para obj)
    const groups: string[] = storage ? JSON.parse(storage) : [];

    return groups;

  } catch (error) {
    throw error;
  }
}
