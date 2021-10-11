import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import postMFA, { PostMFAReturn } from "../../providers/mfa";
import poll from "../../utils/poll";
import MyButton from "../MyButton";
import MyInput from "../MyInput";
import { InputType } from "../MyInput/type";

const POLL_INTERVAL = 1000; // 1 second interval
const MAX_RETRY = 10;

const IndexMFAInput: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [MFA, setMFA] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    setIsValid(MFA.length === 6);

    return function cleanup() {
      mounted = false;
    }; // to not get "memory leak" type of error https://dev.to/otamnitram/react-useeffect-cleanup-how-and-when-to-use-it-2hbm
  }, [MFA]);

  const router = useRouter();

  const handleLoginClick = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = (await poll({
        fn: () => postMFA(MFA),
        validate: (response) => !!response,
        interval: POLL_INTERVAL,
        maxAttempts: MAX_RETRY
      })) as PostMFAReturn;
      if (res?.login === true) {
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
      <p className="mt-3 text-2xl">Please provide the MFA code</p>
      <div className="flex flex-1 flex-row flex-wrap justify-center items-center">
        <MyInput
          maxLength={6}
          value={MFA}
          onChange={(e) => setMFA(e.target.value)}
          placeholder="123456"
          type={InputType.text}
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

export default IndexMFAInput;
