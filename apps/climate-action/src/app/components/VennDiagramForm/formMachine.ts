import { assign, createMachine } from 'xstate';
import { remoteApiPostData } from '../../services/remoteApi';
import { formIsCompleted } from '../../services/utils';

export interface FormContext {
  inputValues: InputFieldNames;
  errors: string;
}

interface InputFieldNames {
  name: string;
  joy: string;
  magic: string;
  solutions: string;
  overlap: string;
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

const onSubmit = (formData: InputFieldNames) => {
  console.log('SUBMITTING');
  return new Promise((resolve, reject) => {
    const url = `${process.env.NX_SHEETS_BASE_URL}/${process.env.NX_SHEETS_CONNECTION_ID}`;
    const data = {
      ...formData,
      'created at': new Date(),
    };

    remoteApiPostData(url, data)
      .then((response) => {
        console.log(response);
        return response;
      })
      .then((response) => {
        console.log('SUCCESS');
        resolve('SUCCESS');
      })
      .catch((e) => {
        console.log(e);
        reject({ status: 'FAIL', error: e });
      });
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
          SUBMIT: [
            {
              cond: 'formIsCompleted',
              target: 'submitting',
            },
            { target: 'editing.error' },
          ],
        },
        states: {
          pristine: {
            entry: ['clearForm'],
          },
          dirty: {

          },
          error: {
            on: {
              CHANGE: {
                target: 'dirty',
              },
            },
          },
        },
      },
      submitting: {
        invoke: {
          src: (ctx, _) => onSubmit(ctx.inputValues),
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
        errors: (ctx, e: any) => {
          console.log(e);
          return formIsCompleted(ctx, e)
            ? 'Please fill out the entire form.'
            : e.data.toString();
        },
      }),
      clearForm: assign({
        errors: () => initialContext.errors,
        inputValues: () => initialContext.inputValues,
      }),
    },
    guards: {
      formIsCompleted,
    },
  }
);
