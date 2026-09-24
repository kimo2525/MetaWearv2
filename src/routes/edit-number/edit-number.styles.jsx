import styled from "styled-components";

export const EditNumberPage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  /* padding: 18px 16px 40px; */
  box-sizing: border-box;
`;

export const EditNumberContainer = styled.div`
  width: 100%;
  max-width: 330px;
`;

export const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 12px;
  color: #0066c0;
  span {
    color: #555;
  }
  a {
    color: #0066c0;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const EditNumberBox = styled.div`
  width: 100%;
  padding: 16px;

  border: 1px solid #d5d9d9;
  border-radius: 7px;

  background: #fff;

  box-sizing: border-box;
`;

export const StepText = styled.div`
  font-size: 13px;
  margin-bottom: 10px;
`;

export const Title = styled.h1`
  margin: 0 0 12px;

  font-size: 20px;
  line-height: 1.2;
  font-weight: 700;
`;

export const CurrentNumberContainer = styled.div`
  margin-bottom: 16px;
`;

export const CurrentNumberLabel = styled.div`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 5px;
`;

export const CurrentNumber = styled.div`
  font-size: 13px;
`;

export const Form = styled.form`
  width: 100%;
`;

export const NumberFields = styled.div`
  display: grid;
  grid-template-columns: 92px 1fr;
  gap: 8px;
  align-items: end;

  margin-bottom: 16px;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 3px;
`;

export const CountrySelect = styled.select`
  height: 32px;
  width: 100%;

  padding: 0 8px;

  font-size: 13px;

  border: 1px solid #888c8c;
  border-radius: 7px;

  background: #fff;

  outline: none;

  &:focus {
    border-color: #007185;
    box-shadow: 0 0 0 2px rgba(0, 113, 133, 0.2);
  }
`;

export const NumberInput = styled.input`
  height: 32px;
  width: 100%;

  padding: 0 9px;

  font-size: 13px;

  border: 1px solid #888c8c;
  border-radius: 7px;

  box-sizing: border-box;
  outline: none;

  &:focus {
    border-color: #007185;
    box-shadow: 0 0 0 2px rgba(0, 113, 133, 0.2);
  }
`;

export const InfoText = styled.p`
  margin: 0 0 14px;

  font-size: 11px;
  line-height: 1.45;
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 31px;

  border: none;
  border-radius: 16px;

  font-size: 12px;
  cursor: pointer;

  background: #ffd814;

  &:hover {
    background: #f7ca00;
  }

  &:active {
    background: #f0b800;
  }
`;

export const SuccessMessage = styled.div`
  padding: 10px;

  font-size: 12px;

  border: 1px solid #067d62;
  border-radius: 6px;

  margin-top: 10px;
`;
