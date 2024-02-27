import { Profile } from '@/widgets';
import { withAuthGuard } from '@/app/providers/router/withAuthGuard';

export const ProfilePage = withAuthGuard(() => {
  return <Profile />;
});
