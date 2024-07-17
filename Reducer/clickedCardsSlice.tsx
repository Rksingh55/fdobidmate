import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Card {
    id: number;
    AuctionType: string;
}

interface ClickedCardsState {
    clickedCards: Card[];
}

const initialState: ClickedCardsState = {
    clickedCards: [],
};

const clickedCardsSlice = createSlice({
    name: 'clickedCards',
    initialState,
    reducers: {
        addCard: (state, action: PayloadAction<Card>) => {
            const cardExists = state.clickedCards.find(card => card.id === action.payload.id);
            if (!cardExists) {
                state.clickedCards.push(action.payload);
            }
        },
    },
});

export const { addCard } = clickedCardsSlice.actions;
export default clickedCardsSlice.reducer;
