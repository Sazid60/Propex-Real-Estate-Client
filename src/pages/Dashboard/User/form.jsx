import React from 'react';
import toast from 'react-hot-toast';

const form = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const firstName = form.firstName.Value;
        const lastName = form.lastName.value;

        const gender = form.gender.value
        if (gender === "male") {
            toast.success('Hi You are Male')
        }
        else if (gender === "female") {
            toast.success('Hi You are Female')
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="firstname" />
                <input type="text" name="lastName" placeholder="firstname" />
                <input type="text" name="gender" />
                <input type="submit" name="gender" />
            </form>
        </div>
    );
};

export default form;