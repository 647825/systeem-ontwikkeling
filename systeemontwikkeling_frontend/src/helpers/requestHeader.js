import { useAuthStore } from "@/stores/auth";


export const requestHeader = () => {
    const authStore = useAuthStore();
    return {
        Authorization: `Bearer ${authStore.jwt}`,
    };
}