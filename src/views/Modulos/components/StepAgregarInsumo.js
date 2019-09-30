import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MaterialTable,{MTableBodyRow } from "material-table";
import Input from "components/Input/Input";
import {localization} from "variables/general.js";

var idInsumo = null;



const useStyles = makeStyles(theme => ({
    root: {
        width: '90%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Seleccione un Insumo', 'Modificar cantidad'];
}

function getStepContent(stepIndex, props, formElementsArray,handleNext,inputChangedHandler) {
    switch (stepIndex) {
        case 0:
            return <MaterialTable
                columns={props.columnsInsumos}
                data={props.insumos}
                title="Insumo"
                localization={localization}
                onRowClick={(event, rowData) => {

                   idInsumo = rowData.id;
                   handleNext();
                } }


                />;

        case 1:

            return (<div>{
                formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        textValid={formElement.config.textValid}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => inputChangedHandler(event, formElement.id)}
                        />
                ))
            }</div>);
        default:
            return 'Paso no seleccionado';
    }
}

export default function HorizontalLabelPositionBelowStepper(props) {
  const [orderForm, setOrderForm] = React.useState({
      cantidad: {
          elementType: 'input',
          elementConfig: {
              type: 'number',
              label: 'Cantidad',
              fullWidth: true
          },
          value: '',
          validation: {
              required: true
          },
          valid: false,
          touched: false
      }
  });
  const [formIsValid, setFormIsValid] = React.useState(false);
    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });
    }
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
      let orderFormAlt = {...orderForm};
      orderFormAlt.cantidad.value = '';
      setOrderForm(orderFormAlt);
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleFinish = () => {
      props.onClickInsumo(idInsumo,orderForm.cantidad.value);
    }

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const checkValidity = (value, rules) => {
        let isValid = true;
        let textValid = null;

        if (rules.required && isValid) {
            isValid = value.toString().trim() !== '';
            textValid = 'El campo es requerido'
        }

        if (rules.minLength && isValid) {
            isValid = value.length >= rules.minLength;
            textValid = 'La cantidad de caracteres minimos es ' + rules.minLength
        }

        if (rules.maxLength && isValid) {
            isValid = value.length <= rules.maxLength ;
            textValid = 'Supera el maximo de caracteres';
        }

        return {isValid:isValid,textValid:textValid};
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        let checkValid;
        const updatedOrderForm = {
            ...orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        checkValid =  checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.valid = checkValid.isValid;
        updatedFormElement.textValid = checkValid.textValid;
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValidAlt = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
        }
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValidAlt);
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                        <div>
                            <Typography className={classes.instructions}>{getStepContent(activeStep, props, formElementsArray,handleNext,inputChangedHandler)}</Typography>
                            <div>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.backButton}
                                    >
                                    Atras
              </Button>
                            {activeStep === steps.length - 1 ? (
                              <Button variant="contained" color="primary" onClick={handleFinish}>
                                  Agregar
                              </Button>
                            ) : null}

                            </div>
                        </div>

            </div>
        </div>
    );
}
