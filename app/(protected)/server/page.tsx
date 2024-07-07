import { UserInfo } from '@/components/user-info';
import { useUser } from '@/lib/server-hook';

export default async function ServerPage() {
	const user = await useUser();
	return <UserInfo user={user} label='Server component'/>
}
