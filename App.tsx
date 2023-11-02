import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import WelcomeScreen from "./src/screens/Welcome";
import HomeScreen from "./src/screens/Home/HomeScreen";
import SignInScreen from "./src/screens/Authentication/SignInScreen";
import SignUpScreen from "./src/screens/Authentication/SignUpScreen";
import CartScreen from "./src/screens/Cart/CartScreen";
import ProfileScreen from "./src/screens/Profile/ProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import Products from "./src/screens/Home/Products";
import SearchResult from "./src/screens/Home/SearchResult";
import ProductDescription from "./src/screens/Cart/ProductDescription";
import ChangePasswordScreen from "./src/screens/Authentication/ChangPasswordScreen";
import OrderManagerScreen from "./src/screens/Manager/OrderManagerScreen";
import UserManagerScreen from "./src/screens/Manager/UserManagerScreen";
import PayScreen from "./src/screens/Cart/PayScreen";
// import Loading from "./components/Loading/Loading";
const Tab = createBottomTabNavigator();

function Mytabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: () => (
            <AntDesign name="shoppingcart" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons name="ios-person-outline" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="SearchResult" component={SearchResult} />
          <Stack.Screen name="Main" component={Mytabs} />
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen
            name="ProductDescription"
            component={ProductDescription}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
          <Stack.Screen
            name="OrderManagerScreen"
            component={OrderManagerScreen}
          />
          <Stack.Screen
            name="UserManagerScreen"
            component={UserManagerScreen}
          />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="PayScreen" component={PayScreen} />
          <Stack.Screen name="Profile" component={Mytabs} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}
