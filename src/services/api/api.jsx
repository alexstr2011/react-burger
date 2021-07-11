import {FORGOT_PASSWORD_URL, RESET_PASSWORD_URL} from "./urls";

export const forgotPassword = (email) => {
    console.log('Trying to send: ', {email});

    fetch(FORGOT_PASSWORD_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email})
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed getting data from server');
        }
    })
        .then((response) => {
            if (!response.success) {
                throw new Error('Failed creating order');
            }
            console.log(response.message);
        })
        .catch((error) => {
            console.log(error.message);
        });
}

export const resetPassword = (password, token) => {
    console.log('Trying to send: ', {password, token});

    fetch(RESET_PASSWORD_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password, token})
    }).then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed getting data from server');
        }
    })
        .then((response) => {
            if (!response.success) {
                throw new Error('Failed creating order');
            }
            console.log(response.message);
        })
        .catch((error) => {
            console.log(error.message);
        });
}
