import { Groups } from '@screens/Groups';
import { Loading } from '@components/Loading';
import theme from './src/theme/theme';

import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';


export default function App() {

  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold});

  return (
    <ThemeProvider theme={theme}>
      <StatusBar 
      barStyle={"light-content"}
      translucent
      backgroundColor={'transparent'}
      />
      { fontsLoaded ? <Groups /> : <Loading />}
    </ThemeProvider>
    
  );
}
