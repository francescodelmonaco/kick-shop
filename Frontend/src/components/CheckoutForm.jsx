import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useGlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

import { useState } from 'react';

export default function CheckoutForm() {
    const { submitCheckout, formData, setFieldValue } = useGlobalContext();
    const navigate = useNavigate();

    // Stato di validazione per i campi
    const [validated, setValidated] = useState(false);

    // Chiamata alla funzione submitCheckout passando l'evento e navigate
    const handleSubmit = (e) => {
        const form = e.currentTarget;

        // Verifica la validità dei campi prima di inviare
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        setValidated(true);
        submitCheckout(e, navigate);
    };

    return (
        <Form
            className='py-3 w-100 px-3 px-md-5'
            onSubmit={handleSubmit}
            noValidate
            validated={validated}
        >
            <h5 className='text-center pb-3'>Inserisci i dati necessari per procederere con l'ordine</h5>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="userName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        name='userName'
                        onChange={setFieldValue}
                        value={formData.userName}
                        type="text"
                        placeholder="Inserisci nome"
                        required
                        isInvalid={validated && !formData.userName}
                    />
                    <Form.Text className="invalid-feedback">
                        Questo campo è obbligatorio.
                    </Form.Text>
                </Form.Group>

                <Form.Group as={Col} controlId="userSurname">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control
                        name="userSurname"
                        onChange={setFieldValue}
                        value={formData.userSurname}
                        type="text"
                        placeholder="Inserisci cognome"
                        required
                        isInvalid={validated && !formData.userSurname}
                    />
                    <Form.Text className="invalid-feedback">
                        Questo campo è obbligatorio.
                    </Form.Text>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="userEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name="userEmail"
                        onChange={setFieldValue}
                        value={formData.userEmail}
                        type="email"
                        placeholder="Inserisci email"
                        required
                        isInvalid={validated && !formData.userEmail}
                    />
                    <Form.Text className="invalid-feedback">
                        Questo campo è obbligatorio.
                    </Form.Text>
                </Form.Group>

                <Form.Group as={Col} controlId="telephone">
                    <Form.Label>Cellulare</Form.Label>
                    <Form.Control
                        name="telephone"
                        onChange={setFieldValue}
                        value={formData.telephone}
                        type="phone"
                        placeholder="Inserisci il numero di cellulare"
                        required
                        isInvalid={validated && !formData.telephone}
                    />
                    <Form.Text className="invalid-feedback">
                        Questo campo è obbligatorio.
                    </Form.Text>
                </Form.Group>
            </Row>

            <hr />

            <Form.Group className="mb-3" controlId="addressShipping">
                <Form.Label>Indirizzo di spedizione</Form.Label>
                <Form.Control
                    name="addressShipping"
                    onChange={setFieldValue}
                    value={formData.addressShipping}
                    type="text"
                    placeholder="Inserisci l'indirizzo di spedizione"
                    required
                    isInvalid={validated && !formData.addressShipping}
                />
                <Form.Text className="invalid-feedback">
                    Questo campo è obbligatorio.
                </Form.Text>
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="addressInvoice">
                <Form.Label>Indirizzo di Fatturazione</Form.Label>
                <Form.Control
                    name="addressInvoice"
                    onChange={setFieldValue}
                    value={formData.addressInvoice}
                    type="text"
                    placeholder="Inserisci l'indirizzo di Fatturazione"
                />
            </Form.Group>


            <hr />

            <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Accetta i termini e condizioni" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Procedi al pagamento
            </Button>
        </Form>
    )
};
