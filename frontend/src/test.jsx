import { useState, useEffect } from 'react';
import axios from 'axios';
import './test.css';


// export const TransactionStatus = () => {
//     const [username, setUsername] = useState('');
//     const [partnerReff, setPartnerReff] = useState('');
//     const [transactionStatus, setTransactionStatus] = useState('');

//     const handleCheckStatus = async () => {
//         try {
//             const response = await axios.get(`https://gateway-dev.linkqu.id/linkqu-partner/transaction/payment/checkstatus?username=${username}&partnerreff=${partnerReff}`);
//             setTransactionStatus(response.data.status_trx);
//         } catch (error) {
//             console.error('Error:', error.response ? error.response.data : error.message);
//         }
//     };

//     return (
//         <div>
//             <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
//             <input type="text" value={partnerReff} onChange={(e) => setPartnerReff(e.target.value)} placeholder="Partner Reff" />
//             <button onClick={handleCheckStatus}>Check Status</button>
//             <div>Transaction Status: {transactionStatus}</div>
//         </div>
//     );
// };

const TopUp = () => {
    const [formData, setFormData] = useState({
        amount: '',
        partner_reff: '',
        customer_id: '',
        customer_name: '',
        expired: '',
        customer_phone: '',
        customer_email: '',
        bank_code: '',
        url_callback: '',
    });
    const [alert, setAlert] = useState({ type: '', message: '', data:'' });

    // Menghitung tanggal dan waktu untuk dua hari ke depan
    useEffect(() => {
        const getTwoDaysFromNow = () => {
            const now = new Date();
            now.setDate(now.getDate() + 2);
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            return `${year}${month}${day}${hours}${minutes}${seconds}`;
        };

        setFormData(prevFormData => ({
            ...prevFormData,
            expired: getTwoDaysFromNow(),
        }));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://531c-2404-c0-5c10-00-b451-9f96.ngrok-free.app/api/v1/topupVA', formData);
            console.log('Success:', response.data);
            setAlert({ type: 'success', message: 'Transaction successful!', data: response.data.virtual_account });
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setAlert({ type: 'danger', message: error.response ? error.response.data : error.message });
        }
    };

    return (
        <div className="container">
            <h2>Top Up</h2>
            {alert.message && (
                <div className={`alert alert-${alert.type}`}>
                    {alert.message}
                    <br />
                    <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={alert.data}
                    readOnly

                />
                <p>copy this for your Virtual Account</p>
                </div>
            )}
            <form onSubmit={handleSubmit} className="topup-form">
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="customer_name"
                    placeholder="Customer Name"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="expired"
                    placeholder="Expired (yyyyMMddHHiiss)"
                    value={formData.expired}
                    onChange={handleChange}
                    required
                    readOnly
                />
                <input
                    type="text"
                    name="customer_phone"
                    placeholder="Customer Phone"
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="customer_email"
                    placeholder="Customer Email"
                    onChange={handleChange}
                />
                <select
                    name="bank_code"
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Bank</option>
                    <option value="014">Bank BCA</option>
                    <option value="002">Bank BRI</option>
                    <option value="022">Bank CIMB</option>
                    <option value="009">Bank BNI</option>
                    <option value="008">Bank MANDIRI</option>
                    <option value="016">Bank Maybank</option>
                    <option value="013">Bank Permata</option>
                    <option value="011">BANK DANAMON</option>
                    <option value="451">BANK BSI</option>
                    <option value="490">BANK BNC (Neo Commerce)</option>
                    <option value="028">BANK OCBC</option>
                    <option value="147">BANK MUAMALAT</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

const RetailPayment = () => {
    const [formData, setFormData] = useState({
        amount: '',
        partner_reff: '',
        customer_id: '',
        customer_name: '',
        expired: '',
        customer_phone: '',
        customer_email: '',
        retail_code: '',
    });
    const [alert, setAlert] = useState({ type: '', message: '' });
    const [showModal, setShowModal] = useState(false);

    // Menghitung tanggal dan waktu untuk dua hari ke depan
    useEffect(() => {
        const getTwoDaysFromNow = () => {
            const now = new Date();
            now.setDate(now.getDate() + 2);
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            return `${year}${month}${day}${hours}${minutes}${seconds}`;
        };

        setFormData(prevFormData => ({
            ...prevFormData,
            expired: getTwoDaysFromNow(),
        }));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/v1/topupRet', formData);
            console.log('Success:', response.data);
            setAlert({ type: 'success', message: 'Transaction successful!', data: response.data.payment_code });
            setShowModal(false);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setAlert({ type: 'danger', message: error.response ? error.response.data.error : error.message });
        }
    };

    return (
        <div className="container">
            <h2>Retail Payment</h2>
            {alert.message && (
                <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {alert.message}
                    <br />
                    <input
                    type="number"
                    name="amount"
                    value={alert.data}
                    required
                    readOnly
                />
                <p>copy this and give this to the retail cashier</p>
                </div>
            )}
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                Create Retail Payment
            </button>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>Create Retail Payment</h2>
                        <form onSubmit={handleSubmit} className="topup-form">
                            <input
                                type="number"
                                name="amount"
                                placeholder="Amount"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="customer_name"
                                placeholder="Customer Name"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="expired"
                                placeholder="Expired (yyyyMMddHHiiss)"
                                value={formData.expired}
                                onChange={handleChange}
                                required
                                readOnly
                            />
                            <input
                                type="text"
                                name="customer_phone"
                                placeholder="Customer Phone"
                                onChange={handleChange}
                            />
                            <input
                                type="email"
                                name="customer_email"
                                placeholder="Customer Email"
                                onChange={handleChange}
                            />
                            <select
                                name="retail_code"
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Retail</option>
                                <option value="ALFAMART">Alfamart</option>
                                <option value="INDOMARET">Indomaret</option>
                            </select>
                            <button type="submit" className="btn btn-primary mt-3">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};//beluman

const QRISPayment = () => {
    const [formData, setFormData] = useState({
        amount: '',
        partner_reff: '',
        customer_id: '',
        customer_name: '',
        expired: '',
        customer_phone: '',
        customer_email: '',
        url_callback: '',
    });
    const [alert, setAlert] = useState({ type: '', message: '' });
    const [showModal, setShowModal] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    // Menghitung tanggal dan waktu untuk dua hari ke depan
    useEffect(() => {
        const getTwoDaysFromNow = () => {
            const now = new Date();
            now.setDate(now.getDate() + 2);
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            return `${year}${month}${day}${hours}${minutes}${seconds}`;
        };

        setFormData(prevFormData => ({
            ...prevFormData,
            expired: getTwoDaysFromNow(),
        }));
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const signature = '6320a4c8344a3d549f9e2ffdcbe1a64db39ab29074f6dfed2d21aec598cd927a'; // Sesuaikan ini
            const response = await axios.post('http://localhost:8000/api/v1/topupQris', {
                ...formData,
                signature,
            });
            console.log('Success:', response.data);
            setQrCodeUrl(response.data.imageqris);
            setAlert({ type: 'success', message: 'Transaction successful!' });
            setShowModal(false);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setAlert({ type: 'danger', message: error.response ? error.response.data.error : error.message });
        }
    };

    return (
        <div className="container">
            <h2>QRIS Payment</h2>
            {alert.message && (
                <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                    {alert.message}
                </div>
            )}
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                Create QRIS Payment
            </button>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>Create QRIS Payment</h2>
                        <form onSubmit={handleSubmit} className="topup-form">
                            <input
                                type="number"
                                name="amount"
                                placeholder="Amount"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="customer_name"
                                placeholder="Customer Name"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="expired"
                                placeholder="Expired (yyyyMMddHHiiss)"
                                value={formData.expired}
                                onChange={handleChange}
                                required
                                readOnly
                            />
                            <input
                                type="text"
                                name="customer_phone"
                                placeholder="Customer Phone"
                                onChange={handleChange}
                            />
                            <input
                                type="email"
                                name="customer_email"
                                placeholder="Customer Email"
                                onChange={handleChange}
                            />
                            <button type="submit" className="btn btn-primary mt-3">Submit</button>
                        </form>
                    </div>
                </div>
            )}

            {qrCodeUrl && (
                <div className="qr-code-container">
                    <h3>Scan QR Code</h3>
                    <img src={qrCodeUrl} alt="QR Code" />
                </div>
            )}
        </div>
    );
};

const OvoPushForm = () => {
    const [formData, setFormData] = useState({
        amount: '',
        partner_reff: '',
        customer_id: '',
        customer_name: '',
        expired: '',
        customer_phone: '',
        customer_email: '',
        retail_code: 'PAYOVO',
        ewallet_phone: '',
        bill_title: '',
        username: '',
        pin: '',
        signature: '',
        url_callback: '',
    });

    const [alert, setAlert] = useState({ type: '', message: '' });
    const [timeLeft, setTimeLeft] = useState(2 * 60); // 2 minutes in second
    const [isTimerActive, setIsTimerActive] = useState(false);


    // Menghitung tanggal dan waktu untuk dua hari ke depan
    useEffect(() => {
        
        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        const getTwoMinutesFromNow = () => {
            const now = new Date();
            now.setMinutes(now.getMinutes() + 2);
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            return `${year}${month}${day}${hours}${minutes}${seconds}`;
        };

        setFormData(prevFormData => ({
            ...prevFormData,
            expired: getTwoMinutesFromNow(),
        }));

        return () => clearInterval(intervalId);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/v1/ovoPush', formData);
            console.log('Success:', response.data);
            if(response.data.status=="FAILED"){
                setAlert({type:"danger", message:'Transaction failed: ' + (response.data.response_desc ? response.data.response_desc : "Transaction failed!")});
            }
            setAlert({ type: 'success', message: 'Transaction successful!' });
            setIsTimerActive(true);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setAlert({type:"danger", message:'Transaction failed: ' + (error.response ? error.response.data.message : error.message)});
        }
    };

    return (
        <div className="container">
            {alert.message && (
                <div className={`alert alert-${alert.type}`}>
                    {alert.message}
                    <br />
                    {alert.type === "success" && isTimerActive== true ? (<p>Time left: {formatTime(timeLeft)}</p>) : ''}
                </div>
            )}
            <h2>OVO Push Payment</h2>
            <form onSubmit={handleSubmit} className="topup-form">
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="customer_name"
                    placeholder="Customer Name"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="expired"
                    placeholder="Expired (yyyyMMddHHiiss)"
                    value={formData.expired}
                    onChange={handleChange}
                    required
                    readOnly
                />
                <input
                    type="text"
                    name="customer_phone"
                    placeholder="Customer Phone"
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="customer_email"
                    placeholder="Customer Email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="ewallet_phone"
                    placeholder="Ewallet Phone"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="bill_title"
                    placeholder="Bill Title"
                    onChange={handleChange}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

const EwalletPaymentForm = () => {
    const [formData, setFormData] = useState({
        amount: '',
        partner_reff: '',
        customer_id: '',
        customer_name: '',
        expired: '',
        customer_phone: '',
        customer_email: '',
        retail_code: 'PAYDANA', // default to PAYDANA, can be changed to PAYLINKAJA or PAYSHOPEE
        ewallet_phone: '',
        bill_title: '',
        username: '',
        pin: '',
        signature: '',
        url_callback: '',
    });

    const [alert, setAlert] = useState({ type: '', message: '', data:'' });
    const [timeLeft, setTimeLeft] = useState(5.6 * 60);
    const [isTimerActive, setIsTimerActive] = useState(false);

    // Menghitung tanggal dan waktu untuk dua hari ke depan
    useEffect(() => {

        const intervalId = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        const getFiveMinutesFromNow = () => {
            const now = new Date();
            now.setMinutes(now.getMinutes() + 5);
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            return `${year}${month}${day}${hours}${minutes}${seconds}`;
        };

        setFormData(prevFormData => ({
            ...prevFormData,
            expired: getFiveMinutesFromNow(),
        }));
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/v1/ewallet', formData);
            console.log('Success:', response.data);
            if(response.data.status=="FAILED"){
                alert('Transaction failed: ' + (response.data.response_desc ? response.data.response_desc : 'failed'));
            }
            setAlert({ type: 'success', message: 'Transaction successful!', data:response.data.url_payment });
            setIsTimerActive(true);
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            setAlert({type:"danger", message:'Transaction failed: ' + (error.response ? error.response.data.message : error.message)});
        }
    };

    return (
        <div className="container">
             {alert.message && (
                <div className={`alert alert-${alert.type}`}>
                    {alert.message}
                    <br />
                    <a href={alert.data}>click this to pay</a>
                    <br />
                    {alert.type === "success" && isTimerActive== true ? (<p>Time left: {formatTime(timeLeft)}</p>) : ''}
                </div>
            )}
            <h2>Ewallet Payment</h2>
            <form onSubmit={handleSubmit} className="topup-form">
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="customer_name"
                    placeholder="Customer Name"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="expired"
                    placeholder="Expired (yyyyMMddHHiiss)"
                    value={formData.expired}
                    onChange={handleChange}
                    required
                    readOnly
                />
                <input
                    type="text"
                    name="customer_phone"
                    placeholder="Customer Phone"
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="customer_email"
                    placeholder="Customer Email"
                    onChange={handleChange}
                    required
                />
                 <select
                    name="retail_code"
                    onChange={handleChange}
                    required>
                        <option value="">Select E-wallet</option>
                        <option value="PAYDANA">Dana</option>
                        <option value="PAYLINKAJA">LinkAja</option>
                        <option value="PAYGOPAY" disabled>Gopay(on going)</option>
                        <option value="PAYSHOPEE">ShopeePay</option>
                </select>
                <input
                    type="text"
                    name="ewallet_phone"
                    placeholder="Ewallet Phone"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="bill_title"
                    placeholder="Bill Title"
                    onChange={handleChange}
                    required
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export {TopUp, RetailPayment, QRISPayment, OvoPushForm, EwalletPaymentForm};