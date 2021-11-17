import { assign, createMachine } from 'xstate';

interface FormContext {
  inputValues: {
    name: string;
    joy: string;
    magic: string;
    solutions: string;
    overlap: string;
  };
  errors: string;
}

const initialContext: FormContext = {
  inputValues: {
    name: '',
    joy: '',
    magic: '',
    solutions: '',
    overlap: '',
  },
  errors: '',
};

const onSubmit = () => {
  console.log('SUBMITTING');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const dice = Math.floor(Math.random() * Math.floor(2));

      // if (dice === 0)
      return resolve('SUCCESS');
      // mock call to save to sheets

      // return reject('FAILURE');
    }, 1000);
  });
};

// export const formMachine = createMachine<FormContext, FormEvent>(
export const formMachine = createMachine(
  {
    key: 'form',
    initial: 'editing',
    context: initialContext,
    states: {
      editing: {
        initial: 'pristine',
        on: {
          CHANGE: {
            target: '',
            actions: ['onChange'],
          },
          SUBMIT: {
            cond: 'formIsCompleted',
            target: 'submitting',
          },
        },
        states: {
          pristine: {
            entry: ['clearForm'],
          },
          error: {},
        },
      },
      submitting: {
        invoke: {
          src: () => onSubmit(),
          onDone: 'success',
          onError: {
            target: 'editing.error',
            actions: ['onError'],
          },
        },
      },
      error: {},
      success: {
        on: {
          AGAIN: 'editing',
        },
      },
    },
  },
  {
    actions: {
      onChange: assign({
        inputValues: (ctx, e: any) => {
          const { key, value } = e.data;
          return {
            ...ctx.inputValues,
            [key]: value,
          };
        },
      }),
      onError: assign({
        errors: (_ctx, e: any) => {
          console.log(e);
          return e.data;
        },
      }),
      clearForm: () => {
        assign({
          inputValues: () => initialContext.inputValues,
          errors: () => initialContext.errors,
        });
      },
    },
    guards: {
      formIsCompleted: (ctx, e) => {
        console.warn('GUARD', ctx);
        return Object.entries(ctx.inputValues).every((input) => {
          const [key, value] = input;
          if (!value) {
            return false;
          }
          return true;
        });
      },
    },
  }
);
