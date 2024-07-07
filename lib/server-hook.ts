import { auth } from '@/auth';

export async function useUser() {
	const session  = await auth();
	return session?.user;
}

export async function useRole(){
	const session = await auth()
	return session?.user?.role
}