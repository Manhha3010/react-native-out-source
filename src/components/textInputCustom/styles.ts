import { scale } from 'common/scale';
import { isIos } from 'common/utils';
import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  input: {
    flex: 1,
    color: '#000',
    padding: isIos ? scale(10) : scale(6),
    borderBottomColor: 'transparent',
    fontSize: scale(14),
    letterSpacing: 1,
  },
  containerInput: {
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: scale(10),
  },
  inputError: {
    borderColor: '#DB433D',
    borderWidth: 1,
  },
  multiline: {
    height: scale(100),
    paddingTop: 10,
  },
});
