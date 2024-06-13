import { useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function InboundCreate() {
    const [forms, setForms] = useState({
        stuff_id: '',
        total: '',
        date: '',
        proff_file: ''
    });

    const [error, setError] = useState([]);
    const [success, setSuccess] = useState(false); // State untuk menampilkan pesan keberhasilan
    const navigate = useNavigate();
    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers:{
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForms(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCreateInbound = (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('stuff_id', forms.stuff_id);
        formData.append('total', forms.total);
        formData.append('date', forms.date);
        formData.append('proff_file', document.getElementById('proff_file').files[0]);
    
        instance.post('inbound/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            setError([]);
            setSuccess(true);
            setTimeout(() => {
                navigate('/inbound');
            }, 2000);
        })
        .catch(err => {
            console.log("Error response:", err.response);
            setError({ message: 'Terjadi kesalahan saat membuat barang. Silakan coba lagi.' });
        });
    };
    
    return (
        <Case>
            <div className="block m-auto h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    {success && (
                        <div role="alert">
                            <div className="bg-green-500 text-white font-bold rounded-t px-4 py-2">
                                Berhasil!
                            </div>
                            <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
                                Barang berhasil dibuat.
                            </div>
                        </div>
                    )}

                    {error && Object.keys(error).length > 0 ? (
                        <div role="alert">
                            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                Gagal!
                            </div>
                            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                <ul>
                                    <li>{error.message}</li>
                                </ul>
                            </div>
                        </div>
                    ) : ''}
          <div className="text-center mb-6">
                        <h5 className="text-3xl font-medium text-gray-900 dark:text-white">Inbound</h5>
                    </div>
                    <form onSubmit={handleCreateInbound}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label htmlFor="stuff_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">stuff_id</label>
                                <input type="text" id="stuff_id" name="stuff_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ketik Id" required onChange={handleInputChange} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="total" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total</label>
                                <input type="text" id="total" name="total" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ketik Total" required onChange={handleInputChange} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                <input type="datetime-local" id="date" name="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ketik Password" required onChange={handleInputChange} />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="proff_file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File</label>
                                <input type="file" id="proff_file" name="proff_file" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ketik Role" required onChange={handleInputChange} />
                            </div>
                        
                        </div>
                        <div className="flex justify-end mt-4">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </Case>
    );
}
