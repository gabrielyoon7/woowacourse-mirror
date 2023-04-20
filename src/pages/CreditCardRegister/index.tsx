import CreditCard from 'components/CreditCard';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as Type from 'types';
import CreditCardNumberInput from './components/CreditCardNumberInput';
import CreditCardExpiryInput from './components/CreditCardExpiryInput';
import CreditCardOwnerInput from './components/CreditCardOwnerInput';
import CreditCardCVCInput from './components/CreditCardCVCInput';
import CreditCardPasswordInput from './components/CreditCardPasswordInput';
import * as S from './style';

type CreditCardPasswordType = { first: string, second: string };

function CreditCardRegister() {
  const navigate = useNavigate();

  const [creditCardNumber, setCreditCardNumber] = useState('');

  const [creditCardExpiry, setCreditCardExpiry] = useState('');

  const [creditCardOwner, setCreditCardOwner] = useState('');

  const [creditCardCVC, setCreditCardCVC] = useState('');

  const [creditCardPassword, setCreditCardPassword] = useState<CreditCardPasswordType>({ first: '', second: '' });
  const handleChangeCreditCardFirstPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFirstPassword = event.target.value;
    if (newFirstPassword.length <= 1) {
      setCreditCardPassword({ ...creditCardPassword, first: event.target.value });
    }
  };

  const handleChangeCreditCardSecondPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSecondPassword = event.target.value;
    if (newSecondPassword.length <= 1) {
      setCreditCardPassword({ ...creditCardPassword, second: event.target.value });
    }
  };

  const [isFullFilled, setIsFullFilled] = useState(false);

  useEffect(() => {
    if (creditCardCVC === '') return setIsFullFilled(false);
    if (creditCardExpiry === '') return setIsFullFilled(false);
    if (creditCardCVC === '') return setIsFullFilled(false);
    if (creditCardPassword.first === '' || creditCardPassword.second === '') return setIsFullFilled(false);

    return setIsFullFilled(true);
  }, [creditCardNumber, creditCardExpiry, creditCardCVC, creditCardPassword]);

  const handleSubmit = () => {
    if (!isFullFilled) return;

    const newCreditCard: Type.CreditCard = {
      number: creditCardNumber,
      expiry: creditCardExpiry,
      owner: creditCardOwner,
      cvc: creditCardCVC,
      password: {
        first: creditCardPassword.first,
        second: creditCardPassword.second,
      },
    };
    const existCreditCard = JSON.parse(localStorage.getItem('creditCards') || '[]');
    localStorage.setItem('creditCards', JSON.stringify([...existCreditCard, newCreditCard]));
    navigate('/');
  };

  return (
    <S.CreditCardRegisterLayout>
      <S.CreditCardRegisterTopSheet>
        <S.HomeButton type="button" onClick={() => navigate('/')}>{`${'<'}`}</S.HomeButton>
        <S.CreditCardRegisterHeader>카드 추가</S.CreditCardRegisterHeader>
      </S.CreditCardRegisterTopSheet>
      <S.PreviewCreditCard>
        <CreditCard
          fullFilled={false}
          creditCard={{
            number: creditCardNumber,
            expiry: creditCardExpiry,
            owner: creditCardOwner,
          }}
        />
      </S.PreviewCreditCard>
      <S.CreditCardRegisterForm>
        <CreditCardNumberInput
          creditCardNumber={creditCardNumber}
          setCreditCardNumber={setCreditCardNumber}
        />
        <CreditCardExpiryInput
          creditCardExpiry={creditCardExpiry}
          setCreditCardExpiry={setCreditCardExpiry}
        />
        <CreditCardOwnerInput
          creditCardOwner={creditCardOwner}
          setCreditCardOwner={setCreditCardOwner}
        />
        <CreditCardCVCInput
          creditCardCVC={creditCardCVC}
          setCreditCardCVC={setCreditCardCVC}
        />
        <CreditCardPasswordInput
          creditCardPassword={creditCardPassword}
          onChangeFirstPassword={handleChangeCreditCardFirstPassword}
          onChangeSecondPassword={handleChangeCreditCardSecondPassword}
        />
        <S.ButtonWrapper>
          <S.ResigerButton
            disabled={!isFullFilled}
            type="button"
            onClick={() => handleSubmit()}
          >
            확인
          </S.ResigerButton>
        </S.ButtonWrapper>
      </S.CreditCardRegisterForm>
    </S.CreditCardRegisterLayout>
  );
}
export default CreditCardRegister;
