import React, { useState } from "react";
import { Form, Input, Container, Button } from 'semantic-ui-react'
import { useDispatch } from 'react-redux';

import { passportsActions } from '../actions';


function Home() {
    const [submitted, setSubmitted] = useState(false);
    const data = {
        firstname: '',
        lastname: '',
        middlename: '',
        phone: '',
        address: '',
        tin: ''
    }
    const [inputs, setInputs] = useState(data);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setSubmitted(true);
        if (inputs) {
            dispatch(passportsActions.publicCreate(inputs));
            setInputs(data)
            setSubmitted(false);
        }
    }

    return <Container text style={{ marginTop: '7em' }}>
        <Form onSubmit={handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Field>
                    <label>Имя</label>
                    <Input fluid placeholder='Имя' name='firstname' value={inputs.firstname} onChange={handleChange} />
                    {submitted && !inputs.firstname &&
                        <div className="invalid-feedback">Введите Имя*</div>
                    }
                </Form.Field>
                <Form.Field>
                    <label>Отчество</label>
                    <Input fluid placeholder='Отчество' name='middlename' value={inputs.middlename} onChange={handleChange}/>
                    {submitted && !inputs.middlename &&
                        <div className="invalid-feedback">Введите Отчество*</div>
                    }
                </Form.Field>
                <Form.Field>
                    <label>Фамилия</label>
                    <Input fluid placeholder='Фамилия' name='lastname' value={inputs.lastname} onChange={handleChange} />
                    {submitted && !inputs.lastname &&
                        <div className="invalid-feedback">Введите Фамилия*</div>
                    }
                </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
                <Form.Field>
                    <label>Номер телефона</label>
                    <Input fluid type="number" placeholder='Номер телефона' name='phone' value={inputs.phone} onChange={handleChange} />
                    {submitted && !inputs.phone &&
                        <div className="invalid-feedback">Введите Номер телефона*</div>
                    }
                </Form.Field>
                <Form.Field>
                    <label>Адрес</label>
                    <Input fluid placeholder='Адрес' name='address' value={inputs.address} onChange={handleChange} />
                    {submitted && !inputs.address &&
                        <div className="invalid-feedback">Введите Адрес*</div>
                    }
                </Form.Field>
                <Form.Field>
                    <label>ИНН</label>
                    <Input fluid type="number" placeholder='ИНН' name='tin' value={inputs.tin} onChange={handleChange} />
                    {submitted && !inputs.tin &&
                        <div className="invalid-feedback">Введите ИНН*</div>
                    }
                </Form.Field>
            </Form.Group>
            <Button type='submit'>Отправить</Button>
        </Form>
    </Container>
}

export { Home };