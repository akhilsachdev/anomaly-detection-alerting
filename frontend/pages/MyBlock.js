import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';
import {Formik, Form, Field} from 'formik';
import {Container, Grid} from '@mui/material';
import styles from './MyBlock.module.css';

// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//     formWrapper: {
//       marginTop: theme.spacing(5),
//       marginBottom: theme.spacing(8),
//     },
//   }));

const MyBlock = () => {

    const [key, setKey] = useState('')
    const initialValues = {key: ""}

    
    const selectStyle = {
        padding: '10px',
        borderRadius: '10px',
        minWidth: '200px',
        textAlign: 'center',
        margin: '60px 100px 10px 100px',
    }

    const submitStyle = {
        padding: '5px',
        borderRadius: '10px',
        minWidth: '200px',
        textAlign:'center',
        margin: '10px',
        backgroundColor: '#3b82f6',
        color: 'white',
        margin: '10px 100px 50px 100px',
        // borderColor: 'white',
    }



    return (
        <div className={styles.center}>
        <Formik initialValues={initialValues} onSubmit={(values) => axios.get(`http://127.0.0.1:5000/anomaly/${values.key}`).then(response => console.log(response))} >
            <Form>
                <h2 className={styles.titleText}>Anomaly Detection</h2>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <Field as="select" name="key" placeholder="Select a key" style={selectStyle}>
                            <option>Select a key</option>
                            <option value="leads">Leads</option>
                            <option value="churn_rate">Churn Rate</option>
                        </Field>

                    </Grid>
                    
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <button type="submit" style={submitStyle}>Submit</button>    
                    </Grid>
                </Grid>
                
            </Form>
        </Formik>
        </div>
    )
}


export default MyBlock;