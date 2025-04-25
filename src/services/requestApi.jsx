async function getUser(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();

        if (!response.ok) {
            return data;
        }

        return data;

    } catch (error) {
        throw error;
    }
}

export { getUser };