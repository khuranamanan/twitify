import { useLocation, useNavigate } from "react-router";
import { EyeFill, EyesInvisible, TwitifyFullLogo } from "../../assets/icons";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleSignUp } from "../../redux/slices/authSlice";
import useDocumentTitle from "../../hooks/useDocumentTitle";

function SignUpPage() {
  useDocumentTitle("Sign Up | Twitify");
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [signUpFormData, setSignUpFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [formInputError, setFormInputError] = useState();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  function handleSignUpFormSubmit(e) {
    e.preventDefault();

    //Username validation
    if (!signUpFormData.username.trim()) {
      setFormInputError("Error: Please enter a username.");
      return;
    } else if (signUpFormData.username.length < 3) {
      setFormInputError(
        "Error: Username should be at least 3 characters long."
      );
      return;
    } else if (!/^[a-zA-Z0-9_]+$/.test(signUpFormData.username)) {
      setFormInputError(
        "Error: Username can only contain alphanumeric characters and underscores."
      );
      return;
    }

    //Password Validation
    if (
      !signUpFormData.password.trim() ||
      !signUpFormData.confirmPassword.trim()
    ) {
      setFormInputError("Error: Please enter a password and confirm it.");
      return;
    } else if (signUpFormData.password.length < 8) {
      setFormInputError(
        "Error: Password should be at least 8 characters long."
      );
      return;
    } else if (signUpFormData.password !== signUpFormData.confirmPassword) {
      setFormInputError(
        "Error: Passwords do not match. Please ensure that the password and confirm password fields are the same."
      );
      return;
    }

    if (
      !signUpFormData.firstName.trim() ||
      !signUpFormData.lastName.trim() ||
      !signUpFormData.username.trim()
    ) {
      setFormInputError(
        "Error: Incomplete Form Submission. Please fill in all required fields."
      );
      return;
    }

    dispatch(
      handleSignUp({
        username: signUpFormData.username.trim(),
        password: signUpFormData.password.trim(),
        firstName: signUpFormData.firstName.trim(),
        lastName: signUpFormData.lastName.trim(),
      })
    );
  }

  const formInputErrorDisplay = formInputError && (
    <p className="text-red-500 text-xs text-center"> {formInputError} </p>
  );

  function handleShowPasswordBtnClick(passwordType) {
    if (showPassword[passwordType]) {
      setShowPassword({ ...showPassword, [passwordType]: false });
      return;
    }
    setShowPassword({ ...showPassword, [passwordType]: true });
  }

  const showPasswordIcon = showPassword.password ? (
    <EyesInvisible />
  ) : (
    <EyeFill />
  );

  const showConfirmPasswordIcon = showPassword.confirmPassword ? (
    <EyesInvisible />
  ) : (
    <EyeFill />
  );

  useEffect(() => {
    if (isLoggedIn) {
      navigate(location?.state?.from || "/", { replace: true });
    }
  }, [location?.state?.from, isLoggedIn, navigate]);

  return (
    <div className="min-h-[100dvh] w-full flex justify-center items-center p-3 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-blue-100 via-blue-200 to-cyan">
      <div className="bg-black flex flex-col gap-8 py-6 px-10 rounded-xl h-[90%] w-full max-w-md border-2 border-solid border-darkerGray">
        <div className="px-3 flex justify-center">
          <TwitifyFullLogo />
        </div>

        <form
          className="w-full flex flex-col justify-around gap-4 items-center grow"
          onSubmit={handleSignUpFormSubmit}
        >
          <h1 className="text-white text-3xl font-inter font-bold uppercase">
            Sign Up
          </h1>
          <div className="flex flex-col gap-4 w-full mb-1">
            <div className="flex gap-2">
              <input
                type="text"
                className="w-full rounded-md p-2 text-black"
                placeholder="First Name"
                onChange={(e) =>
                  setSignUpFormData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
                required
              />
              <input
                type="text"
                className="w-full rounded-md p-2 text-black"
                placeholder="Last Name"
                onChange={(e) =>
                  setSignUpFormData((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
                required
              />
            </div>

            <input
              type="text"
              className="w-full rounded-md p-2 text-black"
              placeholder="Username"
              onChange={(e) =>
                setSignUpFormData((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
              required
            />
            <div className="flex shrink justify-between gap-2 items-center w-full">
              <input
                type={showPassword.password ? "text" : "password"}
                className="rounded-md w-full p-2 text-black"
                placeholder="Create Password"
                onChange={(e) =>
                  setSignUpFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                required
              />
              <div
                className="h-full p-2 shrink aspect-square bg-snow text-black flex justify-center items-center rounded-md cursor-pointer"
                onClick={() => handleShowPasswordBtnClick("password")}
              >
                {showPasswordIcon}
              </div>
            </div>
            <div className="flex shrink justify-between gap-2 items-center w-full">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                className="rounded-md w-full p-2 text-black"
                placeholder="Confirm Password"
                onChange={(e) =>
                  setSignUpFormData((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }))
                }
                required
              />
              <div
                className="h-full p-2 shrink aspect-square bg-snow text-black flex justify-center items-center rounded-md cursor-pointer"
                onClick={() => handleShowPasswordBtnClick("confirmPassword")}
              >
                {showConfirmPasswordIcon}
              </div>
            </div>
          </div>

          <button
            className="bg-snow text-md uppercase p-2 w-full rounded-full text-black font-semibold hover:bg-white"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        <span className=" h-3">{formInputErrorDisplay}</span>

        <div className="text-md text-center">
          Existing user?{" "}
          <button
            onClick={() =>
              navigate("/login", {
                state: { from: location?.state?.from || "/" },
              })
            }
            className="text-aqua font-semibold hover:underline"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
