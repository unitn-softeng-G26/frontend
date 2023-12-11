import React, {useState } from 'react';
import axios from 'axios';

interface appello{
    corso: number, //identificativo corso
    ss: Date, //start subscriptions
    es: Date, //end subscription
    ed: Date, //exam date
};

import '@/app/globals.css';

const inseritoreAppelli = () => {
    const [postData, setPostData] = useState<appello[]>([]);
    const handleFormSubmit = async () =>
    {
        try
        {
            const response = await axios.post('./api/getAppelli.tsx',postData);
            const jsonData = JSON.stringify(response.data);
            const blob = new Blob([jsonData]);
            
        }
        catch(error)
        {

        }
        

    }
}