import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import postLogin, { PostLoginReturn } from "../../providers/login";
import poll from "../../utils/poll";
import validateEmail from "../../utils/validateEmail";
import MyButton from "../MyButton";
import MyInput from "../MyInput";
import { InputType } from "../MyInput/type";
import { useRouter } from "next/router";

const POLL_INTERVAL = 1000; // 1 second interval
const MAX_RETRY = 10;

interface IndexEmailInputProps {
  setNeedMFA: (e: boolean) => void;
}

const IndexEmailInput: React.FC<IndexEmailInputProps> = ({ setNeedMFA }) => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    setIsValid(validateEmail(email));

    return function cleanup() {
      mounted = false;
    }; // to not get "memory leak" type of error https://dev.to/otamnitram/react-useeffect-cleanup-how-and-when-to-use-it-2hbm
  }, [email]);

  const handleLoginClick = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = (await poll({
        fn: () => postLogin(email),
        validate: (response) => !!response,
        interval: POLL_INTERVAL,
        maxAttempts: MAX_RETRY
      })) as PostLoginReturn;
      if (res?.needMFA) {
        setNeedMFA(true);
      } else {
        router.push("/home");
      }
    } catch (e) {
      setErrorMessage(e.errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <p className="mt-3 text-2xl">Get started by login in</p>
      <div className="flex flex-1 flex-row flex-wrap justify-center items-center">
        <MyInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="picsou@finary.app"
          type={InputType.email}
        />
        <MyButton disabled={isLoading || !isValid} onClick={handleLoginClick}>
          {isLoading ? (
            <>
              <Loader type="TailSpin" color="#F1C086" height={22} width={22} />
              <p> </p>
            </>
          ) : (
            <p className="text-gray-finary">Log in</p>
          )}
        </MyButton>
      </div>

      {errorMessage && (
        <p className="mt-2 text-lg text-red-800">{errorMessage}</p>
      )}
    </div>
  );
};

export default IndexEmailInput;
