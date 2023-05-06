import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Subs from '../screens/admin/Subs';

const Tab = createMaterialTopTabNavigator();

const AdminStack = () => {
  
  return (
    <Tab.Navigator>
      <Tab.Screen name="docs" component={Subs} />
      <Tab.Screen name="pharmacists" component={Subs} />
      <Tab.Screen name="registrars" component={Subs} />
    </Tab.Navigator>
  )
}

export default AdminStack