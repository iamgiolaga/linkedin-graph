import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

interface ErrorResponse {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void | ErrorResponse>
) {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie || "");
    const accessToken = cookies.access_token;

    if (!accessToken) {
      return res.status(401).json({ error: "No access token found" });
    }

    return res.status(200).json();
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
