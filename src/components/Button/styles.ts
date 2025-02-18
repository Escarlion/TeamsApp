import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

//Define que o type pode ser Primary OU Secondary
export type ButtonTypeStyleProps = "PRIMARY" | "SECONDARY";

type Props = {
  type: ButtonTypeStyleProps;
};

//Utiliza variaveis tipadas
export const Container = styled(TouchableOpacity)<Props>`
  flex: 1;
  justify-content: center;
  align-items: center;

  //previne que o tamanho seja influenciado
  min-height: 56px;
  max-height: 56px;

  //acessa o type utilizando as Props e o usa para determinar a cor do botão
  //NÃO APAGAR A LINHA COMENTADA ABAIXO, SE NÃO O BOTÃO FICA SEM FUNDO (???????)
  //background-color: red;
  background-color: ${({ theme, type }) =>
    type === "PRIMARY" ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};

  border-radius: 6px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD}px;
    font-family: ${theme.FONT_FAMILY.BOLD};
    color: ${theme.COLORS.WHITE};
  `};
`;
