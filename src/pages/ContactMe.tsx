import emailjs from '@emailjs/browser';
import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const ContactMePage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const errors: Partial<FormData> = {};

    if (!formData.name) {
      errors.name = 'Please enter your name';
    }

    if (!formData.email) {
      errors.email = 'Please enter your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.message) {
      errors.message = 'Please enter a message';
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrors(validateForm());

    if (Object.keys(validateForm()).length === 0) {
      setIsSubmitting(true);
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      };
      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          templateParams,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } catch (error) {
        console.error('Error sending email:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex items-center justify-center flex-grow">
        <div className="container py-12">
          <h1 className="mb-6 text-3xl font-bold text-center">Contact Me</h1>
          {isSubmitted ? (
            <div className="alert alert-success">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-6 h-6 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Your message has been sent successfully!</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
              <div className="w-full form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className={`input input-bordered w-full ${formErrors.name ? 'input-error' : ''}`}
                />
                {formErrors.name && (
                  <label className="label">
                    <span className="label-text-alt text-error">{formErrors.name}</span>
                  </label>
                )}
              </div>
              <div className="w-full form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className={`input input-bordered w-full ${formErrors.email ? 'input-error' : ''}`}
                />
                {formErrors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">{formErrors.email}</span>
                  </label>
                )}
              </div>
              <div className="w-full form-control">
                <label className="label">
                  <span className="label-text">Message</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  className={`textarea textarea-bordered h-48 w-full ${formErrors.message ? 'input-error' : ''}`}
                ></textarea>
                {formErrors.message && (
                  <label className="label">
                    <span className="label-text-alt text-error">{formErrors.message}</span>
                  </label>
                )}
              </div>
              <div className="w-full form-control">
                <button
                  type="submit"
                  className={`btn btn-primary mt-4 w-full ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      {/* Footer component goes here */}
    </div>
  );
};
