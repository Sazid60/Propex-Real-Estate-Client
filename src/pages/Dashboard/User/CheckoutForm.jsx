

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import './CheckoutForm.css';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useAuth from '../../../hooks/useAuth';

const CheckoutForm = ({ bookingInfo }) => {
    // console.log(bookingInfo)
    const { _id, propertyId, wishId, title, propertyImage, location, agentName, agentImage, agentEmail, description, buyerName, buyerEmail, buyerImage, offeredMinPrice, offeredMaxPrice, offerPrice, status } = bookingInfo

    const { user } = useAuth()

    const [cardError, setCardError] = useState('')
    const [clientSecret, setClientSecret] = useState()
    const [transactionId, setTransactionId] = useState('')
    const [processing, setProcessing] = useState(false)

    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()

    // console.log(clientSecret)

    useEffect(() => {
        if (bookingInfo?.offerPrice && bookingInfo?.offerPrice > 1) {
            getClientSecret({ price: bookingInfo?.offerPrice })
        }
    }, [bookingInfo?.offerPrice])


    const getClientSecret = async price => {
        const { data } = await axiosSecure.post(`/create-payment-intent`, price)
        console.log('clientSecret from server :', data)
        setClientSecret(data.clientSecret)
    }
    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();
        setProcessing(true)

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message)
            toast.error(error.message)
            setProcessing(false)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setCardError('')
            toast.success("Payment Successful")
        }

        // Confirming Payment
        const { error: paymentError, paymentIntent } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email,
                        name: user?.displayName,
                    },
                },
            })

        if (paymentError) {
            console.log(paymentError)
            setCardError(paymentError.message)
            toast.error(paymentError.message)
            setProcessing(false)
            return
        }

        if (paymentIntent.status === 'succeeded') {
            console.log(paymentIntent)
            const paymentInfo = {
                propertyId,
                title,
                propertyImage,
                location,
                agentName,
                agentImage,
                agentEmail,
                description,
                buyerName,
                buyerEmail,
                buyerImage,
                offeredMinPrice,
                offeredMaxPrice,
                offerPrice,
                status: 'bought',
                transactionId: paymentIntent.id,
                paymentDate: new Date(),
            }

            try {
                const { data } = await axiosSecure.post('/soldProperties', paymentInfo)

                await axiosSecure.patch('/after-payment-status', {
                    status: "bought",
                    id: _id,
                    transactionId: paymentIntent.id,
                })

                await axiosSecure.patch(`/update-selling-status/${propertyId}`, { selling_status: "sold" })

                //navigate korbo to property bought page
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            {cardError && <p className="text-red-600 mb-4">{cardError}</p>}
            <button type="submit" className="btn btn-md px-6 bg-blue-800 text-white w-full font-semibold mb-2 uppercase" disabled={!stripe || !clientSecret || processing}>
                PAY NOW
            </button>

        </form>
    );
};

export default CheckoutForm

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.