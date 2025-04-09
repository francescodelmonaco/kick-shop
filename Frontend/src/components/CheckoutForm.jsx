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

            <Form.Group as={Col} className="mb-3" controlId="city">
                <Form.Label>Città</Form.Label>
                <Form.Control
                    name="city"
                    onChange={setFieldValue}
                    value={formData.city}
                    type="text"
                    placeholder="Inserisci città"
                    required
                    isInvalid={validated && !formData.city}
                />
                <Form.Text className="invalid-feedback">
                    Questo campo è obbligatorio.
                </Form.Text>
            </Form.Group>

            <Form.Group as={Col} controlId="province">
                <Form.Label>Provincia</Form.Label>
                <Form.Select
                    name="province"
                    onChange={setFieldValue}
                    value={formData.province}
                    required
                    isInvalid={validated && (!formData.province || formData.province === "")}
                >
                    <option value="">Seleziona...</option>
                    <option>Agrigento</option>
                    <option>Alessandria</option>
                    <option>Ancona</option>
                    <option>Aosta</option>
                    <option>Arezzo</option>
                    <option>Ascoli Piceno</option>
                    <option>Asti</option>
                    <option>Avellino</option>
                    <option>Barletta-Andria-Trani</option>
                    <option>Belluno</option>
                    <option>Benevento</option>
                    <option>Bergamo</option>
                    <option>Biella</option>
                    <option>Bologna</option>
                    <option>Bolzano</option>
                    <option>Brescia</option>
                    <option>Brindisi</option>
                    <option>Cagliari</option>
                    <option>Caltanissetta</option>
                    <option>Campobasso</option>
                    <option>Catania</option>
                    <option>Catanzaro</option>
                    <option>Chieti</option>
                    <option>Como</option>
                    <option>Cosenza</option>
                    <option>Cremona</option>
                    <option>Crotone</option>
                    <option>Enna</option>
                    <option>Fermo</option>
                    <option>Ferrara</option>
                    <option>Firenze</option>
                    <option>Foggia</option>
                    <option>Forlì-Cesena</option>
                    <option>Frosinone</option>
                    <option>Genova</option>
                    <option>Gorizia</option>
                    <option>Grosseto</option>
                    <option>Imperia</option>
                    <option>Isernia</option>
                    <option>La Spezia</option>
                    <option>L'Aquila</option>
                    <option>Latina</option>
                    <option>Livorno</option>
                    <option>Lodi</option>
                    <option>Lucca</option>
                    <option>Macerata</option>
                    <option>Mantova</option>
                    <option>Massa-Carrara</option>
                    <option>Matera</option>
                    <option>Messina</option>
                    <option>Milano</option>
                    <option>Modena</option>
                    <option>Monza e Brianza</option>
                    <option>Napoli</option>
                    <option>Novara</option>
                    <option>Nuoro</option>
                    <option>Oristano</option>
                    <option>Padova</option>
                    <option>Palermo</option>
                    <option>Parma</option>
                    <option>Pavia</option>
                    <option>Perugia</option>
                    <option>Pescara</option>
                    <option>Piacenza</option>
                    <option>Pisa</option>
                    <option>Potenza</option>
                    <option>Prato</option>
                    <option>Ragusa</option>
                    <option>Ravenna</option>
                    <option>Reggio Calabria</option>
                    <option>Reggio Emilia</option>
                    <option>Rieti</option>
                    <option>Rimini</option>
                    <option>Roma</option>
                    <option>Salerno</option>
                    <option>Sassari</option>
                    <option>Savona</option>
                    <option>Siena</option>
                    <option>Sondrio</option>
                    <option>Taranto</option>
                    <option>Teramo</option>
                    <option>Vibo Valentia</option>
                    <option>Vicenza</option>
                    <option>Viterbo</option>
                </Form.Select>
                <Form.Text className="invalid-feedback">
                    Seleziona una provincia valida.
                </Form.Text>
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
