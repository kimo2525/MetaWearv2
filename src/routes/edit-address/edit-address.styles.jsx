import styled from "styled-components";

export const EditAddressPage = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;

  /* padding: 18px 16px 45px; */

  box-sizing: border-box;
`;

export const EditAddressContainer = styled.div`
  width: 100%;
  max-width: 430px;
`;

export const Title = styled.h1`
  margin: 0 0 14px;

  font-size: 23px;
  line-height: 1.2;
  font-weight: 500;
`;

export const AddressForm = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

export const FieldContainer = styled.div`
  width: 100%;
  margin-bottom: 11px;
`;

export const Label = styled.label`
  display: block;

  margin-bottom: 3px;

  font-size: 12px;
  line-height: 1.3;
  font-weight: 700;
`;

export const Input = styled.input`
  width: 100%;
  height: 31px;

  padding: 0 9px;

  font-size: 12px;

  border: 1px solid #888c8c;
  border-radius: 6px;

  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #007185;

    box-shadow: 0 0 0 2px rgba(0, 113, 133, 0.18);
  }
`;

export const MobileContainer = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: 92px 1fr;
  gap: 7px;

  ${Input} {
    width: 100%;
  }
`;

export const CountryCodeSelect = styled.select`
  width: 100%;
  height: 31px;

  padding: 0 6px;

  font-size: 12px;

  background: #f7fafa;

  border: 1px solid #888c8c;
  border-radius: 6px;

  outline: none;

  &:focus {
    border-color: #007185;

    box-shadow: 0 0 0 2px rgba(0, 113, 133, 0.18);
  }
`;

export const HelperText = styled.p`
  margin: 3px 0 0;

  font-size: 10px;
  line-height: 1.35;

  color: #565959;
`;

export const SectionTitle = styled.h2`
  margin: 8px 0 10px;

  font-size: 17px;
  line-height: 1.2;
  font-weight: 700;
`;

export const RadioContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 35px;

  margin: 4px 0 14px;
`;

export const RadioOption = styled.label`
  display: flex;
  align-items: center;

  gap: 5px;

  font-size: 12px;
  cursor: pointer;

  input {
    margin: 0;
    cursor: pointer;
  }
`;

export const DefaultAddress = styled.label`
  display: flex;
  align-items: center;

  gap: 6px;

  margin-bottom: 16px;

  font-size: 11px;
  color: #565959;

  input {
    margin: 0;
  }
`;

export const ErrorMessage = styled.div`
  width: 100%;

  margin-bottom: 10px;
  padding: 7px 9px;

  font-size: 11px;

  color: #b12704;

  border: 1px solid #b12704;
  border-radius: 5px;

  box-sizing: border-box;
`;

export const SuccessMessage = styled.div`
  width: 100%;

  margin-bottom: 10px;
  padding: 7px 9px;

  font-size: 11px;

  border: 1px solid #067d62;
  border-radius: 5px;

  box-sizing: border-box;
`;
