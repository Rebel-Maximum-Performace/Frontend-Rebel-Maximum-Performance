import TopBar from "../components/TopBar";

export default {
  title: "Organisms/Top Bar",
  component: TopBar,
};

const Template = (args) => <TopBar {...args} />;

export const User = Template.bind({});
export const Admin = Template.bind({});

User.args = {
  role: "User",
  onSearch: () => {},
  onClickLogo: () => {},
  onClickEmail: () => {},
  onClickWhatsapp: () => {},
  categoryList: [],
};

Admin.args = {
  role: "Admin",
  onSearch: () => {},
  onClickLogo: () => {},
  onClickProfile: () => {},
};
