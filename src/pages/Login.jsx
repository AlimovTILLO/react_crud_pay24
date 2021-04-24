import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Dimmer, Loader, Form, Input, Button, Header, Segment } from 'semantic-ui-react'


import { authenticationActions } from '../actions';

export function Login() {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(authenticationActions.logout())
    }, []);

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(authenticationActions.login(username, password, from));
        }
    }

    return (<Grid textAlign='center' style={{ marginTop: '200px' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 350 }}>
            {loggingIn && <Dimmer active> <Loader /> </Dimmer>}
            <Header as='h1' textAlign='center'>ВОЙТИ</Header>
            <Form onSubmit={handleSubmit}>
                <Segment stacked>
                    <Form.Input fluid icon='user' name="username" value={username} onChange={handleChange} iconPosition='left' placeholder='Имя пользователья:' />
                    {submitted && !username &&
                        <div className="invalid-feedback">Введите имя пользователя*</div>
                    }
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={handleChange}/>
                    {submitted && !password &&
                        <div className="invalid-feedback">Введите пароль*</div>
                    }
                    <Button>ВОЙТИ</Button>
                </Segment>
            </Form>
        </Grid.Column>
    </Grid>
    );
}