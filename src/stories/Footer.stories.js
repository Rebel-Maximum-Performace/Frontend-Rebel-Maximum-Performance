import Footer from "../components/Footer";

export default {
  title: "Organisms/Footer",
  component: Footer,
};

const Template = (args) => <Footer {...args} />;

export const Admin = Template.bind({});
export const User = Template.bind({});

Admin.args = {
  role: "Admin",
};

User.args = {
  role: "User",
  onClickAboutUs: () => {},
  onClickContactUs: () => {},
  onClickFAQ: () => {},
  onClickAlibaba: () => {},
  onClickInstagram: () => {},
  onClickEmail: () => {},
  onClickAmazon: () => {},
};
