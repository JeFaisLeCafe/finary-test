import type { NextApiRequest, NextApiResponse } from "next";

export default function loginApi(req: NextApiRequest, res: NextApiResponse) {
  setTimeout(function () {
    if (req.body.email === "fake@finary.eu") {
      return res.status(200).json({ needMFA: false });
    }

    if (req.body.email === "fake2fa@finary.eu") {
      return res.status(200).json({ needMFA: true });
    }

    res.status(401).json({
      error: true,
      errorMessage: "Wrong login credentials. Please provide correct email."
    });
  }, 8000);
}
