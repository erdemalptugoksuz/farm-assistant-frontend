'use client';

import { Button } from '@/components/ui/button';
import '../components/globals.css';

const page = () => {
  const handleCreate = () => {
    fetch('/api/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify({
        name: 'NextJS',
        email: 'nextjs@frontend1.com',
        password: 'password',
      }),
    }).then((response) => {
      console.log(response);
    });
  };

  const handleLogin = () => {
    fetch('/api/auth/sign-in', {
      method: 'POST',
      body: JSON.stringify({
        email: 'nextjs@frontend1.com',
        password: 'password',
      }),
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      <Button onClick={handleCreate}>Create</Button>
      <Button onClick={handleLogin}>lOGİN</Button>
    </div>
  );
};

export default page;
