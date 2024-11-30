// useClientRouter.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useClientRouter = () => {
  const [router, setRouter] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setRouter(useRouter());
    }
  }, [isMounted]);

  return router;
};

export default useClientRouter;