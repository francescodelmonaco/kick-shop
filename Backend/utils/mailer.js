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
export function sendOrderConfirmationEmail(userEmail, orderId, totalPrice, userName) {

const emailVenditore = "pepe2117k@gmail.com"
  // Definisci le opzioni per l'email
  const userMailOptions = {
    from: '115e86fd529a3e@smtp.mailtrap.io',  // Modifica con un'email reale
    to: userEmail, // Email del destinatario, tra apici
    subject: `Conferma del tuo ordine #${orderId}`,
    text: `Ciao, il tuo ordine #${orderId} è stato ricevuto con successo. L'importo totale è di €${totalPrice}.`
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

 

