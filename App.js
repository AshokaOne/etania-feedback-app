const App = () => {
    // State variables to hold form data and error messages
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [feedback, setFeedback] = React.useState('');
    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Function to validate the form data
    const validate = () => {
        const newErrors = {};
        // Email validation: checks for a basic email format
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid';
        }

        // Indian phone number validation: checks for 10 digits starting with 6, 7, 8, or 9
        if (!phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[6-9]\d{9}$/.test(phone)) {
            newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
        }
        
        // Feedback validation: checks if feedback is provided
        if (!feedback.trim()) {
            newErrors.feedback = 'Feedback cannot be empty';
        }

        setErrors(newErrors);
        // Returns true if there are no errors, false otherwise
        return Object.keys(newErrors).length === 0;
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // If the form is not valid, stop the submission
        if (!validate()) {
            return;
        }
        
        setIsSubmitting(true);

        // --- Email Trigger ---
        // This section constructs a 'mailto' link to open the default email client.
        // The recipient, subject, and body of the email are pre-filled.
        const recipientEmail = 'ashokaonefoodcourt@gmail.com';
        const subject = 'New Feedback from Etania Food Court';
        const body = `
            A new feedback has been submitted.
            ----------------------------------
            Customer Email: ${email}
            Customer Phone: ${phone}
            ----------------------------------
            Feedback:
            ${feedback}
        `;

        // Encoding the subject and body for the URL
        const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Redirect the browser to the mailto link, which opens the email client
        window.location.href = mailtoLink;
        
        // Reset the button state after a short delay
        setTimeout(() => {
            setIsSubmitting(false);
            // Optionally clear the form
            setEmail('');
            setPhone('');
            setFeedback('');
        }, 1000);
    };

    // The JSX that defines the component's appearance
    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
                
                {/* Header Section with Logo */}
                <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 mb-4 p-2 border-4 border-green-500 rounded-full flex items-center justify-center">
                         {/* IMPORTANT: Make sure you upload your logo as 'logo.png' to your GitHub repository */}
                        <img src="logo.png" alt="Etania Food Court Logo" className="w-full h-auto" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">Etania Food Court</h1>
                    <p className="text-gray-500 mt-1">We value your feedback!</p>
                </div>

                {/* Feedback Form */}
                <form onSubmit={handleSubmit} noValidate>
                    <div className="space-y-5">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-500'}`}
                                placeholder="you@example.com"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Phone Input */}
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                             <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">+91</span>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-r-lg focus:outline-none focus:ring-2 ${errors.phone ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-500'}`}
                                    placeholder="9876543210"
                                    maxLength="10"
                                />
                            </div>
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>

                        {/* Feedback Textarea */}
                        <div>
                            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">Your Feedback</label>
                            <textarea
                                id="feedback"
                                rows="5"
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.feedback ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-green-500'}`}
                                placeholder="Tell us about your experience..."
                            ></textarea>
                            {errors.feedback && <p className="text-red-500 text-xs mt-1">{errors.feedback}</p>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out disabled:bg-gray-400"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                        </button>
                    </div>
                </form>
                 <p className="text-center text-xs text-gray-400 mt-6">
                    Powered by Ashoka One Mall
                </p>
            </div>
        </div>
    );
};
