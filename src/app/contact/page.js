'use client';
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import FooterCta from "@/components/footerCTA";
import Footer from "@/components/footer";
import Title1 from "@/components/Title1";
import Input1 from "@/components/inputs/input1";
import Input2 from '@/components/inputs/input2';
import CheckboxText from '@/components/inputs/checkboxText';
import Button1PC from '@/components/buttons/button1PC';

export default function Contact() {
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [phoneValue, setPhoneValue] = useState('');
  const [messageValue, setMessageValue] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
    privacy: false
  });

  
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\d\-\(\)\+\s]+$/;
    return phone.length >= 10 && phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    setSubmitError('');
    setSubmitSuccess('');

    const newErrors = {
      name: false,
      email: false,
      phone: false,
      message: false,
      privacy: false
    };

    let hasErrors = false;

    if (!nameValue.trim()) {
      newErrors.name = true;
      hasErrors = true;
    }

    if (!emailValue.trim()) {
      newErrors.email = true;
      hasErrors = true;
    } else if (!validateEmail(emailValue)) {
      newErrors.email = true;
      hasErrors = true;
    }

    if (!phoneValue.trim()) {
      newErrors.phone = true;
      hasErrors = true;
    } else if (!validatePhone(phoneValue)) {
      newErrors.phone = true;
      hasErrors = true;
    }

    if (!messageValue.trim()) {
      newErrors.message = true;
      hasErrors = true;
    }

    if (!privacyAccepted) {
      newErrors.privacy = true;
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) {
      setSubmitError('入力内容をご確認ください。');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameValue,
          email: emailValue,
          phone: phoneValue,
          message: messageValue,
          privacyAccepted,
          honeypot: ''
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess('送信が完了しました。ありがとうございました。');
        setTimeout(() => setSubmitSuccess(''), 5000);
        setNameValue('');
        setEmailValue('');
        setPhoneValue('');
        setMessageValue('');
        setPrivacyAccepted(false);
        setErrors({
          name: false,
          email: false,
          phone: false,
          message: false,
          privacy: false
        });
        alert('送信が完了しました。ありがとうございました。');
      } else {
        // Do not show backend error, just a generic message
        setSubmitError('送信に失敗しました。もう一度お試しください。');
      }
    } catch (error) {
      setSubmitError('送信に失敗しました。もう一度お試しください。');
    }
  };

  const getErrorMessage = (field) => {
    switch (field) {
      case 'name':
        return 'お名前をご入力ください';
      case 'email':
        return !emailValue.trim() ? 'メールアドレスをご入力ください' : 'メールアドレスの形式が正しくありません';
      case 'phone':
        return !phoneValue.trim() ? '電話番号をご入力ください' : '電話番号の形式が正しくありません';
      case 'message':
        return 'お問い合わせ内容をご入力ください';
      case 'privacy':
        return 'プライバシーポリシーに同意してください';
      default:
        return '入力が必要です';
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <Navbar
        menuItems={[
          { text: "TOP", href: "/", isSelected: false },
          { text: "ブログ", href: "/blogs", isSelected: false }
        ]}
      />
      <div className="w-full h-fit flex flex-col justify-start items-center px-[16px] md:px-[64px] lg:px-[80px] pt-[96px] pb-[160px] gap-[64px]">
        <Title1
          title="お問い合わせ"
          subtitle="CONTACT"
          variant='light'
        />
        <div className="w-full flex flex-col justify-start items-center gap-[64px] px-[8px] md:px-[24px] lg:px-[100px] py-[100px] rounded-[16px] bg-[#F1F2F4]">
          <div className='w-full flex flex-col justify-start items-start gap-[48px]'>
            <Input1
              label="お名前"
              placeholder="お名前をご入力ください"
              value={nameValue}
              onChange={setNameValue}
              required={true}
              error={errors.name}
              errorMessage={getErrorMessage('name')}
            />
            <Input1
              label="メールアドレス"
              placeholder="メールアドレスをご入力ください"
              value={emailValue}
              onChange={setEmailValue}
              required={true}
              error={errors.email}
              errorMessage={getErrorMessage('email')}
            />
            <Input1
              label="電話番号"
              placeholder="電話番号をご入力ください"
              value={phoneValue}
              onChange={setPhoneValue}
              required={true}
              error={errors.phone}
              errorMessage={getErrorMessage('phone')}
            />
            <Input2
              label="お問い合わせ内容"
              placeholder="お問い合わせ内容をご入力ください"
              value={messageValue}
              onChange={setMessageValue}
              required={true}
              error={errors.message}
              errorMessage={getErrorMessage('message')}
            />
            <CheckboxText
              checked={privacyAccepted}
              onChange={setPrivacyAccepted}
              error={errors.privacy}
              errorMessage={getErrorMessage('privacy')}
            />
          </div>
          <div className='flex flex-col justify-center items-start gap-[10px] w-full'>
            <Button1PC text='確認画面へ' href="#" onClick={handleSubmit} />
          </div>
        </div>
      </div>
      <FooterCta />
      <Footer />
    </div>
  );
}