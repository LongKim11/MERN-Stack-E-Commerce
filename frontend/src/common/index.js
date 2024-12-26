const backendDomain = "http://localhost:8080";

const summaryAPI = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "POST",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "POST",
  },
  signOut: {
    url: `${backendDomain}/api/signout`,
    method: "GET",
  },
  currentUser: {
    url: `${backendDomain}/api/user-details`,
    method: "GET",
  },
  allUsers: {
    url: `${backendDomain}/api/all-users`,
    method: "GET",
  },
  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: "POST",
  },
};

export default summaryAPI;
