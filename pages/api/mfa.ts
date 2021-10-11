import type { NextApiRequest, NextApiResponse } from "next";

export default function mfaApi(req: NextApiRequest, res: NextApiResponse) {
  setTimeout(function () {
    if (req.body.MFA === "123456") {
      return res.status(200).json({ login: true });
    }

    res.status(401).json({
      error: true,
      errorMessage: "Wrong MFA code. Please provide correct MFA code."
    });
  }, 2000);
}
