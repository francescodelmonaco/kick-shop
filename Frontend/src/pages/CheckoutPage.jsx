import CheckoutForm from "../components/CheckoutForm";
import { useGlobalContext } from '../context/GlobalContext';

export default function CheckoutPage() {
    const { carts } = useGlobalContext();
    
    // const total = carts.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className='d-flex justify-content-between gap-3'>
            <CheckoutForm />
            <div className='py-3 w-50'>
                <div>
                    <h1 className='text-center py-3'>Riepilogo ordine</h1>
                    {/* {carts.map((item) => (
                        <div key={item.id_product} className="d-flex justify-content-between mb-2">
                            <span>{item.name} x{item.quantity}</span>
                            <span>€{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))} */}
                    <hr />
                    <div className="d-flex justify-content-between">
                        <strong>Totale:</strong>
                        {/* <strong>€{total.toFixed(2)}</strong> */}
                    </div>
                </div>

                <hr />

                <div>
                    <h1 className='text-center py-3'>Metodi di pagamento</h1>
                </div>
            </div>
        </div>
    );
}
