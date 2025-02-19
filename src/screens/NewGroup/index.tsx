import { Container, Content, Icon } from "./styles";
import { useState } from "react";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";

export function NewGroup() {
  //variavel que é usada no input para determinar o nome do grupo
  const [group, setGroup] = useState('');

  const navigation = useNavigation();

  function handleNew() {
    //passa a variavel group para a proxima tela
    navigation.navigate('players', { group });
  }

  return (
    <Container>
      <Header showBackButton />
      <Content>
        <Icon />

        <Highlight
          title="Nova turma"
          subtitle="crie uma nova turma para adicionar os participantes"
        />

        <Input 
        placeholder="Nome da turma"
        onChangeText={setGroup}
        
        />

        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  );
}
