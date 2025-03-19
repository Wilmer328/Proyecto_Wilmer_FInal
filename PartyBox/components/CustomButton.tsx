import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Pressable } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
}

const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, style, textStyle }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.button, style, animatedStyle]}>
        <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;