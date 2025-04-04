// utils/mailer.js
import nodemailer from 'nodemailer';


// Crea un trasportatore per l'invio delle email
const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',  // Il tuo host di Mailtrap
  port: 587,
  secure: false,  // non usare SSL
  auth: {
    user: '115e86fd529a3e',  // Inserisci il tuo user ID di Mailtrap
    pass: 'f0f346818530ee'  // Inserisci la tua password di Mailtrap
  }
});

// Funzione per inviare l'email di conferma
export function sendOrderConfirmationEmail(userEmail, orderId, totalPrice, userName, city, province, telephone, addressShipping ) {

const emailVenditore = "pepe2117k@gmail.com"
  // Definisci le opzioni per l'email
  const userMailOptions = {
    from: '115e86fd529a3e@smtp.mailtrap.io',  // Modifica con un'email reale
    to: userEmail, // Email del destinatario, tra apici
    subject: `Conferma del tuo ordine #${orderId}`,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; background-color: #fafafa;">
  
  <!-- HEADER -->
  <div style="text-align: center; padding-bottom: 20px;">
    <img src="https://i.imgur.com/TYCP4lX.jpeg" alt="Logo Azienda" style="max-width: 100%; height: 50%;" />
    <h2 style="color: #4CAF50; margin-top: 10px;">Grazie per il tuo ordine, <span style="color: #333;">${userName}</span>!</h2>
  </div>

  <!-- DETTAGLI ORDINE -->
  <p style="font-size: 16px; color: #555;">
    Abbiamo ricevuto correttamente il tuo ordine <strong>#${orderId}</strong>.
    Qui sotto trovi il riepilogo:
  </p>

  <!-- LISTA PRODOTTI -->
  <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
    <thead>
      <tr>
        <th style="text-align: left; padding: 8px; background-color: #f0f0f0;">Prodotto</th>
        <th style="text-align: center; padding: 8px; background-color: #f0f0f0;">Quantità</th>
        <th style="text-align: right; padding: 8px; background-color: #f0f0f0;">Prezzo</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 8px;">T-shirt Verde</td>
        <td style="text-align: center; padding: 8px;">2</td>
        <td style="text-align: right; padding: 8px;">€20.00</td>
      </tr>
      <tr>
        <td style="padding: 8px;">Cappellino Blu</td>
        <td style="text-align: center; padding: 8px;">1</td>
        <td style="text-align: right; padding: 8px;">€15.00</td>
      </tr>
    </tbody>
  </table>

  <!-- TOTALE -->
  <p style="text-align: right; margin-top: 10px; font-size: 18px; color: #333;">
    <strong>Totale: €${totalPrice}</strong>
  </p>

  <!-- INDIRIZZO -->
  <p style="font-size: 14px; color: #666;">
    Spedizione a: <br />
    <strong>${addressShipping}</strong><br /> 
    ${city}, ${province}<br />
    Telefono: ${telephone}
  </p>

  <!-- FOOTER -->
  <div style="border-top: 1px solid #ddd; margin-top: 30px; padding-top: 20px; font-size: 12px; color: #888; text-align: center;">
    Questa è una mail automatica, ti risponderemo il prima possibile. <br />
    <a href="http://localhost:5173" style="color: #4CAF50; text-decoration: none;">Visita il nostro sito</a> | © 2025 Kick Shop
  </div>

</div>

 
    `
  };

  const vendorMailOptions = {
    from: '115e86fd529a3e@smtp.mailtrap.io',  // Modifica con un'email reale
    to: emailVenditore, // Email del destinatario, tra apici
    subject: `Conferma del tuo ordine #${orderId}`,
    text: `L' ordine #${orderId}, appartenente a: ${userName} è stato inviato con successo. L'importo totale è di €${totalPrice}.`
  };

  
  

  // Invia l'email
  transporter.sendMail(userMailOptions, (error, info) => {
    if (error) {
      console.log('Errore nell\'invio dell\'email:', error);
    } else {
      console.log('Email inviata: ' + info.response);
    }
  });

  transporter.sendMail(vendorMailOptions, (error, info) => {
    if (error) {
      console.log('Errore nell\'invio dell\'email:', error);
    } else {
      console.log('Email inviata: ' + info.response);
    }
  });
}

 

