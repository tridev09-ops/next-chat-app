import { useState } from "react";

export default function Form() {
    const [message, setMessage] = useState("");

    const handleChange = (e: any) => {
        setMessage(e.target.value)
    };

    const handleSubmit = () => {

    }
    return (
        <form onSubmit={handleSubmit} className="flex py-4 justify-center w-full bg-gray-200 dark:bg-slate-800 border-t-2 border-gray-300 dark:border-slate-700">
            <input onChange={handleChange} className="flex-1 border-none outline-none py-3 px-4 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 rounded-full max-w-[500px]"
                placeholder="Enter you message..."
            />
            <button type="submit" className="bg-[#151717] dark:bg-slate-600 text-white px-4 mx-4 rounded-xl">Send</button>
        </form>
    );
}