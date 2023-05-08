/* eslint-disable react/jsx-no-useless-fragment */
import CreditCard from 'components/CreditCard';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useModal from 'hooks/useModal';
import useCreditCardForm from 'hooks/useCreditCardForm';
import ControlButton from 'components/ControlButton';
import CreditCardRegisterTopSheet from 'components/CreditCardRegisterTopSheet';
import FlexBox from 'components/FlexBox';
import { useCreditCardList } from 'hooks/useCreditCardList';
import { Modal } from '@gabrielyoon7/simple-modal';
import LoadingSpinner from 'components/LoadingSpinner';
import CreditCardNumberInput from './inputs/CreditCardNumberInput';
import CreditCardExpiryInput from './inputs/CreditCardExpiryInput';
import CreditCardOwnerInput from './inputs/CreditCardOwnerInput';
import CreditCardCVCInput from './inputs/CreditCardCVCInput';
import CreditCardPasswordInput from './inputs/CreditCardPasswordInput';
import * as S from './style';
import CreditCardCompanyInput from './inputs/CreditCardCompanyInput';

function CreditCardRegister() {
  const navigate = useNavigate();
  const { modalOpen, openModal, closeModal } = useModal();
  const { creditCardForm, initCreditCardForm, isCreditCardError } = useCreditCardForm();
  const { isLoading, saveCreditCard } = useCreditCardList();

  const handleSubmit = () => {
    if (isCreditCardError) return;

    saveCreditCard(creditCardForm);
  };

  useEffect(() => {
    initCreditCardForm();
    openModal();
  }, []);

  return (
    <>
      {isLoading ? (
        <S.CenteredLayout>
          <LoadingSpinner label="카드를 등록중입니다." />
        </S.CenteredLayout>
      ) : (
        <>
          <CreditCardRegisterTopSheet>
            <S.HomeButton type="button" onClick={() => navigate('/')}>
              {`${'<'}`}
            </S.HomeButton>
            <S.CreditCardRegisterHeader>카드 추가</S.CreditCardRegisterHeader>
          </CreditCardRegisterTopSheet>
          <FlexBox justifyContent="center">
            <CreditCard
              fullFilled={false}
              creditCard={{
                companyId: creditCardForm.companyId,
                number: creditCardForm.number,
                expiry: creditCardForm.expiry,
                owner: creditCardForm.owner,
              }}
            />
          </FlexBox>
          {!modalOpen && (
            <FlexBox justifyContent="center">
              <S.CreditCardChangeButton type="button" onClick={openModal}>
                카드사 변경하기
              </S.CreditCardChangeButton>
            </FlexBox>
          )}
          <S.CreditCardRegisterForm>
            <CreditCardNumberInput />
            <CreditCardExpiryInput />
            <CreditCardOwnerInput />
            <CreditCardCVCInput />
            <CreditCardPasswordInput />

            <ControlButton
              data-testid="credit-card-form-submit"
              disabled={isCreditCardError}
              type="button"
              onClick={handleSubmit}
            >
              다음
            </ControlButton>

          </S.CreditCardRegisterForm>
          <Modal modalOpen={modalOpen}>
            <CreditCardCompanyInput closeModal={closeModal} />
          </Modal>
        </>
      )}
    </>
  );
}
export default CreditCardRegister;
