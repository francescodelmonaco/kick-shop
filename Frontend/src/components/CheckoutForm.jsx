import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import { useGlobalContext } from '../context/GlobalContext';

export default function CheckoutForm() {
    const { submitCheckout, formData, setFieldValue } = useGlobalContext()
    return (
        <Form
            className='py-3 w-50'
            onSubmit={submitCheckout}>
            <h1 className='text-center py-3'>Checkout</h1>

            <Row className="mb-3">
                <Form.Group as={Col} >
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        name='userName'
                        onChange={setFieldValue}
                        value={formData.userName}
                        type="name"
                        placeholder="Inserisci nome" />
                </Form.Group>

                <Form.Group as={Col} >
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control
                        name="userSurname"
                        onChange={setFieldValue}
                        value={formData.userSurname}
                        type="text"
                        placeholder="Inserisci cognome"
                    />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} >
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name="userEmail"
                        onChange={setFieldValue}
                        value={formData.userEmail}
                        type="email"
                        placeholder="Inserisci email"
                    />

                </Form.Group>

                <Form.Group as={Col} >
                    <Form.Label>Cellulare</Form.Label>
                    <Form.Control
                        name="telephone"
                        onChange={setFieldValue}
                        value={formData.telephone}
                        type="phone"
                        placeholder="Inserisci il numero di cellulare"
                    />
                </Form.Group>
            </Row>

            <hr />

            <Form.Group className="mb-3" >
                <Form.Label>Indirizzo di spedizione</Form.Label>
                <Form.Control
                    name="addressShipping"
                    onChange={setFieldValue}
                    value={formData.addressShipping}
                    type="text"
                    placeholder="Inserisci spedi"
                />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} >
                    <Form.Label>Città</Form.Label>
                    <Form.Control
                        name="city"
                        onChange={setFieldValue}
                        value={formData.city}
                        type="text"
                        placeholder="Inserisci città"
                    />
                </Form.Group>

                {/* <Form.Group as={Col} >
                    <Form.Label>Provincia</Form.Label>
                    <Form.Select  defaultValue="Choose...">
                        <option>Scegli ...</option>
                        <option>NA</option>
                        <option>RM</option>
                        <option>BA</option>
                        <option>AN</option>
                    </Form.Select>
                </Form.Group> */}


            </Row>

            <Accordion flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Indirizzo di fatturazione</Accordion.Header>
                    <Accordion.Body>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Control
                                name="addressInvoice"
                                onChange={setFieldValue}
                                value={formData.addressInvoice}
                                type="text"
                                placeholder="addressInvoice"
                            />
                        </Form.Group>

                        {/* <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Città</Form.Label>
                                <Form.Control />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Nazione</Form.Label>
                                <Form.Select defaultValue="Choose...">
                                    <option>Scegli ...</option>
                                    <option>...</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>CAP</Form.Label>
                                <Form.Control />
                            </Form.Group>
                        </Row> */}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <hr />

            <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Procedi al pagamento
            </Button>
        </Form>
    )
};