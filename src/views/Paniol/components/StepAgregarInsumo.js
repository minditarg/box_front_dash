//COMPONENTES GENERALES
import React from 'react';
import Database from "variables/Database.js";
import {toast } from 'react-toastify';

//COMPONENTES LOCALES
import Input from "components/Input/Input";
import {localization} from "variables/general.js";
import $ from 'jquery';

//ESTILOS Y COLORES
import { makeStyles } from '@material-ui/core/styles';

//CONTENEDORES
import MaterialTable, { MTableBodyRow } from "material-table";
import Paper from '@material-ui/core/Paper';

//BOTONES Y VARIOS
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

const columnsInsumosDetalle = [
    { title: "Identificador", field: "identificador", editable: 'never' },
    { title: "Descripcion", field: "descripcion", editable: 'never' },
    { title: "Disponible", field: "disponible", editable: 'never' },

];


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
    const classes = useStyles();
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
                mayor0: true,
                disponible:true
            },
            valid: false,
            touched: false
        }
    });
    const [formIsValid, setFormIsValid] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [insumos, setInsumos] = React.useState([]);
    const [rowInsumo, setRowInsumo] = React.useState(null);
    const formElementsArray = [];
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();


     React.useEffect(() => {
       var url;
       if(props.devolucion)
          url = '/list-devoluciones-insumos-modulo/' + props.idModulo;
       if(props.entrega)
          url = '/list-entregas-insumos-modulo/' + props.idModulo;

      getInsumos(url);

    }, []);

     const getInsumos = (url) => {
        setIsLoading(true);
        Database.get(url,this)
            .then(res => {
                setIsLoading(false);
                    let resultado = [...res.result];
                    resultado = resultado.map(elem=>{
                      elem.cantidad_modulo_insumo = elem.cantidad_modulo_insumo && Number(elem.cantidad_modulo_insumo) 
                      elem.cantidad_asignada = elem.cantidad_asignada && Number(elem.cantidad_asignada)
                      elem.cantidad = elem.cantidad && Number(elem.cantidad)
                      elem.costo = elem.costo && Number(elem.costo)

                      let disponible;
                      if(props.devolucion)
                        disponible = elem.cantidad_asignada;
                      if(props.entrega)
                        {
                          if(elem.cantidad_modulo_insumo - elem.cantidad_asignada <= elem.cantidad)
                              disponible = elem.cantidad_modulo_insumo - elem.cantidad_asignada
                            else
                              disponible = elem.cantidad;
                        }

                        return {
                            ...elem,
                            identificador:elem.codigo + elem.numero,
                            disponible: disponible

                        }
                    })
                    setInsumos(resultado);
                    $(".MuiDialog-root input").each(function(index,element){
                      if(index == 0)
                      element.focus();
                    })

            },err => {
              setIsLoading(false);
              toast.error(err.message);
            })
    }




    const handleNext = () => {
        let orderFormAlt = { ...orderForm };
        orderFormAlt.cantidad.value = '';

       // alert("handleNext");
        setOrderForm(orderFormAlt);
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleFinish = () => {
        props.onClickInsumo(rowInsumo, orderForm.cantidad.value);
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

        if (rules.disponible && isValid) {
            isValid = value <= rowInsumo.disponible;
            textValid = 'La cantidad no debe superar la disponible'
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
                    isLoading={isLoading}
                    columns={columnsInsumosDetalle}
                    data={insumos}
                    title="Insumo"
                    localization={localization}
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
                      <p><span style={{ fontWeight:'300'}}>Unidad: </span>
                      {rowInsumo.unidad}</p>
                       <p><span style={{ fontWeight:'300'}}>Stock:
                      </span>{rowInsumo.cantidad + " " +  rowInsumo.unidad}<br/>
                      <span style={{ fontWeight:'300'}}>Total Módulo: </span>{rowInsumo.cantidad_modulo_insumo + " " +  rowInsumo.unidad} <br/>
                      <span style={{ fontWeight:'300'}}>Asignada: </span>{rowInsumo.cantidad_asignada + " " +  rowInsumo.unidad}<br/>
                      <span style={{ backgroundColor: 'lightgreen'}}>Disponible: {rowInsumo.disponible + " " +  rowInsumo.unidad} </span>

                       </p>

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

     for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });
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
