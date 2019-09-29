import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MaterialTable, { MTableBodyRow } from "material-table";
import Input from "components/Input/Input";
import axios from "axios";
import Paper from '@material-ui/core/Paper';




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



export default function HorizontalLabelPositionBelowStepper(props) {
    const [orderForm, setOrderForm] = React.useState({
        cantidad: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                label: 'Cantidad',
                fullWidth: true,
                inputProps: {
                  autoFocus:true
                }
            },
            value: '',
            validation: {
                required: true,
                mayor0: true
            },
            valid: false,
            touched: false
        }
    });
    const [formIsValid, setFormIsValid] = React.useState(false);
    const [insumos, setInsumos] = React.useState([]);
    const [rowInsumo, setRowInsumo] = React.useState(null);
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
        let orderFormAlt = { ...orderForm };
        orderFormAlt.cantidad.value = '';
        setOrderForm(orderFormAlt);
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleFinish = () => {
        props.onClickInsumo(rowInsumo.id, orderForm.cantidad.value);
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

        if (rules.mayor0 && isValid) {
            isValid = value >= 0;
            textValid = 'La cantidad debe ser mayor a 0'
        }

        if (rules.minLength && isValid) {
            isValid = value.length >= rules.minLength;
            textValid = 'La cantidad de caracteres minimos es ' + rules.minLength
        }

        if (rules.maxLength && isValid) {
            isValid = value.length <= rules.maxLength;
            textValid = 'Supera el maximo de caracteres';
        }

        return { isValid: isValid, textValid: textValid };
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
        checkValid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
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

    const getStepContent = (stepIndex) => {
        switch (stepIndex) {
            case 0:
                return <MaterialTable
                    columns={props.columnsInsumos}
                    data={insumos}
                    title="Insumo"
                    onRowClick={(event, rowData) => {

                        setRowInsumo(rowData);
                        handleNext();
                    } }
                    components={{
                        Container: props => (
                            <Paper elevation={0} {...props} />
                        )
                    }}


                    />;

            case 1:

                return (<React.Fragment>
                    <p><span style={{ fontWeight:'300'}}>Código: </span>
                      {rowInsumo.codigo}</p>
                     <p><span style={{ fontWeight:'300'}}>Descripción: </span>
                      {rowInsumo.descripcion}</p>

                    {
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
                    }</React.Fragment>);
            default:
                return 'Paso no seleccionado';
        }
    }

    const getInsumos = () => {
        axios.get('/list-insumos')
            .then(res => {
                if (res.data.success == 1) {
                    let resultado = [...res.data.result];
                    setInsumos(resultado);
                }
            })
    }


    React.useEffect(() => {

        getInsumos();

    }, []);

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
                <div >
                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                    <div style={{ marginTop:'2em'}}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            className={classes.backButton}
                            >
                            Atras
              </Button>
                        {activeStep === steps.length - 1 ? (
                            <Button variant="contained" color="primary" disabled={!formIsValid} onClick={handleFinish}>
                                Agregar
                              </Button>
                        ) : null}

                    </div>
                </div>

            </div>
        </div>
    );
}
