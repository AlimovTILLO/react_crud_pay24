import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Header, Table, Loader } from 'semantic-ui-react'


// import { UserEditerModal } from '../components'
import { passportsActions } from '../actions';

export function Passports() {
    const passports = useSelector(state => state.passports);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(passportsActions.getAll());
    }, []);

    return (
        <Container>
            {passports.loading && <Loader size='large'>Загрузка...</Loader>}
            {passports.error && <span className="text-danger">Ошибка: {passports.error}</span>}
            {passports.data && <Table color='grey' compact celled striped selectable unstackable>

                <Table.Body>
                    {passports.data.map((user, index) =>
                        <Table.Row key={user.id}>
                            <Table.Cell>
                                <Header as='h4' image>
                                    <Header.Content>
                                        {user.tin}
                                        <Header.Subheader>{user.id}</Header.Subheader>
                                    </Header.Content>
                                </Header>
                            </Table.Cell>
                            <Table.Cell>{user.firstname}</Table.Cell>
                            <Table.Cell>{user.lastname}</Table.Cell>
                            <Table.Cell>{user.middlename}</Table.Cell>
                            <Table.Cell>{user.phone}</Table.Cell>
                            <Table.Cell>{user.address}</Table.Cell>
                        </Table.Row>)}
                </Table.Body>
            </Table>}
        </Container>
    );
}