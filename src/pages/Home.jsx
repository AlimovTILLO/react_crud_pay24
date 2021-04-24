import React, { useState } from "react";
import { Form, Input, Container, Button } from 'semantic-ui-react'
import { useDispatch } from 'react-redux';

import { passportActions } from '../actions';


export function Home() {
    const [inputs, setInputs] = useState({
        firstname: '',
        lastname: '',
        middlename: '',
        phone: '',
        address: '',
        tin: ''
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (inputs) {
            dispatch(passportActions.create(inputs));
        }
    }

    return <Container text style={{ marginTop: '7em' }}>
        <Form onSubmit={handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Field>
                    <label>Имя</label>
                    <Input fluid placeholder='Имя' name='firstname' value={inputs.firstname} onChange={handleChange} />
                </Form.Field>
                <Form.Field>
                    <label>Отчество</label>
                    <Input fluid placeholder='Отчество' name='middlename' value={inputs.middlename} onChange={handleChange} />
                </Form.Field>
                <Form.Field>
                    <label>Фамилия</label>
                    <Input fluid placeholder='Фамилия' name='lastname' value={inputs.lastname} onChange={handleChange} />
                </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Field>
                    <label>Номер телефона</label>
                    <Input fluid type="number" placeholder='Номер телефона' name='phone' value={inputs.phone} onChange={handleChange} />
                </Form.Field>
                <Form.Field>
                    <label>Адрес</label>
                    <Input fluid placeholder='Адрес' name='address' value={inputs.address} onChange={handleChange} />
                </Form.Field>
                <Form.Field>
                    <label>ИНН</label>
                    <Input fluid type="number" placeholder='ИНН' name='tin' value={inputs.tin} onChange={handleChange} />
                </Form.Field>
            </Form.Group>
            <Button type='submit'>Отправить</Button>
        </Form>
    </Container>
}