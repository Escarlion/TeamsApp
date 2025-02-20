import { Container, Content, Icon } from "./styles";
import { useState } from "react";

import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

export function NewGroup() {
  //variavel que é usada no input para determinar o nome do grupo
  const [group, setGroup] = useState("");

  const navigation = useNavigation();

  async function handleNew() {
    try {
      //retira espaços e verifica se há algo escrito
      if (group.trim().length === 0) {
        return Alert.alert("Novo Grupo", "Informe o nome da turma.");
      }

      await groupCreate(group);
      //passa a variavel group para a proxima tela
      navigation.navigate("players", { group });
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Novo Grupo", error.message);
      } else {
        Alert.alert("Novo Grupo", "Não foi possível criar um novo grupo");
        console.log(error);
      }
    }
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

        <Input placeholder="Nome da turma" onChangeText={setGroup} />

        <Button title="Criar" style={{ marginTop: 20 }} onPress={handleNew} />
      </Content>
    </Container>
  );
}
