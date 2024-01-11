import { ChangeEvent, FormEvent, useState } from "react";

const Form = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Logica di gestione del submit con validazione del form
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" />
            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" />
            <button type="submit">Invia</button>
        </form>
    );
}

export default Form