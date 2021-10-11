// https://levelup.gitconnected.com/polling-in-javascript-ab2d6378705a

interface PollProps {
  fn: any;
  validate: any;
  interval?: number; //in millisec
  maxAttempts?: number;
}

const poll = async ({
  fn,
  validate,
  interval = 1000,
  maxAttempts = 10
}: PollProps) => {
  let attempts = 0;

  const executePoll = async (resolve: any, reject: any) => {
    const result = await fn();
    attempts++;

    if (result.error) {
      console.error("Error in Request");
      return reject(result);
    }

    if (validate(result)) {
      return resolve(result);
    } else if (maxAttempts && attempts === maxAttempts) {
      console.error("Exceeded max attempts");
      return reject(result);
    } else {
      setTimeout(executePoll, interval, resolve, reject);
    }
  };

  return new Promise(executePoll);
};

export default poll;
