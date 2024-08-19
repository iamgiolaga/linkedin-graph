import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const Callback: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const { code } = router.query;

    if (typeof code === "string") {
      const exchangeCodeForToken = async () => {
        try {
          const response = await fetch("/api/auth/code", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          router.push("/");
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          }
        } finally {
          setLoading(false);
        }
      };

      exchangeCodeForToken();
    }
  }, [router, router.query]);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#fbfbfb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading && (
        <Image
          src="/loading.gif"
          width={0}
          height={0}
          style={{ width: "100%", height: "auto" }}
          alt="Loading"
        />
      )}
      {error && <h1>Something went wrong :(</h1>}
    </div>
  );
};

export default Callback;
