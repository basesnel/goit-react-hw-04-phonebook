import React from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
// import initContacts from './contacts.json';

import { PhonebookSection } from './Phonebook.styled';

// export default function Phonebook() {
//   const [name, setName] = useState('');
//   const [number, setNumber] = useState('');
//   const [filter, setFilter] = useState('');

//   return (
//     <PhonebookSection>
//       <h2 className="title">Phonebook</h2>
//       <ContactForm onSubmit={this.formSubmitHandler} />

//       <h2 className="title">Contacts</h2>
//       <Filter value={filter} onChange={this.changeFilter} />
//       <ContactList
//         contacts={visibleContacts}
//         onDeleteContact={this.deleteContact}
//       />
//     </PhonebookSection>
//   );
// }

class Phonebook extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    // console.log('App componentDidMount');

    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    console.log(parsedContacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('App componentDidUpdate');

    if (this.state.contacts !== prevState.contacts) {
      // console.log('The field contacts is updated');

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = data => {
    const { name, number } = data;
    const contacts = this.state.contacts;

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const contactName = contact.name.toLowerCase();
    if (contacts.find(contact => contact.name.toLowerCase() === contactName)) {
      alert(`${contact.name} is already in contacts.`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const normaliseFilter = this.state.filter.toLowerCase();

    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normaliseFilter)
    );

    return (
      <PhonebookSection>
        <h2 className="title">Phonebook</h2>
        <ContactForm onSubmit={this.formSubmitHandler} />

        <h2 className="title">Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </PhonebookSection>
    );
  }
}

export default Phonebook;
