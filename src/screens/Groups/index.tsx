import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { GroupCard } from "@components/GroupCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";

import { useState } from "react";
import { FlatList } from "react-native";

import { Container } from "./styles";
import { List } from "phosphor-react-native";

export function Groups() {
  const [groups, setGroups] = useState<string[]>([
    'Grupo 01'
  ]);

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com sua turma!!!" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <GroupCard title={item} />}

        //Muda o estilo do container de acordo com as condições
        contentContainerStyle={groups.length === 0 && { flex: 1 }}

        //Qual componente será rederizado quando a lista estiver vazia
        ListEmptyComponent={() => 
        <ListEmpty 
          message="Adicione novas equipes!" 
        />}
      />

      <Button 
        title="Criar nova turma."
      />
    </Container>
  );
}
