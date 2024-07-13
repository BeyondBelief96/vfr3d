import React, { useState } from 'react';
import { SendEmailCommand } from '@aws-sdk/client-ses';
import { sesClient } from '../utility/aws-clients';

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
      const params = {
        Destination: {
          ToAddresses: [import.meta.env.VITE_ADMIN_EMAIL ?? ''],
        },
        Message: {
          Body: {
            Text: {
              Data: `
                Name: ${formData.name}
                Email: ${formData.email}
                Message: ${formData.message}
              `,
            },
          },
          Subject: {
            Data: `VFR3D Contact Form Message from ${formData.name}`,
          },
        },
        Source: import.meta.env.VITE_ADMIN_EMAIL ?? '',
      };

      try {
        const command = new SendEmailCommand(params);
        await sesClient.send(command);
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
    <div
      className="flex flex-col min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      style={{
        backgroundImage: 'url("/background_image.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <main className="flex items-center justify-center flex-grow">
        <div className="container py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="flex items-center justify-center p-8 rounded-lg shadow-xl bg-base-100 bg-opacity-80">
              <div className="text-center text-primary-content">
                <h2 className="mb-6 text-4xl font-bold tracking-wide">Get in Touch</h2>
                <p className="text-xl">
                  Encountering issues, bugs, or just need to contact me? Fill out the form and I'll
                  get back to you as soon as I can!
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center p-8 rounded-lg shadow-xl bg-base-100 bg-opacity-80">
              <div className="w-full max-w-md mx-auto">
                {isSubmitted ? (
                  <div className="text-center alert alert-success">
                    Email Sent! I'll be in touch soon.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                      <div className="form-control">
                        <label className="label">
                          <span className="text-lg font-semibold label-text">First Name*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          className={`input input-bordered w-full text-lg ${
                            formErrors.name ? 'input-error' : ''
                          }`}
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="text-lg font-semibold label-text">Email*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email address"
                          className={`input input-bordered w-full text-lg ${
                            formErrors.email ? 'input-error' : ''
                          }`}
                        />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="text-lg font-semibold label-text">Message*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Enter your message"
                          className={`textarea textarea-bordered h-40 w-full text-lg ${
                            formErrors.message ? 'textarea-error' : ''
                          }`}
                        ></textarea>
                      </div>
                      <div className="form-control">
                        <button
                          type="submit"
                          className={`btn btn-primary btn-lg w-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 ${
                            isSubmitting ? 'loading' : ''
                          }`}
                          disabled={isSubmitting}
                        >
                          Let's Chat!
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
