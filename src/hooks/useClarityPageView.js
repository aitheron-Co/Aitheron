import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useClarityPageView() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (window.clarity) {
      window.clarity("event", "pageview");
    }
  }, [pathname, search, hash]);
}
