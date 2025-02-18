import { useNavigation } from "@react-navigation/native";
import { Container, Logo, BackButton, BackIcon } from "./style";

import logoImg from "@assets/logo.png";

type Props = {
  showBackButton?: boolean;
};

export function Header({ showBackButton = false }: Props) {

const navigation = useNavigation();

function handleGoBack(){
  navigation.navigate("groups");
}

  return (
    <Container>
      {

        //se verdadeiro, mostra o que está abaixo
        showBackButton && 
        <BackButton onPress={handleGoBack}>
          <BackIcon />
        </BackButton>
      }

      <Logo source={logoImg} />
    </Container>
  );
}
