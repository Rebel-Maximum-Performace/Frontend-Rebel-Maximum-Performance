import TextInput from "../components/Form/TextInput";
import { TiPlus } from "react-icons/ti";

export default {
  title: "Atoms/Form/TextInput",
  component: TextInput,
};

const Template = (args) => <TextInput {...args} />;

export const Default = Template.bind({});
export const WithDetaultValue = Template.bind({});
export const WithIcon = Template.bind({});
export const WithLabel = Template.bind({});
export const WithHelperText = Template.bind({});
export const Error = Template.bind({});
export const Disabled = Template.bind({});

Default.args = {
  name: "label",
  placeholder: "Placeholder",
  isRequired: false,
  value: "",
  onChange: () => {},
  iconLeft: null,
  iconRight: null,
  isDisabled: false,
  isError: false,
  className: "max-w-max",
};

WithDetaultValue.args = {
  name: "label",
  placeholder: "Placeholder",
  isRequired: false,
  defaultValue: "Default Value",
  onChange: () => {},
  iconLeft: null,
  iconRight: null,
  isDisabled: false,
  isError: false,
  className: "max-w-max",
};

WithIcon.args = {
  name: "label",
  placeholder: "Placeholder",
  isRequired: false,
  value: "",
  onChange: () => {},
  iconLeft: <TiPlus className="w-[13px] md:w-[18px] h-[13px] md:h-[18px]" />,
  iconRight: <TiPlus className="w-[13px] md:w-[18px] h-[13px] md:h-[18px]" />,
  isDisabled: false,
  isError: false,
  className: "max-w-max",
};

WithLabel.args = {
  label: "Label",
  name: "label",
  placeholder: "Placeholder",
  isRequired: false,
  value: "",
  onChange: () => {},
  iconLeft: null,
  iconRight: null,
  isDisabled: false,
  isError: false,
  className: "max-w-max",
};

WithHelperText.args = {
  label: "Label",
  name: "label",
  helperText: "Helper Text",
  placeholder: "Placeholder",
  isRequired: false,
  value: "",
  onChange: () => {},
  iconLeft: null,
  iconRight: null,
  isDisabled: false,
  isError: false,
  className: "max-w-max",
};

Error.args = {
  label: "Label",
  name: "label",
  helperText: "Helper Text",
  placeholder: "Placeholder",
  isRequired: false,
  value: "",
  onChange: () => {},
  iconLeft: null,
  iconRight: null,
  isDisabled: false,
  isError: true,
  className: "max-w-max",
};

Disabled.args = {
  label: "Label",
  name: "label",
  helperText: "Helper Text",
  placeholder: "Placeholder",
  isRequired: false,
  value: "",
  onChange: () => {},
  iconLeft: null,
  iconRight: null,
  isDisabled: true,
  isError: false,
  className: "max-w-max",
};
