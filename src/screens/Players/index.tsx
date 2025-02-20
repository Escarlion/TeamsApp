import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { Alert, FlatList, TextInput } from "react-native";
import { useState, useEffect, useRef } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard/indes";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";

import { AppError } from "@utils/AppError";

import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

type RouteParams = {
  group: string;
};

export function Players() {
  const [isLoading, setIsLoading] = useState(true);
  // usa "Time A" como estado inicial
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");

  //pega um parametro vindo da rota de navegação
  const route = useRoute();
  const navigation = useNavigation();
  //aplica a tipagem na variavel
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  //carrega as informações dos integrantes de acordo com a equipe selecionada
  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const playersByTeam = await playersGetByGroupAndTeam(group, team);

      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Integrantes",
        "Ocorreu um erro ao carregar os dados dos integrantes do time selecionado."
      );
    } finally {
      setIsLoading(false);
    }
  }
  //Chamado pelo botão de adicionar integrantes, verifica se o nome do integrande é valido (!= null)
  //adiciona o integrante ao grupo selecionado e retira o foco do Input
  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert(
        "Adicionar novo integrante",
        "Informe o nome do participante para continuar."
      );
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    };

    try {
      await playerAddByGroup(newPlayer, group);

      //retira o foco do input
      newPlayerNameInputRef.current?.blur();

      //limpa o input e carrega novamente os dados
      setNewPlayerName("");
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Adicionar novo integrante", error.message);
      } else {
        console.log(error);
        Alert.alert(
          "Adicionar novo integrante",
          "Ocorreu um erro ao adicionar um novo participante."
        );
      }
    }
  }
  //remove um integrante especifico
  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Remover participante",
        "Ocorreu um erro ao remover o participante."
      );
    }
  }

  async function handleGroupRemove() {
    Alert.alert("Remover!", "Deseja remover a turma?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: () => groupRemove() },
    ]);
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate("groups");
    } catch (error) {
      console.log(error);
      Alert.alert("Remover grupo", "Ocorreu um erro ao remover o grupo.");
    }
  }

  //usa o estado como metodo de atualização
  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="adicione participantes e separe os grupos!"
      />
      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome do participante"
          //impede que o corretor tente corrigir o texto
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          //chama a função após apartar o pronto no teclado
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumbersOfPlayers>{players.length}</NumbersOfPlayers>
      </HeaderList>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          style={{ maxHeight: 300, marginBottom: 12 }}
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => {
                handlePlayerRemove(item.name);
              }}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas neste time" />
          )}
          showsVerticalScrollIndicator={false}
          //adiciona um espaço vazio no fim da lista e aplica um flex de forma condicional
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}

      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </Container>
  );
}
