import CheckoutForm from "../components/CheckoutForm";
import OrderRecap from "../components/OrderRecap";

export default function CheckoutPage() {
    return (
        <div className='d-flex justify-content-between gap-3 px-3'>
            <CheckoutForm />
            <div className='py-3 w-50'>
                <div>
                    <h1 className='text-center py-3'>Riepilogo ordine</h1>

                    <OrderRecap />
                </div>

                <hr />

                <div>
                    <h1 className='text-center py-3'>Metodi di pagamento</h1>
                </div>
            </div>
        </div>
    );
}
