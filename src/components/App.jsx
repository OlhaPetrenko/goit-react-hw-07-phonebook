import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

import { addContactsItem, deleteContactsItem } from 'redux/items/items-actions';
import { setFilter } from 'redux/filter/filter-actions';

import { fetchContacts } from '../redux/items/items-operations';
// =========================================
// import { filterSlise } from 'redux/filter/filter-reducer';
// import { itemsSlice } from 'redux/items/items-reducer';
// ============================================================

import { getContactsItems } from 'redux/items/items-selectors';
// import { getContactsFilter } from 'redux/filter/filter-selectors';

import s from './App.module.css';

function App() {
  // const { setFilter } = filterSlise.actions;
  // const { addContactsItem, deleteContactsItem } = itemsSlice.actions;

  const contactsItems = useSelector(getContactsItems);
  // const contactsFilter = useSelector(getContactsFilter);
  const contactsFilter = useSelector(store => store.contacts.filter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  function onAddContactsItem(name, number) {
    const action = addContactsItem(name, number);

    const nameArr = contactsItems.map(contact => contact.name);
    if (nameArr.includes(name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    dispatch(action);
  }

  function onDeleteContactsItem(contactId) {
    dispatch(deleteContactsItem(contactId));
  }

  function getfilterContacts() {
    const normFilter = contactsFilter.toLowerCase();
    const filterContacts = contactsItems.filter(contact =>
      contact.name.toLowerCase().includes(normFilter)
    );
    return filterContacts;
  }

  const filterContacts = getfilterContacts();

  return (
    <div className={s.set}>
      <Section title="Phonebook">
        <ContactForm onSubmit={onAddContactsItem} />
      </Section>
      <Section title="Contacts">
        <Filter
          value={contactsFilter}
          onChange={event => dispatch(setFilter(event.currentTarget.value))}
        />
        <ContactList
          contacts={filterContacts}
          onDeleteContact={onDeleteContactsItem}
        />
      </Section>
    </div>
  );
}
export default App;
