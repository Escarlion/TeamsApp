import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "@storage/storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";

//Remove um integrante pegandos todos os membros de um grupo, excluindo o integrante escolhido e retornando o resultado
export async function playerRemoveByGroup(playerName: string, group: string) {
    try{
        const storage = await playersGetByGroup(group);

        //Pega todos os players com exceção do que deve ser removido e sobrescreve os dados
        const filtered = storage.filter(player => player.name !== playerName)
        const players = JSON.stringify(filtered);

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);

    }catch(error){
        throw error;
    }
}
