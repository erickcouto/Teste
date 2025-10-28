import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { HeaderLogo } from '../components/HeaderLogo';
import { HomeScreen } from '../screens/HomeScreen';
import { PromotionsScreen } from '../screens/PromotionsScreen';
import { NewsScreen } from '../screens/NewsScreen';
import { InstagramScreen } from '../screens/InstagramScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { AboutScreen } from '../screens/AboutScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#ff6600',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Mapa') {
            iconName = 'map-outline';
          } else if (route.name === 'Promoções') {
            iconName = 'pricetag-outline';
          } else if (route.name === 'Notícias') {
            iconName = 'newspaper-outline';
          } else if (route.name === 'Instagram') {
            iconName = 'logo-instagram';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        }
      })}
    >
      <Tab.Screen name="Mapa" component={HomeScreen} />
      <Tab.Screen name="Promoções" component={PromotionsScreen} />
      <Tab.Screen name="Notícias" component={NewsScreen} />
      <Tab.Screen name="Instagram" component={InstagramScreen} />
    </Tab.Navigator>
  );
}

function CustomDrawerContent(props: React.ComponentProps<typeof DrawerContentScrollView>) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: 0 }}>
      <View style={{ paddingVertical: 32, alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee' }}>
        <HeaderLogo />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff'
  }
};

export function AppNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Drawer.Navigator
        screenOptions={({ navigation }) => ({
          headerTitle: () => <HeaderLogo />,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <TouchableOpacity onPress={navigation.toggleDrawer} style={{ paddingHorizontal: 16 }}>
              <Ionicons name="menu" size={24} color="#333" />
            </TouchableOpacity>
          )
        })}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="Explorar" component={HomeTabs} />
        <Drawer.Screen name="Entre em contato" component={ContactScreen} />
        <Drawer.Screen name="Sobre o app" component={AboutScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
