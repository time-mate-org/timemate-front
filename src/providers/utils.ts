import psl, { ParsedDomain } from "psl";

export const redirectToSubdomain = ({
  subdomain,
  token,
}: {
  subdomain: string;
  token: string;
}) => {
  const parsedDomain = psl.parse(window.location.hostname) as ParsedDomain;
  const isLocalHost = parsedDomain.domain?.includes("localhost");
  const timemateSubdomain = isLocalHost ? subdomain : `${subdomain}.timemate`;
  window.location.href = `${window.location.protocol}//${timemateSubdomain}.${isLocalHost ? "localhost:5173" : parsedDomain.domain}/dashboard?token=${token}`;
};
