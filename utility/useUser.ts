
export function useUser(){
    return localStorage.getItem('user') || null
}