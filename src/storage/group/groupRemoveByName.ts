import AsyncStorage from '@react-native-async-storage/async-storage';

import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig';

import { groupsGetAll } from './groupsGetAll';

//Remove o grupo especifico da lista de grupo e 
// deleta todos os dados da chave PLAYER_COLLECTION que estava ligada ao grupo
export async function groupRemoveByName(groupName: string){
    try{
        const storedGroups = await groupsGetAll();

        const groups = storedGroups.filter(group => group !== groupName);

        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`);
    }catch(error){
        throw error;
    }
}
