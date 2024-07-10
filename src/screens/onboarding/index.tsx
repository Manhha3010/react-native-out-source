import { scale, SCREEN_WIDTH } from 'common/scale';
import SelectDropDown from 'components/selectDropDown';
import { SelectItem } from 'components/selectDropDown/types';
import TextApp from 'components/textApp';
import * as React from 'react';
import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DUMMY_DATA: SelectItem[] = [
  {
    id: 1,
    name: '2025 Business Plan',
  },
  {
    id: 2,
    name: '2024 Business Plan',
  },
  {
    id: 3,
    name: '2023 Business Plan',
  },
];

const OnboardingScreen: FC = () => {
  const [selectedItem, setSelectedItem] = React.useState<SelectItem | null>(
    null,
  );
  const onSelect = (item: SelectItem) => {
    setSelectedItem(item);
  };

  return (
    <SafeAreaView edges={['right', 'left', 'top']} style={styles.container}>
      {/* <View
        style={{
          flex: 1,
        }}
      /> */}
      <TextApp>Hihi</TextApp>
      <SelectDropDown
        data={DUMMY_DATA}
        defaultValue={DUMMY_DATA[1]}
        buttonStyle={styles.btnStyle}
        onSelect={onSelect}
        buttonTextStyle={styles.btnTextStyle}
        // dropdownStyle={{
        //   height: scale(150),
        // }}
      />
      <TextApp>
        Bạn vừa chọn: {selectedItem ? selectedItem.name : 'Chưa chọn'}
      </TextApp>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF4F3',
    alignItems: 'center',
  },
  btnStyle: {
    width: SCREEN_WIDTH - scale(40),
    height: scale(50),
    backgroundColor: '#FFF',
    borderRadius: scale(6),
    borderColor: '#D3D8E0',
    borderWidth: scale(1),
  },
  btnTextStyle: {
    fontSize: scale(20),
    fontWeight: 'bold',
    lineHeight: scale(28),
    // fontFamily: FontDefault.primary,
  },
});
