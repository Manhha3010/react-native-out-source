import { IconAssets } from 'assets/iconAssets';
import { scale } from 'common/scale';
import { isIos } from 'common/utils';
import ErrorLabel from 'components/errorLabel';
import { Label } from 'components/label';
import { LabelProps } from 'components/label/type';

import TextApp from 'components/textApp';
import moment from 'moment';
import * as React from 'react';
import { Keyboard } from 'react-native';
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from 'themes/theme.style';
type CalendarPickerProps = {
  placeholder?: string;
  rightChildren?: React.ReactNode;
  styleContainer?: ViewStyle;
  styleText?: TextStyle;
  onPickDate?: Function;
  minDate?: string;
  maxDate?: string;
  styleErrorContainer?: ViewStyle;
  styleErrorText?: TextStyle;
  errorMsg?: string;
  defaultDate?: Date;
} & LabelProps;

const CalendarPicker = ({
  rightChildren,
  styleContainer,
  styleText,
  onPickDate,
  label,
  placeholder = 'Chọn ngày...',
  required,
  styleLabelText,
  styleLabelContainer,
  minDate,
  maxDate,
  styleErrorContainer,
  styleErrorText,
  defaultDate = new Date(),
  errorMsg = '',
}: CalendarPickerProps) => {
  const [selectDate, setSelectDate] = React.useState<Date>();
  const modalizeRef = React.useRef<any>();
  const value = selectDate
    ? moment(selectDate).format('DD/MM/YYYY')
    : placeholder;
  const min = minDate || moment().subtract(100, 'days').format('YYYY-MM-DD');
  const max = maxDate || moment().add(100, 'days').format('YYYY-MM-DD');
  const handlePickDate = (dayTimeStamp: any) => {
    setSelectDate(dayTimeStamp);
    onPickDate && onPickDate(dayTimeStamp);
    modalizeRef.current?.close();
  };
  const handleOpenDatePicker = () => {
    Keyboard.dismiss();
    modalizeRef.current.open();
  };
  return (
    <>
      {label && (
        <Label
          label={label}
          required={required}
          styleLabelText={styleLabelText}
          styleLabelContainer={styleLabelContainer}
        />
      )}
      <TouchableOpacity
        style={[styles.container, styleContainer]}
        onPress={handleOpenDatePicker}>
        <TextApp
          style={[styles.input, !selectDate && styles.placeHolder, styleText]}>
          {value}
        </TextApp>
        {rightChildren ? (
          rightChildren
        ) : (
          <IconAssets.Calendar width={18} height={18} />
        )}
      </TouchableOpacity>
      <ErrorLabel
        errorMsg={errorMsg}
        textStyle={styleErrorText}
        style={styleErrorContainer}
      />
      <Portal>
        <Modalize
          modalStyle={styles.calendarModal}
          adjustToContentHeight={true}
          childrenStyle={{ minHeight: scale(350) }}
          ref={modalizeRef}>
          <Calendar
            style={styles.calendar}
            minDate={min}
            maxDate={max}
            renderArrow={(direction: string) =>
              direction === 'left' ? (
                <Icon name="angle-left" color={theme.PRIMARY_COLOR} size={18} />
              ) : (
                <Icon
                  name="angle-right"
                  color={theme.PRIMARY_COLOR}
                  size={18}
                />
              )
            }
            markedDates={{
              [moment(selectDate || defaultDate).format('YYYY-MM-DD')]: {
                selected: true,
                selectedColor: theme.PRIMARY_COLOR,
              },
            }}
            initialDate={
              selectDate
                ? moment(selectDate).format('YYYY-MM-DD')
                : moment(defaultDate).format('YYYY-MM-DD')
            }
            // Handler which gets executed on day press. Default = undefined
            onDayPress={(day: any) => {
              handlePickDate(day.timestamp);
            }}
            // Specify theme properties to override specific styles for calendar parts. Default = {}
            theme={{
              todayTextColor: theme.PRIMARY_COLOR_100,
            }}
          />
        </Modalize>
      </Portal>
    </>
  );
};

export default CalendarPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: 10,
    borderColor: theme.BORDER_INPUT,
    paddingVertical: isIos ? 2 : 1,
  },
  input: {
    flex: 1,
    padding: 10,
    borderBottomColor: 'transparent',
    fontSize: scale(14),
  },
  placeHolder: {
    color: theme.PLACE_HOLDER,
  },
  calendarModal: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  calendar: {
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    overflow: 'hidden',
  },
});
