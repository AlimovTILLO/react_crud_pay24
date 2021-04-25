import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Button, Table, Loader, Icon, Header, Modal } from 'semantic-ui-react'

// import { PassportsEditerModal } from '../components'
import { passportsActions } from '../actions';
import { PassportsModal } from '../components';

export function Passports() {
    const [open, setOpen] = React.useState(false)
    const [detete, setDelete] = React.useState(false)
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
    const deletePassportModal = (passport) => {
        setPassport(passport)
        setDelete(true)
    }

    const deletePassport = () => {
        dispatch(passportsActions.delete(passport.id));
        setDelete(false)
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
                        <Table.HeaderCell />
                        <Table.HeaderCell />
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
                            <Table.Cell collapsing><Button positive size='small' onClick={() => openPassportModal(passport)}>Изменить</Button></Table.Cell>
                            <Table.Cell collapsing><Button negative size='small' onClick={() => deletePassportModal(passport)}>Удалить</Button></Table.Cell>
                        </Table.Row>)}
                </Table.Body>
                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan='9'>
                            <Button
                                floated='right'
                                icon
                                labelPosition='left'
                                primary
                                size='small'
                                onClick={() => openPassportModal(null)}
                            >
                                <Icon name='address book outline' />Добавить</Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>}
            <PassportsModal open={open} setOpen={setOpen} passport={passport} />
            <Modal
                closeIcon
                open={detete}
                onClose={() => setDelete(false)}
                onOpen={() => setDelete(true)}
            >
                <Header icon='archive' content='Удалить' />
                <Modal.Actions>
                    <Button color='red' onClick={() => setDelete(false)}>
                        <Icon name='remove' /> Нет </Button>
                    <Button color='green' onClick={() => deletePassport()}>
                        <Icon name='checkmark' /> Да </Button>
                </Modal.Actions>
            </Modal>
        </Container>
    );
}