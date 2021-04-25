import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Table, Loader } from 'semantic-ui-react'


// import { PassportsEditerModal } from '../components'
import { passportsActions } from '../actions';
import { PassportsModal } from '../components';

export function Passports() {
    const [open, setOpen] = React.useState(false)
    const [passport, setPassport] = React.useState({})
    const passports = useSelector(state => state.passports);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(passportsActions.getAll());
    }, []);

    const openPassportModal = (passport) => {
        setPassport(passport)
        setOpen(true)
    }

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
                        <Table.HeaderCell>Отчество</Table.HeaderCell>
                        <Table.HeaderCell>Номер телефона</Table.HeaderCell>
                        <Table.HeaderCell>Адрес</Table.HeaderCell>
                        <Table.HeaderCell/>
                        <Table.HeaderCell/>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {passports.data.map((passport, index) =>
                        <Table.Row key={passport.id}>
                            <Table.Cell>{passport.id}</Table.Cell>
                            <Table.Cell>{passport.tin}</Table.Cell>
                            <Table.Cell>{passport.firstname}</Table.Cell>
                            <Table.Cell>{passport.lastname}</Table.Cell>
                            <Table.Cell>{passport.middlename}</Table.Cell>
                            <Table.Cell>{passport.phone}</Table.Cell>
                            <Table.Cell>{passport.address}</Table.Cell>
                            <Table.Cell collapsing><Button positive onClick={() => openPassportModal(passport)}>Изменить</Button></Table.Cell>
                            <Table.Cell collapsing><Button negative>Удалить</Button></Table.Cell>
                        </Table.Row>)}
                </Table.Body>
            </Table>}
            <PassportsModal open={open}  setOpen={setOpen} passport={passport}/>
        </Container>
    );
}