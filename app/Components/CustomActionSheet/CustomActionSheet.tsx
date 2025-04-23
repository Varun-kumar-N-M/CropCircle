import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import * as CONST from '../../utils/Constants';
import Scale from '../../utils/Scale';

interface CustomActionSheetProps {
  visible: boolean;
  options: string[];
  cancelButtonIndex?: number;
  onPress: (index: number) => void;
  onCancel: () => void;
}

const CustomActionSheet: React.FC<CustomActionSheetProps> = ({
  visible,
  options,
  cancelButtonIndex,
  onPress,
  onCancel,
}) => {
  const [modalVisible, setModalVisible] = useState(visible);
  const slideAnim = React.useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    setModalVisible(visible);
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleSelect = (index: number) => {
    // Call onPress first to ensure the parent component can set its state
    onPress(index);
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="fade"
      onRequestClose={onCancel}
      statusBarTranslucent={true}>
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View
              style={[
                styles.bottomSheet,
                { transform: [{ translateY }] },
              ]}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.option,
                    cancelButtonIndex === index && styles.cancelOption,
                  ]}
                  onPress={() => handleSelect(index)}>
                  <Text 
                    style={[
                      styles.optionText,
                      cancelButtonIndex === index && styles.cancelText,
                    ]}>
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: CONST.FLEX_END,
  },
  bottomSheet: {
    backgroundColor:CONST.WHITE_COLOR,
    borderTopLeftRadius: Scale(20),
    borderTopRightRadius: Scale(20),
  },
  option: {
    padding: Scale(16),
    alignItems: CONST.CENTER,
    borderBottomWidth: 1,
    borderBottomColor:'#f0f0f0',
  },
  optionText: {
    fontSize: Scale(16),
    color:CONST.BLACK_COLOR,
    fontWeight:CONST.fontWeight.Semibold,
  },
  cancelOption: {
    borderBottomWidth: Scale(1),
  },
  cancelText: {
    fontWeight: CONST.BOLD,
    color: '#007AFF',
  },
});

export default CustomActionSheet;