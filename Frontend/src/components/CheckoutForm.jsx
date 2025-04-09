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
    
    // Stato per il checkbox dei termini e condizioni
    const [acceptTerms, setAcceptTerms] = useState(false);

    // Funzione di validazione
    const validateForm = () => {
        const errors = {};

        // Verifica che nome, cognome, email e telefono non contengano spazi vuoti
        if (!formData.userName.trim()) {
            errors.userName = "Il nome inserito non è valido";
        }

        if (!formData.userSurname.trim()) {
            errors.userSurname = "Il cognome inserito non è valido";
        }

        if (!formData.userEmail.trim()) {
            errors.userEmail = "L'email non può essere vuota o contenere solo spazi.";
        } else if (!/\S+@\S+\.\S+/.test(formData.userEmail)) {
            errors.userEmail = "L'email non è valida.";
        }

        if (!formData.telephone.trim()) {
            errors.telephone = "Il numero di cellulare non può essere vuoto o contenere solo spazi.";
        } else if (!/^\+?[0-9]{7,15}$/.test(formData.telephone)) {
            errors.telephone = "Il numero di cellulare non è valido. Deve contenere solo numeri e avere almeno 7 cifre.";
        }

        if (!formData.addressShipping.trim()) {
            errors.addressShipping = "L'indirizzo di spedizione non può essere vuoto o contenere solo spazi.";
        }

        // Verifica che i termini e condizioni siano accettati
        if (!acceptTerms) {
            errors.acceptTerms = "Devi accettare i termini e condizioni.";
        }

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        const form = e.currentTarget;

        // Se ci sono errori, mostra i messaggi di errore
        if (Object.keys(errors).length > 0) {
            e.stopPropagation();
            Object.keys(errors).forEach((field) => {
                form.querySelector(`#${field}`).setCustomValidity(errors[field]);
            });
            form.reportValidity();
            return;
        }

        // Altrimenti, continua con la funzione di submit
        submitCheckout(e, navigate);
    };

    return (
        <Form
            className='py-3 w-100 px-3 px-md-5'
            onSubmit={handleSubmit}
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
                        placeholder="Es: Mario"
                        required
                        isInvalid={formData.userName.trim() === ""}
                    />
                    <Form.Text className="invalid-feedback">
                        {formData.userName.trim() === "" ? "Questo campo è obbligatorio e non può contenere solo spazi." : ""}
                    </Form.Text>
                </Form.Group>

                <Form.Group as={Col} controlId="userSurname">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control
                        name="userSurname"
                        onChange={setFieldValue}
                        value={formData.userSurname}
                        type="text"
                        placeholder="Es: Rossi"
                        required
                        isInvalid={formData.userSurname.trim() === ""}
                    />
                    <Form.Text className="invalid-feedback">
                        {formData.userSurname.trim() === "" ? "Questo campo è obbligatorio e non può contenere solo spazi." : ""}
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
                        placeholder="Es: mariorossi@gmail.com
"
                        required
                        isInvalid={!/\S+@\S+\.\S+/.test(formData.userEmail)}
                    />
                    <Form.Text className="invalid-feedback">
                        {!/\S+@\S+\.\S+/.test(formData.userEmail) ? "L'email non è valida." : ""}
                    </Form.Text>
                </Form.Group>

                <Form.Group as={Col} controlId="telephone">
                    <Form.Label>Cellulare</Form.Label>
                    <Form.Control
                        name="telephone"
                        onChange={setFieldValue}
                        value={formData.telephone}
                        type="phone"
                        placeholder="Es: 3284756834"
                        required
                        isInvalid={!/^\+?[0-9]{7,15}$/.test(formData.telephone)}
                    />
                    <Form.Text className="invalid-feedback">
                        {!/^\+?[0-9]{7,15}$/.test(formData.telephone) ? "Il numero di cellulare non è valido." : ""}
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
                    placeholder="Es: Via Aspromonte 12, Napoli, 80013"
                    required
                    isInvalid={formData.addressShipping.trim() === ""}
                />
                <Form.Text className="invalid-feedback">
                    {formData.addressShipping.trim() === "" ? "Questo campo è obbligatorio." : ""}
                </Form.Text>
            </Form.Group>

            <Form.Group as={Col} className="mb-3" controlId="addressInvoice">
                <Form.Label>Indirizzo di Fatturazione</Form.Label>
                <Form.Control
                    name="addressInvoice"
                    onChange={setFieldValue}
                    value={formData.addressInvoice}
                    type="text"
                    placeholder="Es: Via Aspromonte 12, Napoli, 80013"
                />
            </Form.Group>

            <hr />

            <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check 
                    type="checkbox" 
                    label="Accetta i termini e condizioni"
                    checked={acceptTerms}
                    onChange={() => setAcceptTerms(!acceptTerms)} 
                    isInvalid={!acceptTerms}
                />
                <Form.Text className="invalid-feedback">
                    {!acceptTerms ? "Devi accettare i termini e condizioni." : ""}
                </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={!acceptTerms}>
                Procedi al pagamento
            </Button>
        </Form>
    );
};