import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveParties, loadParties } from '@/utils/asyncStorage';

interface Party {
  id: string;
  type: string;
  guests: number;
  food: string;
  decoration: string;
  date: string;
  time: string;
}

interface UserState {
  parties: Party[];
}

const initialState: UserState = {
  parties: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addParty: (state, action: PayloadAction<Party>) => {
      console.log('Agregando fiesta:', action.payload); 
      state.parties.push(action.payload);
      saveParties(state.parties);
    },
    deleteParty: (state, action: PayloadAction<string>) => {
      console.log('Borrando fiesta con ID:', action.payload); 
      state.parties = state.parties.filter((party) => party.id !== action.payload);
      saveParties(state.parties);
    },
    editParty: (state, action: PayloadAction<Party>) => {
      console.log('Editando fiesta:', action.payload); 
      const index = state.parties.findIndex((party) => party.id === action.payload.id);
      if (index !== -1) {
        state.parties[index] = action.payload;
        saveParties(state.parties);
      }
    },
    setParties: (state, action: PayloadAction<Party[]>) => {
      console.log('Cargando fiestas desde AsyncStorage:', action.payload); 
      state.parties = action.payload;
    },
  },
});

export const { addParty, deleteParty, editParty, setParties } = userSlice.actions;

export const initializeParties = () => async (dispatch: any) => {
  const parties = await loadParties();
  console.log('Fiestas cargadas desde AsyncStorage:', parties); 
  dispatch(setParties(parties));
};

export default userSlice.reducer;

