import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Table, Loader } from 'semantic-ui-react'


// import { PassportsEditerModal } from '../components'
import { passportsActions } from '../actions';

export function Passports() {
    const passports = useSelector(state => state.passports);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(passportsActions.getAll());
    }, []);

    return (
        <Container style={{ marginTop: '50px' }}>
            {passports.loading && <Loader size='large'>Загрузка...</Loader>}
            {passports.error && <span className="text-danger">Ошибка: {passports.error}</span>}
            {passports.data && <Table color='grey' compact striped selectable unstackable>

                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell>ИНН</Table.HeaderCell>
                        <Table.HeaderCell>Имя</Table.HeaderCell>
                        <Table.HeaderCell>Фамилия</Table.HeaderCell>
                        <Table.HeaderCell>Отчнство</Table.HeaderCell>
                        <Table.HeaderCell>Номер телефона</Table.HeaderCell>
                        <Table.HeaderCell>Адрес</Table.HeaderCell>
                        <Table.HeaderCell/>
                        <Table.HeaderCell/>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {passports.data.map((user, index) =>
                        <Table.Row key={user.id}>
                            <Table.Cell>{user.id}</Table.Cell>
                            <Table.Cell>{user.tin}</Table.Cell>
                            <Table.Cell>{user.firstname}</Table.Cell>
                            <Table.Cell>{user.lastname}</Table.Cell>
                            <Table.Cell>{user.middlename}</Table.Cell>
                            <Table.Cell>{user.phone}</Table.Cell>
                            <Table.Cell>{user.address}</Table.Cell>
                            <Table.Cell collapsing><Button positive>Изменить</Button></Table.Cell>
                            <Table.Cell collapsing><Button negative>Удалить</Button></Table.Cell>
                        </Table.Row>)}
                </Table.Body>
            </Table>}
        </Container>
    );
}