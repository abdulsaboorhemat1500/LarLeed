'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { useApi } from '@/app/hooks/useApi';
import { useTranslations } from '@/hooks/useTranslations';
import Lottie from "lottie-react";
import Contact from "@/components/lottie-files/Contact.json";
export default function ContactUsSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null, 'success', 'error'
  const { post } = useApi();
  const { t } = useTranslations();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Validate required fields
      if (
        !formData.name ||
        !formData.email ||
        !formData.subject ||
        !formData.message
      ) {
        throw new Error(t("HomePage.please fill in all required fields"));
      }

      const result = await post("/api/contact", formData);

      if (result.success) {
        setSubmitStatus("success");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error(result.error || t("HomePage.failed to submit form"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-section" className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">
        <div className="bg-gray-100  rounded-2xl p-6 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
            {/* contact us information */}
            <div className="lg:col-span-2 text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
                {t("HomePage.contact us")}
              </h2>

              <Lottie animationData={Contact} />
            </div>
            {/* contact us form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 font-medium">
                      {t(
                        "HomePage.thank you! Your message has been sent successfully."
                      )}
                    </p>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 font-medium">
                      {t("HomePage.failed to send message. Please try again.")}
                    </p>
                  </div>
                )}

                <div className="pt-5">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {t("HomePage.full name *")}
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      placeholder={t("HomePage.enter your full name")}
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div className="lg:col-span-1">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        {t("HomePage.email *")}
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                          placeholder={t("HomePage.enter your email")}
                        />
                      </div>
                    </div>
                    <div className="lg:col-span-1">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        {t("HomePage.phone number")}
                      </label>
                      <div className="mt-1">
                        <input
                          id="phone"
                          name="phone"
                          type="text"
                          autoComplete="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                          placeholder={t("HomePage.enter your phone number")}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {t("HomePage.subject *")}
                  </label>
                  <div className="mt-1">
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      autoComplete="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
                      placeholder={t("HomePage.enter message subject")}
                    />
                  </div>
                </div>

                <div className="pt-5">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {t("HomePage.message *")}
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-3 border border-gray-400 dark:border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm resize-vertical"
                      placeholder={t("HomePage.enter your message")}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="cursor-pointer mt-2 bg-custom-half text-white px-8 py-2 rounded-3xl font-semibold text-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? t("HomePage.submitting...")
                    : t("HomePage.submit form")}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}