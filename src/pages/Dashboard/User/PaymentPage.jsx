import { Link, useParams } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Hourglass } from "react-loader-spinner";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);


const PaymentPage = () => {
    const { id } = useParams()
    const axiosSecure = useAxiosSecure()

    const { data: buyingProperty = {}, isLoading } = useQuery({
        queryKey: ['buyingProperty', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/buyingProperty/${id}`)
            return data
        },
    })

    // console.log(buyingProperty)
    const { _id, propertyId, wishId, title, propertyImage, location, agentName, agentImage, agentEmail, description, buyerName, buyerEmail, buyerImage, offeredMinPrice, offeredMaxPrice, offerPrice, status } = buyingProperty

    if (isLoading) return <div className="min-h-screen flex justify-center items-center">
        <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#306cce', '#72a1ed']}
        />
    </div>

    return (
        <div className="flex justify-center items-center min-h-screen">

            <div className="bg-base-100 shadow-md p-4 rounded-lg hover:shadow-2xl max-w-2xl">
                <figure className="w-full">
                    <img className="object-cover shadow-xl border rounded-xl  w-full" src={propertyImage} alt="Property" />
                </figure>
                <div className="p-4">
                    <h2 className="font-bold text-sm md:text-lg lg:text-2xl mb-2 uppercase text-center text-blue-700">{title}</h2>
                    <p className="mb-4 text-xs md:text-sm lg:text-sm text-center">
                        {/* {description.split(' ').slice(0, 16).join(' ') + (description.split(' ').length > 16 ? '...' : '')} */}
                        {description}
                    </p>
                    <div className="text-center mb-4">
                        <p className="font-bold text-xs md:text-md lg:text-sm xl:text-sm mb-2">LOCATION: <span className="font-normal">{location}</span></p>
                        <p className="font-bold text-xs md:text-md lg:text-sm mb-2">PAYMENT: <span className="text-blue-500">$ {offerPrice}</span></p>
                    </div><hr />

                    <Elements stripe={stripePromise}>
                        <CheckoutForm bookingInfo={buyingProperty} />
                    </Elements>
                </div>
            </div>


        </div>
    );
};

export default PaymentPage;