 
import { createSlice } from '@reduxjs/toolkit';
import {  fetchContacts, addContact, editContact, deleteContact } from './operations';
import { createSelector } from 'reselect'; // Import createSelector

  const initialState = {
    items: [
      { id: "id-1", name: "Rosie Simpson", phone: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", phone: "443-89-12" },
      { id: "id-3", name: "Eden Clements", phone: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", phone: "227-91-26" },
    ],
    isLoading: false,
    error: null,
  };
  
  
  export const contactsSlice=createSlice({
    name:'contacts',
    initialState,

    reducers: {
      updateSearchValue(state, action) {
        state.searchValue = action.payload;
      },
    },

    extraReducers: builder => {
      builder
      .addCase(fetchContacts.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state,action)=>{
        state.isLoading=false;
        state.error=null;
        state.items=action.payload;
      })
      .addCase(fetchContacts.rejected, (state,action)=>{
        state.isLoading=false;
        state.error=action.payload;
      })
      .addCase(addContact.fulfilled, (state,action)=>{
        const newContact = action.payload.text
        ? { name: action.payload.text.name, number: action.payload.text.phone }
        : action.payload; // Adjust based on API response
      state.items.push(newContact);
      })
      .addCase(addContact.pending, (state)=>{
        state.isLoading = false;
        state.error=null;
      })
      .addCase(addContact.rejected, (state,action)=>{
        state.isLoading = false;
        state.error=action.payload;
      })
      .addCase(deleteContact.fulfilled, (state,action)=>{
        state.isLoading = false;
        state.error=null;
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteContact.pending, (state)=>{
        state.isLoading = true;
        state.error=null;
      })
      .addCase(deleteContact.rejected, (state,action)=>{
        state.isLoading = false;
        state.error=action.payload;
      })
      .addCase(editContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editContact.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload; // Update the contact
        }
      })
      .addCase(editContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload; // Capture error
      })

    }
  });
  
  const selectContacts = state => state.contacts.items;
  const selectNameFilter = state => state.contacts.filter; 

  export const selectFilteredContacts = createSelector(
    [selectContacts, selectNameFilter], // Input selectors
    (contacts, nameFilter) => {
      if (!nameFilter) return contacts;
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
  );
  export default contactsSlice.reducer;