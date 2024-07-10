export interface SelectItem {
  id: number;
  name: string;
}
export type SelectDropdownProps = {
  data: SelectItem[] /* array */;
  onSelect?: any /* function  */;
  defaultButtonText?: any /* String */;
  buttonTextAfterSelection?: any /* function */;
  rowTextForSelection?: any /* function */;
  defaultValue?: any /* any */;
  defaultValueByIndex?: any /* integer */;
  disabled?: any /* boolean */;
  /////////////////////////////
  buttonStyle?: any /* style object for button */;
  buttonTextStyle?: any /* style object for button text */;
  renderCustomizedButtonChild?: any /* function returns React component for customized button */;
  /////////////////////////////
  overlay?: any;
  renderDropdownIcon?: any;
  dropdownIconPosition?: any;
  statusBarTranslucent?: any;
  dropdownStyle?: any;
  /////////////////////////////
  rowStyle?: any /* style object for row */;
  rowTextStyle?: any /* style object for row text */;
  renderCustomizedRowChild?: any;
};
