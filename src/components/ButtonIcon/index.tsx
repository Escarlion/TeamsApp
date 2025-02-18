import { Container, ButtonIconTypestyleProps, Icon } from "./styles";

import { TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
  //Também poderia funcionar via string, mas desta maneira pega os tipos direto da biblioteca
  icon: keyof typeof MaterialIcons.glyphMap;
  type?: ButtonIconTypestyleProps;
};

export function ButtonIcon({ icon, type = "PRIMARY", ...rest }: Props) {
  return (
    <Container>
      <Icon name={icon} type={type} />
    </Container>
  );
}
