import { NextRequest, NextResponse } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest){
    try {
        const {amount} = await request.json();

        const paymentIntent = await stripe.paymentIntent.create({
            amount: amount,
            currency: "inr",
            automatic_payment_methods: { enabled: true},
        })

        return NextResponse.json({clientSecret: paymentIntent.client_secret})

    } catch (error) {
        console.error("Internal error", error);

        return NextResponse.json(
            {error: `Internal serv er error: ${error}`},
            {status: 500}
        )
    }
}