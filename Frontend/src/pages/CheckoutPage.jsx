import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';

export default function CheckoutPage() {
    return (
        <div className='d-flex justify-content-between gap-3'>
            <Form className='py-3 w-50'>
                <h1 className='text-center py-3'>Checkout</h1>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="name" placeholder="Inserisci nome" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control type="surname" placeholder="Inserisci nome" />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Inserisci email" />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Cellulare</Form.Label>
                        <Form.Control type="phone" placeholder="Inserisci il numero di cellulare" />
                    </Form.Group>
                </Row>

                <hr />

                <Form.Group className="mb-3" controlId="formGridAddress1">
                    <Form.Label>Indirizzo di spedizione</Form.Label>
                    <Form.Control placeholder="Via ..." />
                </Form.Group>

                <Row className="mb-3">
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
                </Row>

                <Accordion flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Indirizzo di fatturazione</Accordion.Header>
                        <Accordion.Body>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Control placeholder="Via ..." />
                            </Form.Group>

                            <Row className="mb-3">
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
                            </Row>
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

            <div className='py-3 w-50'>
                <div>
                    <h1 className='text-center py-3'>Riepilogo ordine</h1>
                </div>

                <hr />

                <div>
                    <h1 className='text-center py-3'>Metodi di pagamento</h1>
                </div>
            </div>
        </div>
    );
}
