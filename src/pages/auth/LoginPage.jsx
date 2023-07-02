import { useState } from "react";
import { EyeFill, EyesInvisible, TwitifyFullLogo } from "../../assets/icons";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleLogIn } from "../../redux/slices/authSlice";
import useDocumentTitle from "../../hooks/useDocumentTitle";

function LoginPage() {
  useDocumentTitle("Log In | Twitify");
  const [logInFormData, setLogInFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [formInputError, setFormInputError] = useState();
  const [showPassword, setShowPassword] = useState();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleLogInFormSubmit(event) {
    event.preventDefault();
    if (!logInFormData.username.trim() || !logInFormData.password.trim()) {
      setFormInputError(
        "Error: Incomplete Form Submission. Please fill in all required fields."
      );
      return;
    }
    dispatch(
      handleLogIn({
        username: logInFormData?.username?.trim(),
        password: logInFormData?.password?.trim(),
      })
    );
  }

  const formInputErrorDisplay = formInputError && (
    <p className="text-red-500 text-xs text-center"> {formInputError} </p>
  );

  function handleShowPasswordBtnClick() {
    if (showPassword) {
      setShowPassword(false);
      return;
    }
    setShowPassword(true);
  }

  const showPasswordIcon = showPassword ? <EyesInvisible /> : <EyeFill />;

  useEffect(() => {
    if (isLoggedIn) {
      navigate(location?.state?.from || "/", { replace: true });
    }
  }, [isLoggedIn, navigate, location]);

  return (
    <div className="min-h-[100dvh] w-full flex justify-center items-center p-3 bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-blue-100 via-blue-200 to-cyan">
      <div className="bg-black flex flex-col gap-8 py-6 px-10 rounded-xl h-[90%] w-full max-w-md border-2 border-solid border-darkerGray">
        <div className="px-3 flex justify-center">
          <TwitifyFullLogo />
        </div>
        <form
          className="w-full flex flex-col justify-around gap-4 items-center grow"
          onSubmit={handleLogInFormSubmit}
        >
          <h1 className="text-white text-3xl font-inter font-bold uppercase">
            Log In
          </h1>
          <div className="flex flex-col gap-4 w-full mb-1">
            <input
              className="w-full rounded-md p-2 text-black"
              type="text"
              placeholder="Username"
              value={logInFormData.username}
              onChange={(e) =>
                setLogInFormData((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
            />
            <div className="flex shrink justify-between gap-2 items-center w-full">
              <input
                className="rounded-md w-full p-2 text-black"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={(e) =>
                  setLogInFormData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                value={logInFormData.password}
              />
              <div
                className="h-full p-2 shrink aspect-square bg-snow text-black flex justify-center items-center rounded-md cursor-pointer"
                onClick={handleShowPasswordBtnClick}
              >
                {showPasswordIcon}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <button
              className="bg-snow text-md uppercase p-2 w-full rounded-full text-black font-semibold hover:bg-white"
              type="submit"
            >
              Log In
            </button>
            <button
              className="bg-snow text-md uppercase p-2 w-full rounded-full text-black font-semibold hover:bg-white"
              type="submit"
              onClick={() =>
                setLogInFormData({
                  username: "manankhurana",
                  password: "manan",
                })
              }
            >
              Log In with Test Credentials
            </button>
          </div>
        </form>

        <span className=" h-3">{formInputErrorDisplay}</span>
        <div className="text-md text-center">
          New user?{" "}
          <button
            onClick={() =>
              navigate("/signup", {
                state: { from: location?.state?.from || "/" },
              })
            }
            className="text-aqua font-semibold hover:underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
