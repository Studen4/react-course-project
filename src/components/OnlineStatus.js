let onlineUsers = [];

export const addUserToOnlineList = (username) => {
    onlineUsers.push(username);
};
export const removeUserFromOnlineList = (username) => {
    onlineUsers = onlineUsers.filter(user => user !== username);
};

export const getOnlineUsersCount = () => {
    return onlineUsers.length;
};
  
  export const getCurrentTimeInKyiv = () => {
    const currentTime = new Date();

    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  
    return formattedTime;
  };