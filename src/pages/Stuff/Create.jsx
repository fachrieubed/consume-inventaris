import { useState } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function StuffCreate() {
    const [forms, setForms] = useState({
        name: '',
        category: '',
        borrowCount: 0  // Tambahkan ini
    });

    const [error, setError] = useState([]);
    const [success, setSuccess] = useState(false);
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

    const handleCreateStuff = (event) => {
        event.preventDefault();

        instance.post('stuff/create', forms)
            .then(res => {
                setError([]);
                setSuccess(true);
                setTimeout(() => {
                    navigate('/stuff');
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

                    <div className="flex justify-center">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Stuff</h5>
                    </div>
                    <form onSubmit={handleCreateStuff} className="max-w-sm mx-auto">
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Barang</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Ketik Nama Barang"
                                required
                                value={forms.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kategori Barang</label>
                            <select
                                id="category"
                                name="category"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                value={forms.category}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Pilih Kategori</option>
                                <option value="HTL">Hotel</option>
                                <option value="KLN">Kuliner</option>
                                <option value="Teknisi/Sarpras">Sarpras</option>
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="borrowCount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jumlah Peminjaman Barang</label>
                            <input
                                type="number"
                                id="borrowCount"
                                name="borrowCount"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Jumlah Peminjaman Barang"
                                value={forms.borrowCount}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Case>
    );
}
