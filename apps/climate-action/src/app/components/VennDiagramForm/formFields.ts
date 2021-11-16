export interface FormField {
  id: string;
  label: string;
  placeholder: string;
  value: string;
}

export const formFields: Array<FormField> = [
  {
    id: 'name',
    label: 'Your name',
    placeholder: 'Any name you want to give us.',
    value: '',
  },
  {
    id: 'joy',
    label: 'What brings you joy?',
    placeholder: 'What gets you up in the morning?',
    value: '',
  },
  {
    id: 'magic',
    label: 'What are you good at?',
    placeholder: 'Your special skills, network, resources & magic',
    value: '',
  },
  {
    id: 'solutions',
    label: 'What is the work that needs doing?',
    placeholder: 'Climate and justice solutions.',
    value: '',
  },
  {
    id: 'overlap',
    label: 'What can I do?',
    placeholder: 'What can I bring to the table?',
    value: '',
  },
];
