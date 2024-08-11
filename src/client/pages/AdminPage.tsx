import React, { useEffect, useState } from "react";
import axios from "axios";

const types = ["collections", "products", "carousels"];

const AdminPage: React.FC = () => {
    const [type, setType] = useState(types[0]);
    const [value, setValue] = useState("");

    useEffect(() => {
        fetchValue();
    }, [type]);

    const onSave = async () => {
        await axios.post(`/api/${type}`, {
            "data": value
        });
    };

    const onTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        setType(e.target.value);
        const response = await axios.get(`/api/${e.target.value}`);
        setValue(JSON.stringify(response.data));
    };

    const fetchValue = async () => {
        const response = await axios.get(`/api/${type}`);
        setValue(JSON.stringify(response.data));
    };

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full p-4 space-y-4 md:space-y-0 md:space-x-4">
            <select value={type} onChange={onTypeChange} className="border rounded-md p-2 bg-white shadow-sm">
                {types.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full md:w-[500px] border border-gray-300 rounded-md p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={10}
            />
            <button onClick={onSave} className="bg-blue-500 text-white p-2 rounded-md shadow hover:bg-blue-600 transition duration-200">Save</button>
        </div>
    );
};

export default AdminPage;