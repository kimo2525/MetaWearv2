import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const EditPasswordPage = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  /* padding: 18px 16px 40px; */
  box-sizing: border-box;
`;

export const EditPasswordContainer = styled.div`
  width: 100%;
  max-width: 440px;
`;

export const Title = styled.h1`
  margin: 0 0 8px;

  font-size: 23px;
  line-height: 1.2;
  font-weight: 500;
`;

export const PasswordBox = styled.div`
  width: 100%;

  padding: 14px;

  border: 1px solid #d5d9d9;
  border-radius: 7px;

  background: white;
  box-sizing: border-box;
`;

export const Description = styled.p`
  margin: 0 0 14px;

  font-size: 12px;
  line-height: 1.4;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const FieldContainer = styled.div`
  width: 150px;
  margin-bottom: 14px;
`;

export const Label = styled.label`
  display: block;

  margin-bottom: 4px;

  font-size: 12px;
  font-weight: 700;
`;

export const PasswordInput = styled.input`
  width: 100%;
  height: 30px;

  padding: 0 8px;

  font-size: 12px;

  border: 1px solid #888c8c;
  border-radius: 6px;

  box-sizing: border-box;
  outline: none;

  &:focus {
    border-color: #007185;
    box-shadow: 0 0 0 2px rgba(0, 113, 133, 0.2);
  }
`;

export const ErrorMessage = styled.div`
  margin: -3px 0 10px;
  font-size: 11px;
  padding: 7px 9px;
  border-radius: 5px;
  color: #b12704;
  border: 1px solid #f0c1c5;
  background-color: #f0c1c5;
`;

export const SuccessMessage = styled.div`
  margin: -3px 0 10px;
  padding: 7px 9px;
  font-size: 11px;
  background-color: #d4edda;
  border: 1px solid #067d62;
  border-radius: 5px;
`;

export const SecuritySection = styled.div`
  margin-top: 20px;

  font-size: 11px;
  line-height: 1.5;
`;

export const SecurityTitle = styled.div`
  font-weight: 700;
`;

export const SecurityLink = styled(NavLink)`
  color: #0066c0;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
