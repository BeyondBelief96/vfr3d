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
    <div className="flex flex-col min-h-screen bg-base-300">
      <main className="flex items-center justify-center flex-grow">
        <div className="container py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex items-center justify-center bg-base-100">
              <div className="px-8 py-12 text-center text-primary-content">
                <h2 className="mb-4 text-3xl font-bold">Get in Touch</h2>
                <p className="text-lg">
                  Encountering issues, bugs, or just need to contact me? Fill out the form and I'll
                  get back to you as soon as I can!
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md p-8 mx-auto rounded-lg shadow-xl bg-base-100">
                {isSubmitted ? (
                  <div className="text-center alert alert-success">
                    Email Sent! I'll be in touch soon.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">First Name*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          className={`input input-bordered w-full ${formErrors.name ? 'input-error' : ''}`}
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Email*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email address"
                          className={`input input-bordered w-full ${formErrors.email ? 'input-error' : ''}`}
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Message*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Enter your message"
                          className={`textarea textarea-bordered h-32 w-full ${formErrors.message ? 'textarea-error' : ''}`}
                        ></textarea>
                      </div>
                      <div className="form-control">
                        <button
                          type="submit"
                          className={`btn btn-primary w-full ${isSubmitting ? 'loading' : ''}`}
                          disabled={isSubmitting}
                        >
                          Lets Chat!
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
