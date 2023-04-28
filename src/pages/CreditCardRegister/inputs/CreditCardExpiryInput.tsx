import * as T from 'types';
import useCreditCardForm from 'hooks/useCreditCardForm';
import { markExpiry } from 'domains/creditCard';
import Box from 'components/Box';
import Input from '../../../components/Input';
import * as S from '../style';
import { validateExpiry } from '../../../domains/validations';

function CreditCardExpiryInput({ name }: T.CreditCardInputProps) {
  const { creditCardForm, setCreditCardForm } = useCreditCardForm();

  const handleChangeCreditCardExpiry = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCardExpiry = event.target.value;
    const cleanedExpiry = newCardExpiry
      .replaceAll('/', '')
      .replace(/\D/g, '');
    if (cleanedExpiry.length > 4) return;
    setCreditCardForm({ ...creditCardForm, [name]: cleanedExpiry });
  };

  const markedExpiry = markExpiry(creditCardForm.expiry);
  const isError = validateExpiry(creditCardForm.expiry);

  return (
    <Box>
      <S.CreditCardRegisterLabel>만료일</S.CreditCardRegisterLabel>
      <Input placeholder="MM/YY" type="string" value={markedExpiry} width="40%" textAlign="center" onChange={handleChangeCreditCardExpiry} />
      {isError && <S.ErrorMessage>만료일은 유효한 MM/YY 형식이어야 합니다.</S.ErrorMessage>}
    </Box>
  );
}

export default CreditCardExpiryInput;
