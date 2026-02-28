export function todayPath(): string {
	const today = new Date();
	return `/day/${today.getMonth() + 1}/${today.getDate()}`;
}
