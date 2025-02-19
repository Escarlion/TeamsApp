import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";
import { FlatList } from "react-native";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard/indes";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

type RouteParams = {
  group: string;
}

export function Players() {
  // usa "Time A" como estado inicial
  const [team, setTeam] = useState("Time A");
  const [players, setPlayers] = useState([  ]);

  //pega um parametro vindo da rota de navegação
  const route = useRoute();
  //aplica a tipagem na variavel
  const { group } = route.params as RouteParams;

  return (
    <Container>
      <Header showBackButton />
      <Highlight
        title={group}
        subtitle="adicione participantes e separe os grupos!"
      />
      <Form>
        <Input
          placeholder="Nome do participante"
          //impede que o corretor tente corrigir o texto
          autoCorrect={false}
        />

        <ButtonIcon icon="add" />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B", "Time C"]}
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
        
      <FlatList
      style={{maxHeight: 350, marginBottom: 12}}
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
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

      <Button title="Remover Turma" type="SECONDARY" />
    </Container>
  );
}
