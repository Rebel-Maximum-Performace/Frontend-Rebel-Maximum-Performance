import InfoCard from "../components/InfoCard";

export default {
  title: "Atoms/Info Card",
  component: InfoCard,
};

const Template = (args) => <InfoCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: "320px",
  title: "Title",
  data: "10",
};

export const LargeData = Template.bind({});
LargeData.args = {
  width: "320px",
  title: "Title",
  data: "10000000000000000000000",
};
