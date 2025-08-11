const App = () => {
    // State to manage if the form was successfully submitted
    const [isSubmitted, setIsSubmitted] = React.useState(false);

    // The main component for the feedback form
    const FeedbackForm = () => {
        const [email, setEmail] = React.useState('');
        const [phone, setPhone] = React.useState('');
        const [feedback, setFeedback] = React.useState('');
        const [errors, setErrors] = React.useState({});
        const [isSubmitting, setIsSubmitting] = React.useState(false);
        const [submitError, setSubmitError] = React.useState('');

        // Function to validate the form data
        const validate = () => {
            const newErrors = {};
            if (!email) {
                newErrors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(email)) {
                newErrors.email = 'Email address is invalid';
            }
            if (!phone) {
                newErrors.phone = 'Phone number is required';
            } else if (!/^[6-9]\d{9}$/.test(phone)) {
                newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
            }
            if (!feedback.trim()) {
                newErrors.feedback = 'Feedback cannot be empty';
            }
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

        // Async function to handle form submission to Formspree
        const handleSubmit = async (event) => {
            event.preventDefault();
            if (!validate()) {
                return;
            }

            setIsSubmitting(true);
            setSubmitError('');

            // --- Formspree Integration ---
            // This URL has been corrected with your new endpoint.
            const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgvzdwkd'; // <-- CORRECTED URL!

            try {
                const response = await fetch(FORMSPREE_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, phone, feedback }),
                });

                if (response.ok) {
                    // If submission is successful, show the success screen
                    setIsSubmitted(true);
                } else {
                    // If there's a server-side error
                    throw new Error('Could not submit feedback. Please try again.');
                }
            } catch (error) {
                setSubmitError(error.message);
            } finally {
                setIsSubmitting(false);
            }
        };

        return (
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8 transition-all duration-500">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 mb-4 p-2 border-4 border-green-500 rounded-full flex items-center justify-center">
                        <img src="logo.png" alt="Etania Food Court Logo" className="w-full h-auto" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Etania Food Court</h1>
                    <p className="text-gray-500 mt-1">We value your feedback!</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-500'}`} placeholder="you@example.com" />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">+91</span>
                                <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={`w-full px-4 py-2 border rounded-r-lg focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-500'}`} placeholder="9876543210" maxLength="10" />
                            </div>
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>
                        <div>
                            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">Your Feedback</label>
                            <textarea id="feedback" rows="5" value={feedback} onChange={(e) => setFeedback(e.target.value)} className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.feedback ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-500'}`} placeholder="Tell us about your experience..."></textarea>
                            {errors.feedback && <p className="text-red-500 text-xs mt-1">{errors.feedback}</p>}
                        </div>
                    </div>
                    <div className="mt-8">
                        <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out disabled:bg-gray-400">
                            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                        </button>
                        {submitError && <p className="text-red-500 text-center text-sm mt-4">{submitError}</p>}
                    </div>
                </form>
                <p className="text-center text-xs text-gray-400 mt-6">Powered by Ashoka One Mall</p>
            </div>
        );
    };

    // A new component for the success screen
    const SuccessScreen = () => {
        return (
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center transition-all duration-500">
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-4">
                    <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h2>
                <p className="text-gray-600 mb-6">Your feedback has been successfully submitted. We appreciate you taking the time to help us improve.</p>
                <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out"
                >
                    Submit Another Feedback
                </button>
            </div>
        );
    };

    // Main render logic: show success screen or form based on state
    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4 font-sans">
            {isSubmitted ? <SuccessScreen /> : <FeedbackForm />}
        </div>
    );
};
