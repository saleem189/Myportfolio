let config = {
  emailjs: {
    serviceID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    userID: import.meta.env.VITE_EMAILJS_USER_ID
  }
};

export default config;
