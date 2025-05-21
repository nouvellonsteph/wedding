import { useEffect, useState } from 'react';
import { Stream } from "@cloudflare/stream-react";
import { getTranslations } from '../i18/translations'
import Turnstile from "react-turnstile";
import React from 'react';
import Image from "next/image";
import axios from 'axios';
import { v4 as uuid } from 'uuid'

const Form = ({locale, inviteId}) => {
  const translations = getTranslations(locale)

  const [formData, setFormData] = useState({
    timestamp: '',
    uuid: '',
    firstName: '',
    lastName: '',
    inviteId: '',
    rsvp: null,
    email: '',
    brunch: false,
    children: 0,
    foodRestriction: 'None',
    accompany: false,
    accompanyFirstName: '',
    accompanyLastName: '',
    token: ''
  });
  const [inviteValid, setInviteValid] = useState(false);
  const [inviteError, setInviteError] = useState();
  const [formError, setFormError] = useState();
  const [challengeSolved, setChallengeSolved] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [rsvp, setRsvp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRsvp = (value) => {
    setFormData(prevData => ({
      ...prevData,
      rsvp: value === 'yes'
    }));
    setRsvp(true);
  };
  
  const handleChallenge = (token) => {
    setFormData(prevData => ({
      ...prevData,
      token: token,
      uuid: uuid(),
      timestamp: Date.now()
    }));
    console.log('resolved challenge: ' + token);
    setChallengeSolved(true);
  }

  const checkInvite = async (inviteId) => {
    setLoading(true);
    try {
      console.log(formData);
      const response = await axios({
        method: 'POST',
        url: `/checkInvite?inviteId=${inviteId}`,
        data: formData
      });
      
      if (response && response.status === 200) {
        setInviteError(false);
        setInviteValid(true);
        setFormData(prevData => ({
          ...prevData,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          brunch: response.data.brunch,
          children: response.data.children,
          foodRestriction: response.data.foodRestriction
        }));
        
        if (response.data.accompanyFirstName != null && response.data.accompanyFirstName != '') {
          setFormData(prevData => ({
            ...prevData,
            accompany: true,
            accompanyFirstName: response.data.accompanyFirstName,
            accompanyLastName: response.data.accompanyLastName
          }));
        }
        
        console.log('Form submitted successfully:', response.data);
      } else {
        console.log(response.data);
        setInviteError(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setInviteError(true);
    } finally {
      setLoading(false);
    }
  }

  const handleInvite = async (e) => {
    e.preventDefault();
    if (challengeSolved) { 
        setFormData(prevData => ({
          ...prevData,
          inviteId: inviteId || formData.inviteId
        }));
        checkInvite(inviteId || formData.inviteId);
    } else {
      setInviteError(true);
    }
  }

  const handleRestart = (e) => {
    e.preventDefault();
    console.log('restart form process');
    setFormSubmitted(null);
    setFormError(null);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (challengeSolved) {
      setLoading(true);
      try {
        console.log(formData);
        const response = await axios({
          method: 'POST',
          url: '/formSubmit', 
          data: formData
        });
        
        if (response.status === 200) {
          setFormError(null);
          setFormSubmitted(true);
          console.log('Form submitted successfully:', response.data);
        } else {
          setFormError('Failed to submit form. Please try again later.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setFormError('Failed to submit form. Please try again later.');
      } finally {
        setLoading(false);
      }
    } else {
      setFormError(true);
    }
  };
  
  return (
    <div id="form" className="py-16">
      <div className="max-w-6xl mx-auto px-4 md:flex items-center justify-between">
        <div className="md:w-2/5 mx-auto p-6 font-poppins">
          <div className="max-w-md mx-auto mb-10">
            <h2 className="text-4xl md:text-5xl font-niconne font-bold text-center mb-4">{translations.form.greeting}</h2>
            <Image
              src="/images/separator.png"
              width={150}
              height={30}
              alt="Decorative separator"
              className="opacity-80 hover:opacity-100 transition-all duration-300 mx-auto mb-6"
              priority
            />
            <p className="text-center font-poppins text-lg">{translations.form.message}</p>
          </div>
          
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500"></div>
            </div>
          )}
          
          {!loading && !inviteValid && (
            <form className="max-w-md mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg border-l-4 border-amber-400 transition-all duration-300 hover:shadow-xl" onSubmit={handleInvite}>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">{translations.form.inviteId}</label>
                {!inviteId && (
                  <input
                    type="text"
                    name="inviteId"
                    value={formData.inviteId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring focus:ring-amber-200 focus:ring-opacity-50 transition-all duration-300"
                    required
                    placeholder={locale === 'en' ? "Enter your invitation code" : "Entrez votre code d'invitation"}
                  />
                )}
                {inviteId && (
                  <input
                    type="text"
                    name="inviteId"
                    value={inviteId}
                    onLoad={handleInvite}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100"
                    disabled
                    placeholder={inviteId}
                  />
                )}
              </div>
              
              <div className="flex justify-center mb-6">
                <Turnstile
                  className="mx-auto"
                  widgetId="test"
                  theme="light"
                  size="normal"
                  sitekey="0x4AAAAAAAYQdZI9-4itKgdR"
                  autoResetOnExpire="true"
                  onVerify={handleChallenge}
                />
              </div>
              
              <div className="text-center">
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-amber-500 text-white font-medium rounded-lg shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all duration-300 transform hover:-translate-y-1"
                  disabled={!challengeSolved}
                >
                  {translations.form.submit}
                </button>
              </div>
              
              {inviteError && (
                <div className="mt-6 p-3 bg-red-50 text-red-700 rounded-lg text-center border-l-4 border-red-500">
                  {locale === "en" ? "Wrong invitation ID" : "Numéro d'invitation non reconnu"}
                </div>
              )}
            </form>
          )}

          {!rsvp && inviteValid && (
            <form className="max-w-md mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg border-l-4 border-amber-400" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-6 text-center">RSVP Form</h2>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3">{translations.form.rsvp}</label>
                <div className="flex gap-6 justify-center">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="rsvp"
                      value="yes"
                      onChange={(e) => handleRsvp(e.target.value)}
                      className="form-radio h-5 w-5 text-amber-500"
                    />
                    <span className="ml-2 text-lg">{locale === 'en' ? 'Yes' : 'Oui'}</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="rsvp"
                      value="no"
                      onChange={(e) => handleRsvp(e.target.value)}
                      className="form-radio h-5 w-5 text-amber-500"
                    />
                    <span className="ml-2 text-lg">{locale === 'en' ? 'No' : 'Non'}</span>
                  </label>
                </div>
              </div>
            </form>
          )}

          {!formSubmitted && rsvp && inviteValid && !inviteError && (
            <form className="max-w-md mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg border-l-4 border-amber-400" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-6 text-center">RSVP Form</h2>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">{translations.form.firstName}*</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring focus:ring-amber-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">{translations.form.lastName}*</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring focus:ring-amber-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">{translations.form.email}*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring focus:ring-amber-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="flex items-center text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="brunch"
                    checked={formData.brunch}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-amber-500 rounded"
                  />
                  <span className="ml-2">{translations.form.brunch}</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">{translations.form.children}</label>
                <input
                  type="number"
                  name="children"
                  value={formData.children}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring focus:ring-amber-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">{translations.form.foodRestriction}</label>
                <select
                  name="foodRestriction"
                  value={formData.foodRestriction}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring focus:ring-amber-200"
                  required
                >
                  {['None', 'Vegan', 'Vegetarian', 'Kosher', 'Halal', 'Other'].map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              {formData.foodRestriction === 'Other' && (
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">{translations.form.foodRestrictionPrecise}</label>
                  <input
                    type="text"
                    name="foodRestrictionOther"
                    value={formData.foodRestrictionOther}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring focus:ring-amber-200"
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="flex items-center text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="accompany"
                    checked={formData.accompany}
                    onChange={handleChange}
                    className="form-checkbox h-5 w-5 text-amber-500 rounded"
                  />
                  <span className="ml-2">{translations.form.accompany}</span>
                </label>
              </div>
              
              {formData.accompany && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">{translations.form.firstName}</label>
                    <input
                      type="text"
                      name="accompanyFirstName"
                      value={formData.accompanyFirstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring focus:ring-amber-200"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">{translations.form.lastName}</label>
                    <input
                      type="text"
                      name="accompanyLastName"
                      value={formData.accompanyLastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring focus:ring-amber-200"
                      required
                    />
                  </div>
                </>
              )}
              
              <div className="flex justify-center my-6">
                <Turnstile
                  className="mx-auto"
                  widgetId="form-submit"
                  theme="light"
                  size="normal"
                  sitekey="0x4AAAAAAAYQdZI9-4itKgdR"
                  autoResetOnExpire="true"
                  onVerify={handleChallenge}
                />
              </div>

              <div className="text-center">
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-amber-500 text-white font-medium rounded-lg shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all duration-300 transform hover:-translate-y-1"
                  disabled={!challengeSolved || loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : translations.form.submit}
                </button>
              </div>
              
              {formError && (
                <div className="mt-6 p-3 bg-red-50 text-red-700 rounded-lg text-center border-l-4 border-red-500">
                  {locale === "en" ? "Form submission failed, please retry" : "Validation du formulaire échoué, veuillez recommencer"}
                </div>
              )}
            </form>
          )}
          
          {formSubmitted && (
            <div className="max-w-md mx-auto mt-8 p-8 bg-white rounded-xl shadow-lg border-l-4 border-green-400">
              <div className="text-center text-xl font-bold text-green-600 mb-6">
                {translations.form.submitted}
              </div>
              <div className="mb-6">
                <table className="w-full border-collapse divide-y divide-gray-200">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 font-medium">{translations.form.firstName}</td>
                      <td className="py-3 text-gray-700">{formData.firstName}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">{translations.form.lastName}</td>
                      <td className="py-3 text-gray-700">{formData.lastName}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">{translations.form.email}</td>
                      <td className="py-3 text-gray-700">{formData.email}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">{translations.form.brunch}</td>
                      <td className="py-3 text-gray-700">{formData.brunch ? (locale === 'en' ? 'Yes' : 'Oui') : (locale === 'en' ? 'No' : 'Non')}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">{translations.form.children}</td>
                      <td className="py-3 text-gray-700">{formData.children}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">{translations.form.foodRestriction}</td>
                      <td className="py-3 text-gray-700">{formData.foodRestriction}</td>
                    </tr>
                    {formData.accompany && (
                      <>
                        <tr className="border-b">
                          <td className="py-3 font-medium">{translations.form.accompanyFirstName}</td>
                          <td className="py-3 text-gray-700">{formData.accompanyFirstName}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 font-medium">{translations.form.accompanyLastName}</td>
                          <td className="py-3 text-gray-700">{formData.accompanyLastName}</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="text-center">
                <button 
                  onClick={handleRestart} 
                  className="px-6 py-3 bg-amber-500 text-white font-medium rounded-lg shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all duration-300 transform hover:-translate-y-1"
                >
                  {translations.form.restart}
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="md:w-3/5 mx-auto p-4 md:p-6 lg:p-10 bg-amber-50 rounded-lg mt-10 md:mt-0">
          <div className="rounded-xl overflow-hidden shadow-xl border-2 border-amber-200 transform transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            <Stream 
              muted={true} 
              loop={true} 
              preload={true} 
              controls={false} 
              autoplay={true} 
              loading="lazy" 
              src="6c68ab7a5c914000416a6e47ded7ac01"
              className="w-full"
              style={{ minHeight: "600px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
