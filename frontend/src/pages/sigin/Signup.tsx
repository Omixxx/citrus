import { IonButton, IonInput, IonItem, IonLabel, IonNote } from '@ionic/react'
import React, { Component, useState } from 'react'

export default function Signup() {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState<boolean>();

  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validate = (ev: Event) => {
    const value = (ev.target as HTMLInputElement).value;
    setIsValid(undefined);
    if (value === '') return;
    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false);
  };

  const markTouched = () => {
    setIsTouched(true);
  };

  return (
    <>
      <IonItem>
        <IonLabel position="floating">username</IonLabel>
        <IonInput placeholder="Enter text" ></IonInput>
      </IonItem>

      <IonItem fill="solid" className={`${isValid && 'ion-valid'} ${isValid === false && 'ion-invalid'} ${isTouched && 'ion-touched'}`}>
        <IonLabel position="floating">Email</IonLabel>
        <IonInput type="email" onIonInput={(event) => validate(event)} onIonBlur={() => markTouched()}></IonInput>
        <IonNote slot="helper">Enter a valid email</IonNote>
        <IonNote slot="error">Invalid email</IonNote>
      </IonItem>

      <IonItem fill="outline">
        <IonLabel position="floating">password</IonLabel>
        <IonInput placeholder="Enter text"></IonInput>
      </IonItem>

      <IonItem fill="solid">
        <IonLabel position="floating">confirm password</IonLabel>
        <IonInput placeholder="Enter text"></IonInput>
      </IonItem>

      <IonButton shape="round" onClick={() => {
        sigin()
      }}>Sigin </IonButton>
    </>
  )

  function sigin() {
    console.log('sigin')
  }
}
