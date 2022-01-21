import React, { useCallback } from 'react';
import { useRouter } from 'next/router';

import { Avatar, IconButton, Notification } from '@douyinfe/semi-ui';
import { req } from '@utils/request';
import { IconSearch, IconSignal } from '@douyinfe/semi-icons';

const UserNav = ({ profile }: any) => {
  const router = useRouter();

  const onLogout = useCallback(async () => {
    await req.post('/api/spotify/logout');
    Notification.success({ content: '已登出', duration: 5 });
    router.reload();
  }, [router]);

  return (
    <div className="px-4 py-2 rounde shadow-sm flex items-center justify-between bg-white sticky top-0">
      <Avatar size="small" onClick={onLogout}>
        {profile?.display_name?.[0] || ''}
      </Avatar>

      <div className="flex items-center justify-end">
        <IconButton
          size="large"
          onClick={() => router.push('/search')}
          icon={<IconSearch size="large" />}
        />
      </div>
    </div>
  );
};

export default UserNav;
