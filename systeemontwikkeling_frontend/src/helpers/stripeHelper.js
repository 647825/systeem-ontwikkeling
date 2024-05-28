import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51OyXZUA3RX6WGrx75aCnrBeHBmUTVlJ3JOJkra8qkgyxQN0PmjWFgX14c30uLvcZOXSY1MnuAaZ6yA51Ga7pTswt00w1rvOhNn');

export async function createProduct(name, price, currency) {
    const stripe = await stripePromise;

    const product = await stripe.products.create({
        name: name,
        type: 'service',
    });

    const stripePrice = await stripe.prices.create({
        product: product.id,
        unit_amount: price * 100, 
        currency: currency,
    });

    return stripePrice.id; 
}
