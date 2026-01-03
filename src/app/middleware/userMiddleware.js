import { verifyToken } from "@/lib/jwt";

export function authMiddleware(handler) {
  return async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = verifyToken(token);
      req.user = decoded; // attach user info to request
      return handler(req, res); // call actual handler
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
}
