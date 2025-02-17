import { useEffect, useState } from 'react';
import { Stream } from "@cloudflare/stream-react";
import { getTranslations } from '../i18/translations'
import Turnstile, { useTurnstile } from "react-turnstile";
import React from 'react';
import Image from "next/image";
import axios from 'axios';
import { v4 as uuid } from 'uuid'
import { Button, CardHeader, Grid, Divider, CardBody, CardFooter, Link, Card, Col, Input, RadioGroup, Radio, Select, NextUIProvider } from '@nextui-org/react';

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
    foodRestriction: 'None', // Default value set to "None"
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
      token: token
    }));
    setFormData(prevData => ({
      ...prevData,
      uuid: uuid()
    }));

    //initiate timestamp
    setFormData(prevData => ({
      ...prevData,
      timestamp: Date.now()
    }));
    console.log('resolved challenge: ' + formData.token)
  }

  const checkInvite = async (inviteId) => {
    try {
      console.log(formData)
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
          firstName: response.data.firstName
        }));
        setFormData(prevData => ({
          ...prevData,
          lastName: response.data.lastName
        }));
        setFormData(prevData => ({
          ...prevData,
          email: response.data.email
        }));
        setFormData(prevData => ({
          ...prevData,
          brunch: response.data.brunch
        }));
        setFormData(prevData => ({
          ...prevData,
          children: response.data.children
        }));
        setFormData(prevData => ({
          ...prevData,
          foodRestriction: response.data.foodRestriction
        }));
        if (response.data.accompanyFirstName != null && response.data.accompanyFirstName != '') {
          setFormData(prevData => ({
            ...prevData,
            accompany: true
          }));
          setFormData(prevData => ({
            ...prevData,
            accompanyFirstName: response.data.accompanyFirstName
          }));
          setFormData(prevData => ({
            ...prevData,
            accompanyLastName: response.data.accompanyLastName
          }));
        }
        
        console.log('Form submitted successfully:', response.data);
      } else {
        console.log(response.data)
        setInviteError(true)
        console.log(inviteError)
      }
    } catch (error) {
      //console.log(response.data)
      console.error('Error submitting form:', error);
      setInviteError(true);
    }
  }

  const handleInvite = async (e) => {
    e.preventDefault();
    if (challengeSolved) { 
        setFormData(prevData => ({
          ...prevData,
          inviteId: inviteId || formData.inviteId
        }));
        checkInvite(inviteId || formData.inviteId) 
    } else {
      setInviteError(true)
    }
  }

  const handleRestart = (e) => {
    e.preventDefault();
    console.log('restart form process')
    setFormSubmitted(null)
    setFormError(null)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    //generate UUID
    // Handle form submission
    if (challengeSolved) {
      try {
        console.log(formData)
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
      }
    } else {
      setFormError(true)
    }
  };
  
  return (
    <div id="form" className='md:flex items-center justify-between'>
    <div className='md:w-1/2 mx-auto p-10 font-poppins'>
      <div className="max-w-md mx-auto">
        <h2 className="text-5xl font-niconne font-bold text-center">{translations.form.greeting}</h2>
        <Image
          src='/images/separator.png'
          width={150}
          height={30}
          alt="Decorative separator"
          className='opacity-70 bg-position-center mx-auto m-4'
          priority
        />
        <p className="m-4 mb-3 justify-center text-center font-poppins">{translations.form.message}</p>
      </div>
      { !inviteValid && (
        <form className="max-w-md mx-auto mt-8 p-6 bg-rose-50 rounded-2xl shadow-lg" onSubmit={handleInvite}>
        <div className="mb-4 flex flex-col">
          <label className="block mb-1">{translations.form.inviteId}</label>
          { !inviteId && (<input
            type="text"
            name="inviteId"
            value={formData.inviteId}
            onChange={handleChange}
            className="form-input"
            required
          />)}
          { inviteId && (<input
            type="text"
            name="inviteId"
            value={inviteId}
            onLoad={handleInvite}
            onChange={handleChange}
            className="form-input"
            disabled
            placeholder={inviteId}
          />)}
        </div>
        <div className='justify-center m-4'>
          <Turnstile
          className='justify-center'
          widgetId='test'
          theme='light'
          size='normal'
          sitekey="0x4AAAAAAAYQdZI9-4itKgdR"
          autoResetOnExpire='true'
          onVerify={(token) => {
            handleChallenge(token)
            setChallengeSolved(true)
            console.log('challenge ok: ' + JSON.stringify(token))
          }}
        /></div>
        <div className="text-center">
          <button type="submit" className="py-2 px-4 bg-amber-500 text-white rounded hover:bg-amber-600 focus:outline-none focus:bg-amber-600">{translations.form.submit}</button>
        </div>
        {inviteError && (
          <div className='mt-4 text-red-700 text-center'>
            {locale == "en" ? "Wrong invitation ID" : "Numéro d'invitation non reconnu"}
          </div>
        )}
        </form>
      )}
      {!rsvp && inviteValid && (
        <form className="max-w-md mx-auto mt-8 p-6 bg-rose-50 rounded-2xl shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">RSVP Form</h2>
        <div className="mb-4 flex flex-col">
          <label className="block mb-2">{translations.form.rsvp}</label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="rsvp"
                value="yes"
                onChange={(e) => handleRsvp(e.target.value)}
                className="form-radio h-4 w-4 text-amber-500"
              />
              <span className="ml-2">{locale === 'en' ? 'Yes' : 'Oui'}</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="rsvp"
                value="no"
                onChange={(e) => handleRsvp(e.target.value)}
                className="form-radio h-4 w-4 text-amber-500"
              />
              <span className="ml-2">{locale === 'en' ? 'No' : 'Non'}</span>
            </label>
          </div>
        </div>
        </form>
      )}
      { !formSubmitted && rsvp && inviteValid && !inviteError && (
        <form className="max-w-md mx-auto mt-8 p-6 bg-rose-50 rounded-2xl shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center">RSVP Form</h2>
        <div className="mb-4 flex flex-col">
          <label className="block mb-1">{translations.form.firstName}*</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="block mb-1">{translations.form.lastName}*</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="form-input  font-gray-500"
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="block mb-1">{translations.form.email}*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="block mb-1">
          {translations.form.brunch}
            <input
              type="checkbox"
              name="brunch"
              checked={formData.brunch}
              onChange={handleChange}
              className="ml-2 form-checkbox"
            />
          </label>
        </div>
        <div className="mb-4 flex flex-col">
          <label className="block mb-1">{translations.form.children}</label>
          <input
            type="number"
            name="children"
            value={formData.children}
            onChange={handleChange}
            defaultValue='0'
            className="form-input font-gray-500"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label className="block mb-1">{translations.form.foodRestriction}</label>
          <select
            name="foodRestriction"
            value={formData.foodRestriction}
            onChange={handleChange}
            className="form-select"
            required
          >
            {['None', 'Vegan', 'Vegetarian', 'Kosher', 'Halal', 'Other'].map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        {formData.foodRestriction === 'Other' && (
          <div className="mb-4">
            <label className="block mb-1">{translations.form.foodRestrictionPrecise}</label>
            <input
              type="text"
              name="foodRestrictionOther"
              value={formData.foodRestrictionOther}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        )}
        <div className="mb-4 flex flex-col">
          <label className="block mb-1">
          {translations.form.accompany}
            <input
              type="checkbox"
              name="accompany"
              checked={formData.accompany}
              onChange={handleChange}
              className="ml-2 form-checkbox"
            />
          </label>
        </div>
        {formData.accompany && (
          <>
            <div className="mb-4 flex flex-col">
              <label className="block mb-1">{translations.form.firstName}</label>
              <input
                type="text"
                name="accompanyFirstName"
                value={formData.accompanyFirstName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="mb-4 flex flex-col">
              <label className="block mb-1">{translations.form.lastName}</label>
              <input
                type="text"
                name="accompanyLastName"
                value={formData.accompanyLastName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
          </>
        )}
        <div className='justify-center m-4'>
          <Turnstile
          className='justify-center'
          widgetId='test'
          theme='light'
          size='normal'
          sitekey="0x4AAAAAAAYQdZI9-4itKgdR"
          autoResetOnExpire='true'
          onVerify={(token) => {
            handleChallenge(token)
            setChallengeSolved(true)
            console.log('challenge ok: ' + JSON.stringify(token))
          }}
        /></div>

        <div className="text-center">
          <button type="submit" className="py-2 px-4 bg-amber-500 text-white rounded hover:bg-amber-600 focus:outline-none focus:bg-amber-600">{translations.form.submit}</button>
        </div>
        {formError && (
          <div className='mt-4 text-red-700 text-center'>
            {locale == "en" ? "Form submission failed, please retry" : "Validation du formulaire échoué, veuillez recommencer"}
          </div>
        )}
      </form>
      )}
      { formSubmitted && (
        <div className="max-w-md break-all mx-auto mt-8 p-6 bg-rose-50 rounded-2xl shadow-lg">
          <div className='font-bold'>
          {translations.form.submitted}
          </div>
          <div className='break-all'>
          <table className='break-all divide-y mt-2 mb-2 divide-gray-200 dark:divide-neutral-700'>
            <tr>
              <td>{translations.form.firstName}</td>
              <td>{formData.firstName}</td>
            </tr>
            <tr>
              <td>{translations.form.lastName}</td>
              <td>{formData.lastName}</td>
            </tr>
            <tr>
              <td>{translations.form.email}</td>
              <td>{formData.email}</td>
            </tr>
            <tr>
              <td>{translations.form.brunch}</td>
              <td>{JSON.stringify(formData.brunch)}</td>
            </tr>
            <tr>
              <td>{translations.form.children}</td>
              <td>{formData.children}</td>
            </tr>
            <tr>
              <td>{translations.form.foodRestriction}</td>
              <td>{formData.foodRestriction}</td>
            </tr>
            <tr>
              <td>{translations.form.accompany}</td>
              <td>{JSON.stringify(formData.accompany)}</td>
            </tr>
            <tr>
              <td>{translations.form.accompanyFirstName}</td>
              <td>{JSON.stringify(formData.accompanyFirstName)}</td>
            </tr>
            <tr>
              <td>{translations.form.accompanyLastName}</td>
              <td>{JSON.stringify(formData.accompanyLastName)}</td>
            </tr>
          </table>
          </div>
          <div className="text-center">
          <button onClick={handleRestart} className="py-2 px-4 bg-amber-500 text-white rounded hover:bg-amber-600 focus:outline-none focus:bg-amber-600">{translations.form.restart}</button>
        </div>
        </div>
      )}
       
    </div>
    <div className='md:w-1/2 mx-auto p-10 bg-amber-50 rounded-lg'>
      <Stream muted="true" loop="true" preload="true" controls="false" autoplay="true" loading="lazy" src="6c68ab7a5c914000416a6e47ded7ac01" />
    </div>
    </div>
  );
};

export default Form;
