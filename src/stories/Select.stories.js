import Select from '../components/Form/Select';

export default {
  title: 'Atoms/Form/Select',
  component: Select,
};

const exampleOptions = [
  {
    label: 'Item 1',
    children: [
      {
        label: 'Sub-item 1.1',
        children: [
          {
            label: 'Sub-sub-item 1.1.1',
            children: null,
            value: 'Sub-sub-item 1.1.1',
          },
          {
            label: 'Sub-sub-item 1.1.2',
            children: null,
            value: 'Sub-sub-item 1.1.2',
          },
        ],
      },
      { label: 'Sub-item 1.2', children: null, value: 'Sub-item 1.2' },
    ],
  },
  {
    label: 'Item 2',
    children: [
      { label: 'Sub-item 2.1', children: null, value: 'Sub-item 2.1' },
      {
        label: 'Sub-item 2.2',
        children: [
          {
            label: 'Sub-sub-item 2.2.1',
            children: null,
            value: 'Sub-sub-item 2.2.1',
          },
          {
            label: 'Sub-sub-item 2.2.2',
            children: null,
            value: 'Sub-sub-item 2.2.2',
          },
        ],
      },
    ],
  },
  { label: 'Item 3', children: null, value: 'Item 3' },
];

const Template = (args) => <Select {...args} />;

export const Default = Template.bind({});
export const WithSelectedValue = Template.bind({});
export const WithSearch = Template.bind({});
export const Error = Template.bind({});
export const Disabled = Template.bind({});

Default.args = {
  width: '300px',
  options: exampleOptions,
  selected: null,
  onChange: () => {},
  placeholder: 'Select',
  isSearchable: false,
  isDisabled: false,
  isError: false,
  helperText: '',
};

WithSelectedValue.args = {
  width: '300px',
  options: exampleOptions,
  selected: 'Sub-item 1.2',
  onChange: () => {},
  placeholder: 'Select',
  isSearchable: false,
  isDisabled: false,
  isError: false,
  helperText: '',
};

WithSearch.args = {
  width: '300px',
  options: exampleOptions,
  selected: null,
  onChange: () => {},
  placeholder: 'Select',
  isSearchable: true,
  isDisabled: false,
  isError: false,
  helperText: '',
};

Error.args = {
  width: '300px',
  options: exampleOptions,
  selected: null,
  onChange: () => {},
  placeholder: 'Select',
  isSearchable: false,
  isDisabled: false,
  isError: true,
  helperText: 'Error Message',
};

Disabled.args = {
  width: '300px',
  options: exampleOptions,
  selected: null,
  onChange: () => {},
  placeholder: 'Select',
  isSearchable: false,
  isDisabled: true,
  isError: false,
  helperText: '',
};
