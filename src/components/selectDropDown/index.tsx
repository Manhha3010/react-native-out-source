/* eslint-disable react-native/no-inline-styles */
import { scale } from 'common/scale';
import TextApp from 'components/textApp';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  I18nManager,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Icon } from 'react-native-paper';
import { SelectDropdownProps } from './types';

const { width: widthScreen, height: heightScreen } = Dimensions.get('window');

const DROPDOWN_MAX_HEIGHT = heightScreen * 0.4;

const SelectDropdown = (
  {
    data /* array */,
    onSelect /* function  */,
    defaultButtonText /* String */,
    buttonTextAfterSelection /* function */,
    rowTextForSelection /* function */,
    defaultValue /* any */,
    defaultValueByIndex /* integer */,
    disabled /* boolean */,
    /////////////////////////////
    buttonStyle /* style object for button */,
    buttonTextStyle /* style object for button text */,
    renderCustomizedButtonChild /* function returns React component for customized button */,
    /////////////////////////////
    overlay,
    renderDropdownIcon,
    dropdownIconPosition,
    statusBarTranslucent,
    dropdownStyle,
    /////////////////////////////
    rowStyle /* style object for row */,
    rowTextStyle /* style object for row text */,
    renderCustomizedRowChild /* function returns React component for customized row */,
  }: SelectDropdownProps,
  ref: any,
) => {
  ///////////////////////////////////////////////////////
  useImperativeHandle(ref, () => ({
    reset: () => {
      reset();
    },
    openDropdown: () => {
      openDropdown();
    },
    closeDropdown: () => {
      closeDropdown();
    },
  }));
  ///////////////////////////////////////////////////////
  // Dropdown height calculation
  const calculateDropdownHeight = () => {
    if (dropdownStyle && dropdownStyle.height) {
      return dropdownStyle.height;
    } else {
      if (!data || data.length === 0) {
        return 150;
      } else {
        if (rowStyle && rowStyle.height) {
          const height = rowStyle.height * data.length;
          return height < DROPDOWN_MAX_HEIGHT ? height : DROPDOWN_MAX_HEIGHT;
        } else {
          const height = 50 * data.length;
          return height < DROPDOWN_MAX_HEIGHT ? height : DROPDOWN_MAX_HEIGHT;
        }
      }
    }
  };
  ///////////////////////////////////////////////////////
  const DropdownButton: any = useRef(); // button ref to get positions
  const [isVisible, setIsVisible] = useState(false); // dropdown visible ?
  const [dropdownPX, setDropdownPX] = useState(0); // position x
  const [dropdownPY, setDropdownPY] = useState(0); // position y
  const [dropdownHEIGHT, setDropdownHEIGHT] = useState(() => {
    return calculateDropdownHeight();
  }); // dropdown height
  const [dropdownWIDTH, setDropdownWIDTH] = useState(0); // dropdown width
  ///////////////////////////////////////////////////////
  const [selectedItem, setSelectedItem] = useState(data[-1]); // selected item from dropdown
  const [index, setIndex] = useState(-1); // index of selected item from dropdown
  const dropDownScrollViewRef: any = useRef(null); // ref to the drop down ScrollView
  const [heightDropDownBtn, setHeightDropDownBtn] = useState(0); // height of the dropdown button
  ///////////////////////////////////////////////////////
  /* ********************* Style ********************* */
  const styles = StyleSheet.create({
    dropdownButton: {
      flexDirection: dropdownIconPosition === 'left' ? 'row' : 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#EFEFEF',
      width: widthScreen / 2,
      height: 45,
      paddingHorizontal: 8,
      // overflow: "hidden",
    },
    dropdownButtonText: {
      flex: 1,
      fontSize: 18,
      textAlign: 'center',
      marginHorizontal: 8,
    },
    dropdownCustomizedButtonParent: {
      flex: 1,
      marginHorizontal: 8,
      overflow: 'hidden',
    },
    //////////////////////////////////////
    dropdownOverlay: {
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    dropdownOverlayView: {
      backgroundColor: '#fff',
      paddingVertical: 10,
      borderRadius: 6,
    },
    dropdownOverlayViewForce: {
      position: 'absolute',
      top: dropdownPY,
      height: dropdownHEIGHT,
      width: dropdownWIDTH,
      borderTopWidth: 0,
      overflow: 'hidden',
    },
    dropdownOverlayViewForceRTL: I18nManager.isRTL
      ? { right: dropdownPX }
      : { left: dropdownPX },
    dropdownActivityIndicatorView: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    //////////////////////////////////////
    dropdownRow: {
      flex: 1,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomColor: '#C5C5C5',
      // borderBottomWidth: 1,
      borderLeftWidth: 5,
      borderLeftColor: '#DCE1E8',
    },
    dropdownRowText: {
      flex: 1,
      fontSize: 18,
      color: '#555657',
      marginHorizontal: 8,
      fontWeight: 'bold',
    },
    dropdownCustomizedRowParent: {
      flex: 1,
      marginHorizontal: 8,
      overflow: 'hidden',
    },
    //////////////////////////////////////
    shadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 10,
    },
  });
  ///////////////////////////////////////////////////////
  /* ******************* useEffect ******************* */
  useEffect(() => {
    // data array changes
    if (data.length === 0) {
      reset();
      if (defaultValueByIndex && data && data[defaultValueByIndex]) {
        setDefault(defaultValueByIndex);
      }
      if (defaultValue && data && findIndexInArr(defaultValue, data) >= 0) {
        setDefault(findIndexInArr(defaultValue, data));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  useEffect(() => {
    // default value by index added or changed
    if (
      defaultValueByIndex !== null &&
      defaultValueByIndex !== undefined &&
      data &&
      data[defaultValueByIndex]
    ) {
      setDefault(defaultValueByIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValueByIndex]);
  useEffect(() => {
    if (defaultValue && data) {
      if (findIndexInArr(defaultValue, data) >= 0) {
        setDefault(findIndexInArr(defaultValue, data));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);
  useEffect(() => {
    // for height changes
    setDropdownHEIGHT(calculateDropdownHeight());
    const height = buttonStyle
      ? buttonStyle?.height
        ? buttonStyle?.height
        : styles.dropdownButton.height
      : 0;
    setHeightDropDownBtn(height);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dropdownStyle, data]);

  /* ******************** Methods ******************** */
  const openDropdown = () => {
    DropdownButton?.current.measure(
      (fx: any, fy: any, w: any, h: any, px: any, py: any) => {
        // console.log('position y => ', py, '\nheight', h, '\nposition x => ', px)
        if (heightScreen - 18 < py + h + dropdownHEIGHT) {
          setDropdownPX(px);
          setDropdownPY(py - 2 - dropdownHEIGHT + heightDropDownBtn);
          setDropdownWIDTH(w);
        } else {
          setDropdownPX(px);
          setDropdownPY(py);
          setDropdownWIDTH(w);
        }
      },
    );
    setIsVisible(true);
  };
  const handleSelect = (item: any, position: number) => {
    closeDropdown();
    onSelect && onSelect(item, position);
    setSelectedItem(item);
    setIndex(position);
  };
  const closeDropdown = () => {
    setIsVisible(false);
  };
  const reset = () => {
    setSelectedItem(data[-1]);
    setIndex(-1);
  };
  const setDefault = (position: any) => {
    setSelectedItem(data[position]);
    setIndex(position);
  };
  const findIndexInArr = (obj: any, arr: any) => {
    if (typeof obj === 'object') {
      let defaultValueIndex = -1;
      for (let i = 0; i < arr?.length; i++) {
        const element = arr[i];
        if (isEqual(element, defaultValue)) {
          defaultValueIndex = i;
        }
        if (i === arr?.length - 1) {
          if (defaultValueIndex >= 0) {
            setDefault(defaultValueIndex);
          }
        }
      }
      return defaultValueIndex;
    } else {
      let defaultValueIndex = -1;
      for (let i = 0; i < arr?.length; i++) {
        const element = arr[i];
        if (element === defaultValue) {
          defaultValueIndex = i;
        }
        if (i === arr?.length - 1) {
          if (defaultValueIndex >= 0) {
            setDefault(defaultValueIndex);
          }
        }
      }
      return defaultValueIndex;
    }
  };

  const renderDropdown = () => {
    return (
      isVisible && (
        <Modal
          animationType="none"
          transparent={true}
          statusBarTranslucent={
            statusBarTranslucent ? statusBarTranslucent : false
          }
          visible={isVisible}
          style={[styles.dropdownOverlay]}>
          <TouchableOpacity
            activeOpacity={1}
            style={[styles.dropdownOverlay, { opacity: overlay }]}
            onPress={closeDropdown}
          />
          <View
            style={[
              styles.dropdownOverlayView,
              styles.shadow,
              dropdownStyle,
              styles.dropdownOverlayViewForce,
              styles.dropdownOverlayViewForceRTL,
            ]}>
            {!data || data.length === 0 ? (
              <View style={[styles.dropdownActivityIndicatorView]}>
                <ActivityIndicator size="small" color={'#999999'} />
              </View>
            ) : (
              <ScrollView
                ref={dropDownScrollViewRef}
                showsVerticalScrollIndicator={false}
                onLayout={() => {
                  if (index >= 3 && dropDownScrollViewRef) {
                    dropDownScrollViewRef?.current.scrollTo({
                      y:
                        rowStyle && rowStyle.height
                          ? rowStyle.height * index
                          : 50 * index,
                      animated: false,
                    });
                  }
                }}>
                {data.map((item: any, position: number) => {
                  return (
                    <View
                      style={{
                        borderBottomColor: '#fff',
                        borderBottomWidth: index === data.length ? 0 : 4,
                      }}>
                      <TouchableOpacity
                        key={position.toString()}
                        style={[
                          styles.dropdownRow,
                          rowStyle,
                          position === index && {
                            backgroundColor: '#F2F5FA',
                            borderLeftWidth: 5,
                            borderLeftColor: '#176AE5',
                          },
                        ]}
                        onPress={handleSelect.bind(null, item, position)}>
                        {renderCustomizedRowChild ? (
                          <View style={[styles.dropdownCustomizedRowParent]}>
                            {renderCustomizedRowChild(
                              rowTextForSelection
                                ? rowTextForSelection(item, position)
                                : item.name,
                              position,
                            )}
                          </View>
                        ) : (
                          <TextApp
                            numberOfLines={1}
                            allowFontScaling={false}
                            style={[
                              styles.dropdownRowText,
                              rowTextStyle,
                              position === index && {
                                color: '#104BA3',
                              },
                            ]}>
                            {rowTextForSelection
                              ? rowTextForSelection(item, position)
                              : item.name}
                          </TextApp>
                        )}
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            )}
          </View>
        </Modal>
      )
    );
  };

  const rightIcon = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: 38,
          borderLeftColor: '#D3D8E0',
          borderLeftWidth: 1,
          // backgroundColor: 'red',
          paddingLeft: 8,
        }}>
        <Icon source="chevron-down" size={scale(20)} color={'#555657'} />
      </View>
    );
  };
  ///////////////////////////////////////////////////////
  return (
    <TouchableOpacity
      disabled={disabled}
      ref={DropdownButton}
      activeOpacity={0.5}
      style={[styles.dropdownButton, buttonStyle]}
      onPress={openDropdown}>
      {renderDropdown()}
      {renderDropdownIcon ? renderDropdownIcon() : rightIcon()}
      {renderCustomizedButtonChild ? (
        <View style={[styles.dropdownCustomizedButtonParent]}>
          {renderCustomizedButtonChild(selectedItem, index)}
        </View>
      ) : (
        <Text
          numberOfLines={1}
          allowFontScaling={false}
          style={[styles.dropdownButtonText, buttonTextStyle]}>
          {selectedItem
            ? buttonTextAfterSelection
              ? buttonTextAfterSelection(selectedItem, index)
              : selectedItem.name
            : defaultButtonText
            ? defaultButtonText
            : 'Chọn thông tin...'}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default forwardRef((props: SelectDropdownProps, ref) =>
  SelectDropdown(props, ref),
);

function isEqual(value1: any, value2: any) {
  // Check if both values are strictly equal
  if (value1 === value2) {
    return true;
  }

  // Check if either value is null or undefined
  if (value1 == null || value2 == null) {
    return value1 === value2;
  }

  // Check if both values are arrays
  if (Array.isArray(value1) && Array.isArray(value2)) {
    if (value1.length !== value2.length) {
      return false;
    }
    for (let i = 0; i < value1.length; i++) {
      if (!isEqual(value1[i], value2[i])) {
        return false;
      }
    }
    return true;
  }

  // Check if both values are objects
  if (typeof value1 === 'object' && typeof value2 === 'object') {
    const keys1 = Object.keys(value1);
    const keys2 = Object.keys(value2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (!isEqual(value1[key], value2[key])) {
        return false;
      }
    }
    return true;
  }

  // If none of the above conditions are met, the values are not equal
  return false;
}
