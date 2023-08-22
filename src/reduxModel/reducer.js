


export default function reducer(state = [], action) {
    if (action.type === 'newContact')
        return [
            ...state,
            {
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                status: action.payload.status,
                id: Date.now()
            }
        ]
    else if (action.type === 'contactDeleted')
        return state.filter(contact => contact.id !== action.payload.id);

    else if (action.type === 'contactEdited') {
        const { id, firstName, lastName, status } = action.payload;

        return state.map((contact) =>
            contact.id === id
                ? {
                    ...contact,
                    firstName: firstName,
                    lastName: lastName,
                    status: status,
                }
                : contact
        );


    }
    return state;

}