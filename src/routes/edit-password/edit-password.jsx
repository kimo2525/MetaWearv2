import { useState } from "react";
import { useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import { changeUserPassword } from "../../utils/supabase/supabase.utils";

import {
  EditPasswordPage,
  EditPasswordContainer,
  Title,
  PasswordBox,
  Description,
  Form,
  FieldContainer,
  Label,
  PasswordInput,
  ErrorMessage,
  SuccessMessage,
  SecuritySection,
  SecurityTitle,
  SecurityLink,
} from "./edit-password.styles";

import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../components/button/button.component";
import BreadCrumb from "../../components/bread-crumb/bread-crumb.compnent";

const EditPassword = () => {
  const currentUser = useSelector(selectCurrentUser);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const changePasswordHandler = async (event) => {
    event.preventDefault();

    setErrorMessage("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("Password must contain at least 6 characters.");
      return;
    }

    try {
      await changeUserPassword(currentUser.email, currentPassword, newPassword);

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setSuccess(true);
    } catch (error) {
      setErrorMessage(error.message || "Unable to change password.");
    }
  };

  return (
    <EditPasswordPage>
      <EditPasswordContainer>
        <BreadCrumb
          links={[
            { label: "Your Account", href: "/youraccount" },
            { label: "Change Mobile Phone Number", href: "" },
          ]}
        />
        <br />
        <Title>Change password</Title>
        <PasswordBox>
          <Description>
            Use the form below to change the password for your MetaWear account.
          </Description>
          <Form onSubmit={changePasswordHandler}>
            <FieldContainer>
              <Label htmlFor="currentPassword">Current password:</Label>
              <PasswordInput
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                required
              />
            </FieldContainer>
            <FieldContainer>
              <Label htmlFor="newPassword">New password:</Label>
              <PasswordInput
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                required
              />
            </FieldContainer>
            <FieldContainer>
              <Label htmlFor="confirmPassword">Reenter new password:</Label>
              <PasswordInput
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </FieldContainer>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            {success && (
              <SuccessMessage>Password changed successfully.</SuccessMessage>
            )}
            <Button buttonType={BUTTON_TYPE_CLASSES.edit} type="submit">
              Save changes
            </Button>
          </Form>
        </PasswordBox>
      </EditPasswordContainer>
    </EditPasswordPage>
  );
};

export default EditPassword;
