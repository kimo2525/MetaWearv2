import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { selectCurrentUser } from "../../store/user/user.selector";
import { setCurrentUser } from "../../store/user/user.action";

import { updateUserMobileNumber } from "../../utils/supabase/supabase.utils";

import {
  EditNumberPage,
  EditNumberContainer,
  EditNumberBox,
  StepText,
  Title,
  CurrentNumberContainer,
  CurrentNumberLabel,
  CurrentNumber,
  Form,
  NumberFields,
  FieldContainer,
  Label,
  CountrySelect,
  NumberInput,
  InfoText,
  SuccessMessage,
} from "./edit-number.styles";

import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../components/button/button.component";
import BreadCrumb from "../../components/bread-crumb/bread-crumb.compnent";

const EditNumber = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const [countryCode, setCountryCode] = useState("+20");
  const [mobileNumber, setMobileNumber] = useState("");
  const [updated, setUpdated] = useState(false);

  const changeMobileHandler = async (event) => {
    event.preventDefault();

    try {
      const cleanNumber = mobileNumber.replace(/\D/g, "");
      const fullNumber = `${countryCode}${cleanNumber}`;

      const profile = await updateUserMobileNumber(currentUser.uid, fullNumber);

      dispatch(
        setCurrentUser({
          ...currentUser,
          mobileNumber: profile.mobile_number,
        }),
      );

      setMobileNumber("");
      setUpdated(true);
    } catch (error) {
      console.error("Failed to change mobile number:", error);
    }
  };

  return (
    <EditNumberPage>
      <EditNumberContainer>
        <BreadCrumb
          links={[
            { label: "Your Account", href: "/youraccount" },
            { label: "Change Mobile Phone Number", href: "" },
          ]}
        />
        <br />
        <EditNumberBox>
          <StepText>Change mobile number</StepText>

          <Title>Change your mobile number</Title>

          <CurrentNumberContainer>
            <CurrentNumberLabel>Current mobile number</CurrentNumberLabel>

            <CurrentNumber>
              {currentUser?.mobileNumber || "No mobile number added"}
            </CurrentNumber>
          </CurrentNumberContainer>

          <Form onSubmit={changeMobileHandler}>
            <NumberFields>
              <FieldContainer>
                <Label htmlFor="country">Country</Label>

                <CountrySelect
                  id="country"
                  value={countryCode}
                  onChange={(event) => setCountryCode(event.target.value)}
                >
                  <option value="+20">EG +20</option>
                  <option value="+1">US +1</option>
                  <option value="+44">UK +44</option>
                  <option value="+49">DE +49</option>
                </CountrySelect>
              </FieldContainer>

              <FieldContainer>
                <Label htmlFor="mobileNumber">New mobile number</Label>

                <NumberInput
                  id="mobileNumber"
                  type="tel"
                  value={mobileNumber}
                  onChange={(event) => {
                    setMobileNumber(event.target.value);
                    setUpdated(false);
                  }}
                  required
                />
              </FieldContainer>
            </NumberFields>

            <InfoText>
              Add a mobile number to your MetaWear account. Your number will be
              stored with your account profile.
            </InfoText>

            {/* <SubmitButton type="submit">Change mobile number</SubmitButton> */}
            <Button buttonType={BUTTON_TYPE_CLASSES.edit} type="submit">
              Change mobile number
            </Button>
            {updated && (
              <SuccessMessage>
                Mobile number updated successfully.
              </SuccessMessage>
            )}
          </Form>
        </EditNumberBox>
      </EditNumberContainer>
    </EditNumberPage>
  );
};

export default EditNumber;
