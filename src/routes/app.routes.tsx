import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Groups } from "@screens/Groups";
import { NewGroup } from "@screens/NewGroup";
import { Players } from "@screens/Players";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    //define a rota inicial e desabilita o cabeçalho gerado pelo navigator
    <Navigator initialRouteName="groups" screenOptions={{ headerShown: false}}>
      <Screen name="groups" component={Groups} />
      <Screen name="new" component={NewGroup} />
      <Screen name="players" component={Players} />
    </Navigator>
  );
}
