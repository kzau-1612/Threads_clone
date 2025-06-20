export const MESSAGES = {
  AUTH: {
    LOGIN: {
      SUCCESS: "Login successful",
      FAILED: "Login failed",
      STATUS_401: "Incorrect username or password",
      STATUS_500: "Server error, please try again",
      STATUS_OTHER: "Cannot connect to server",
    },
    REGISTER: {
      // Status messages
      SUCCESS: "Account registration successful",
      FAILED: "Account registration failed",

      // Name validation
      NAME_REQUIRED: "Please enter your name",
      NAME_MIN_LENGTH: 4,
      NAME_MIN_LENGTH_MESSAGE: "Name must be at least 4 characters long",

      // Username validation
      USERNAME_REQUIRED: "Please enter a username",
      USERNAME_MIN_LENGTH: 4,
      USERNAME_MIN_LENGTH_MESSAGE: "Username must be at least 4 characters long",

      // Email validation
      EMAIL_REQUIRED: "Please enter your email",
      EMAIL_INVALID: "Invalid email format",

      // Phone validation
      PHONE_REQUIRED: "Please enter your phone number",
      PHONE_INVALID: "Invalid phone number format",

      // Password validation
      PASSWORD_MIN_LENGTH: 6,
      PASSWORD_MIN_LENGTH_MESSAGE: "Password must be at least 6 characters long",
      PASSWORD_INVALID:
        "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character",
      PASSWORD_NOT_MATCH: "Confirmation password does not match",
    },
    SEND_VERIFICATION_EMAIL: {
      SUCCESS: "Verification email sent successfully, please check your email",
      FAILED: "Failed to send verification email",
    },
    FORGOT_PASSWORD: {
      EMAIL_REQUIRED: "Please enter your email",
      EMAIL_INVALID: "Invalid email format",
      SUCCESS: "Password reset link sent successfully, please check your email",
      FAILED: "Failed to send password reset link",
    },
    RESET_PASSWORD: {
      SUCCESS: "Password reset successful",
      FAILED: "Password reset failed",
    },
  },
};
