import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import { setCurrentUser } from "../../store/user/user.action";

import { updateUserAddress } from "../../utils/supabase/supabase.utils";

import {
  EditAddressPage,
  EditAddressContainer,
  Title,
  AddressForm,
  FieldContainer,
  Label,
  Input,
  MobileContainer,
  CountryCodeSelect,
  HelperText,
  SectionTitle,
  RadioContainer,
  RadioOption,
  DefaultAddress,
  ErrorMessage,
  SuccessMessage,
} from "./edit-address.styles";

import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../components/button/button.component";
import BreadCrumb from "../../components/bread-crumb/bread-crumb.compnent";

const defaultFormFields = {
  fullName: "",
  mobileNumber: "",
  streetName: "",
  buildingNumber: "",
  city: "",
  district: "",
  governorate: "",
  landmark: "",
  addressType: "home",
};

const EditAddress = () => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const [countryCode, setCountryCode] = useState("+20");

  const [formFields, setFormFields] = useState(defaultFormFields);

  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    fullName,
    mobileNumber,
    streetName,
    buildingNumber,
    city,
    district,
    governorate,
    landmark,
    addressType,
  } = formFields;

  useEffect(() => {
    setFormFields({ ...currentUser });
  }, [currentUser?.uid]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields((previousFields) => ({
      ...previousFields,
      [name]: value,
    }));
    setSuccess(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccess(false);

    try {
      const cleanMobileNumber = mobileNumber.replace(/\D/g, "");

      const fullMobileNumber = `${countryCode}${cleanMobileNumber}`;

      const address = {
        fullName,
        mobileNumber: fullMobileNumber,
        streetName,
        buildingNumber,
        city,
        district,
        governorate,
        landmark,
        addressType,
      };

      const profile = await updateUserAddress(currentUser.uid, address);

      dispatch(
        setCurrentUser({
          ...currentUser,

          displayName: profile.display_name,
          mobileNumber: profile.mobile_number,

          streetName: profile.street_name,
          buildingNumber: profile.building_number,
          city: profile.city,
          district: profile.district,
          governorate: profile.governorate,
          landmark: profile.landmark,
          addressType: profile.address_type,
        }),
      );

      setSuccess(true);
    } catch (error) {
      console.error(error);

      setErrorMessage(error.message || "Unable to update address.");
    }
  };

  return (
    <EditAddressPage>
      <EditAddressContainer>
        <BreadCrumb
          links={[
            { label: "Your Account", href: "/youraccount" },
            { label: "Edit your address", href: "" },
          ]}
        />
        <br />
        <Title>Edit your address</Title>

        <AddressForm onSubmit={handleSubmit}>
          <FieldContainer>
            <Label htmlFor="fullName">Full name (First and Last name)</Label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              value={fullName}
              onChange={handleChange}
              required
            />
          </FieldContainer>

          <FieldContainer>
            <Label htmlFor="mobileNumber">Mobile number</Label>

            <MobileContainer>
              <CountryCodeSelect
                value={countryCode}
                onChange={(event) => setCountryCode(event.target.value)}
              >
                <option value="+20">EG +20</option>
                <option value="+1">US +1</option>
                <option value="+44">UK +44</option>
                <option value="+49">DE +49</option>
              </CountryCodeSelect>
              <Input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                value={mobileNumber}
                onChange={handleChange}
                required
              />
            </MobileContainer>

            <HelperText>May be used to assist delivery</HelperText>
          </FieldContainer>

          <FieldContainer>
            <Label htmlFor="streetName">Street name</Label>

            <Input
              id="streetName"
              name="streetName"
              type="text"
              value={streetName}
              onChange={handleChange}
              required
            />
          </FieldContainer>

          <FieldContainer>
            <Label htmlFor="buildingNumber">Building name/no</Label>

            <Input
              id="buildingNumber"
              name="buildingNumber"
              type="text"
              value={buildingNumber}
              onChange={handleChange}
              required
            />
          </FieldContainer>

          <FieldContainer>
            <Label htmlFor="city">City/Area</Label>

            <Input
              id="city"
              name="city"
              type="text"
              value={city}
              onChange={handleChange}
              required
            />

            <HelperText>
              Can't find your city/area? Try a different spelling
            </HelperText>
          </FieldContainer>

          <FieldContainer>
            <Label htmlFor="district">District</Label>

            <Input
              id="district"
              name="district"
              type="text"
              value={district}
              onChange={handleChange}
              required
            />
          </FieldContainer>

          <FieldContainer>
            <Label htmlFor="governorate">Governorate</Label>

            <Input
              id="governorate"
              name="governorate"
              type="text"
              value={governorate}
              onChange={handleChange}
              required
            />
          </FieldContainer>

          <FieldContainer>
            <Label htmlFor="landmark">Nearest landmark</Label>

            <Input id="landmark" name="landmark" type="text" value={landmark} />
          </FieldContainer>

          <SectionTitle>Add delivery instructions</SectionTitle>

          <Label>Address type</Label>

          <RadioContainer>
            <RadioOption>
              <input
                type="radio"
                name="addressType"
                value="home"
                checked={addressType === "home"}
                onChange={handleChange}
              />

              <span>Home</span>
            </RadioOption>

            <RadioOption>
              <input
                type="radio"
                name="addressType"
                value="office"
                checked={addressType === "office"}
                onChange={handleChange}
              />

              <span>Office</span>
            </RadioOption>
          </RadioContainer>

          <DefaultAddress>
            <input type="checkbox" checked disabled />

            <span>Use as my default address</span>
          </DefaultAddress>

          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

          {success && (
            <SuccessMessage>Address updated successfully.</SuccessMessage>
          )}

          <Button type="submit" buttonType={BUTTON_TYPE_CLASSES.edit}>
            Update address
          </Button>
        </AddressForm>
      </EditAddressContainer>
    </EditAddressPage>
  );
};

export default EditAddress;
