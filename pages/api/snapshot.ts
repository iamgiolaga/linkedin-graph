import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

interface ErrorResponse {
  error: string;
}

interface SuccessResponse {
  snapshotData: Object[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie || "");
    const accessToken = cookies.access_token;

    if (!accessToken) {
      return res.status(401).json({ error: "No access token found" });
    }

    try {
      const response = await fetch(
        "https://api.linkedin.com/rest/memberSnapshotData?q=criteria&domain=CONNECTIONS",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "LinkedIn-Version": process.env.LINKEDIN_VERSION || "",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { elements } = await response.json();

      const [{ snapshotData }] = elements;

      res.status(200).json({ snapshotData });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
