import { Save } from '@mui/icons-material';
import { Box, Button, TextField } from '@mui/material';
import { FormField } from './formFields';
import styles from './VennDiagramForm.module.scss';

/* eslint-disable-next-line */
export interface VennDiagramFormProps {
  formFields: FormField[];
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitHandler: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function VennDiagramForm(props: VennDiagramFormProps) {
  const { formFields, onChangeHandler, onSubmitHandler } = props;

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        '& .MuiTextField-root': { m: 1 },
      }}
    >
      <h1>Climate Action Venn Diagram</h1>
      <div>
        {formFields.map(({ id, label, placeholder, value }) => {
          return (
            <div key={id} className="field-wrapper">
              <TextField
                required
                id={id}
                label={label}
                placeholder={placeholder}
                value={value}
                multiline
                size="medium"
                fullWidth
                color="primary"
                onChange={onChangeHandler}
                // variant="filled"
              />
            </div>
          );
        })}
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
