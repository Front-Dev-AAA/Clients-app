const urlGet = 'http://localhost:3000/api/clients';
const urlDel = 'http://localhost:3000/api/clients';

const urlFind = 'http://localhost:3000/api/clients?search=';

export const getClients = async () => {
    try {
        const response = await fetch(urlGet, {
            method: 'GET'
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(response.status);
        }
        return result;
    } catch (error) {
        console.error("Ошибка №", error);
        alert('ошибка подключения к серверу');
        let mistake = 0;
        return mistake;
    }
}

export const sendClientData = async (client, method, id = null) => {

      try {
        const response = await fetch(`http://localhost:3000/api/clients/${method === 'POST' ? '' : id}`, {
            method,
            body: JSON.stringify(client)
        });

        let result = await response.json();

        if (!response.ok) {
            throw new Error(response.status);
        }
        return result;

    } catch (error) {
        console.error("Ошибка №", error);
        let mistake = 0;
        return mistake;
    }
}

export const deleteClientItem = async (id) => {
    let status;
    try {
        const response = await fetch(urlDel + '/' + id, {
            method: 'DELETE',
        });

        status = response.status;
    } catch (error) {
        console.log(error);

    }

    return status;
}

export const findClient = async (value) => {
    try {
        
         const response = await fetch(urlFind + value, {
            method: 'GET'
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(response.status);
        }

        return result;
    } catch (error) {
        console.error("Ошибка №", error);
        alert('ошибка подключения к серверу при поиске');
        let mistake = 0;
        return mistake;
    }
}