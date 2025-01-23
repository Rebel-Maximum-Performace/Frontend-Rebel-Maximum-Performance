import Button from "../components/Button";
import { RiUserFill } from "react-icons/ri";

export default {
  title: "Atoms/Button",
  component: Button,
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
export const Secondary = Template.bind({});
export const Third = Template.bind({});
export const Outlined = Template.bind({});
export const Disabled = Template.bind({});
export const WithIcon = Template.bind({});

Primary.args = {
  state: "default",
  variant: "contained",
  color: "primary",
  iconLeft: null,
  iconRight: null,
  children: "Button",
};

Secondary.args = {
  state: "default",
  variant: "contained",
  color: "secondary",
  iconLeft: null,
  iconRight: null,
  children: "Button",
};

Third.args = {
  state: "default",
  variant: "contained",
  color: "third",
  iconLeft: null,
  iconRight: null,
  children: "Button",
};

Outlined.args = {
  state: "default",
  variant: "outlined",
  color: "primary",
  iconLeft: null,
  iconRight: null,
  children: "Button",
};

Disabled.args = {
  state: "disabled",
  variant: "contained",
  color: "primary",
  iconLeft: null,
  iconRight: null,
  children: "Button",
};

WithIcon.args = {
  state: "default",
  variant: "contained",
  color: "primary",
  iconLeft: (
    <RiUserFill className="w-[13px] md:w-[18px] h-[13px] md:h-[18px]" />
  ),
  iconRight: (
    <RiUserFill className="w-[13px] md:w-[18px] h-[13px] md:h-[18px]" />
  ),
  children: "Button",
};
