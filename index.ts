export type Category = 'size' | 'creamer';
export type Option = 'small' | 'medium' | 'large' | 'none' | 'dairy' | 'non-dairy';
export type Price = number;

export interface Pricer {
    (category: Category, option: Option): Price;
}

const OPTION_PRICES: Record<Option, Price> = {
    'small': 1.00,
    'medium': 1.50,
    'large': 2.00,
    'none': 0.00,
    'dairy': 0.25,
    'non-dairy': 0.50,
};

type OrderState = Readonly<Partial<Record<Category, Option>>>;

export const createPricer = (): Pricer => {
    let state: OrderState = {};

    return (category: Category, option: Option): Price => {
        state = {
            ...state,
            [category]: option,
        };

        const sizePrice = state.size ? OPTION_PRICES[state.size] : 0;
        const creamerPrice = state.creamer ? OPTION_PRICES[state.creamer] : 0;

        return sizePrice + creamerPrice;
    };
};