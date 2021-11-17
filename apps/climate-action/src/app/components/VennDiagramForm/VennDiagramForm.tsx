import { Save } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import { useMachine } from '@xstate/react';
import { FormField } from './formFields';
import { formMachine } from './formMachine';
import styles from './VennDiagramForm.module.scss';

/* eslint-disable-next-line */
export interface VennDiagramFormProps {
  formFields: FormField[];
  onChangeHandler?: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
  onSubmitHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function VennDiagramForm(props: VennDiagramFormProps) {
  const { formFields } = props;
  const [current, send] = useMachine(formMachine);

  const onSubmitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    send({
      type: 'SUBMIT',
    });
  };

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const value = event.target.value;
    send({
      type: 'CHANGE',
      data: {
        value,
        key: id,
      },
    } as any);
    console.log(event.target.value, id);
    console.log(current);
  };
  console.log('NOW', current);

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        '& .MuiTextField-root': { m: 1 },
      }}
    >
      <h1 style={{ color: 'white' }}>Climate Action Venn Diagram</h1>
      {current.context.errors && <h3>ERROR</h3>}
      <div>
        {!current.matches('success') &&
          formFields.map(({ id, label, placeholder, value }) => {
            return (
              <div key={id} className="field-wrapper">
                <TextField
                  style={{ backgroundColor: 'white' }}
                  required
                  id={id}
                  label={label}
                  placeholder={placeholder}
                  value={current.context.inputValues[id]}
                  multiline
                  size="medium"
                  fullWidth
                  color="primary"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeHandler(e, id);
                  }}
                  variant="filled"
                />
              </div>
            );
          })}
        {current.matches('success') && (
          <Button
            onClick={() => {
              send({ type: 'AGAIN' });
            }}
          >
            LETS GO AGAIN
          </Button>
        )}

        <div className={styles.submit_wrapper}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            endIcon={<Save />}
            onClick={onSubmitHandler}
          >
            Submit
          </Button>
        </div>
      </div>
    </Box>
  );
}

export default VennDiagramForm;
