import { TextInputProps } from "react-native";
import { useTheme } from "styled-components";

import { Container } from "./styles";

export function Input({ ...rest }: TextInputProps) {
  //Desestrutura o tema para utilizar apenas as cores, ignorando os outros componentes
  const { COLORS } = useTheme();
  return <Container placeholderTextColor={COLORS.GRAY_300} {...rest} />;
}
