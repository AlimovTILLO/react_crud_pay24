import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Dimmer, Loader } from 'semantic-ui-react'


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

    return (
        <Container className='loginPage'>
            {loggingIn && <Dimmer active> <Loader /> </Dimmer>}
            <h2 style={{ textAlign: 'center' }}>ВОЙТИ</h2>
            <form name="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Имя пользователья: </label> <br />
                    <input id="username" type="text" name="username" value={username} onChange={handleChange} className={'form-control' + (submitted && !username ? ' is-invalid' : '')} />
                    {submitted && !username &&
                        <div className="invalid-feedback">Введите имя пользователя*</div>
                    }
                </div> <br />
                <div className="form-group">
                    <label htmlFor="password">Пароль: </label> <br />
                    <input id="password" type="password" name="password" value={password} onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                    {submitted && !password &&
                        <div className="invalid-feedback">Введите пароль*</div>
                    }
                </div> <br />
                <div className="form-group">
                    <button className="btn btn-primary">
                        LOGIN
                    </button>
                </div>
            </form>
        </Container>
    );
}