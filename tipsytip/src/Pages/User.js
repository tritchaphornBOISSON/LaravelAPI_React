import React, {useEffect, useState} from 'react';

const User = () => {

    const [prenom, setPrenom] = useState('');

    useEffect( () => {
        (
            async () =>{
                const response = await fetch('http://localhost:8000/api/auth/user-profile',{
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    'Authorization' : 'Bearer ' + localStorage.getItem('token'),
                }
            })
            //.then(res =>res.json())
            //.then(res => console.log(res))

            const content = await response.json();
            setPrenom(content.prenom)
            }
            )();
    });

    return(
        <div>
            {prenom ? 'Hello ' + prenom : 'You are not logged in'}
        </div>
    );
};

export default User;