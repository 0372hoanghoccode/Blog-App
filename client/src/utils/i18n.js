import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Navigation
      home: "Home",
      about: "About",
      projects: "Projects",
      search: "Search",

      // Auth
      signIn: "Sign In",
      signUp: "Sign Up",
      signOut: "Sign out",
      profile: "Profile",

      // Header
      searchPlaceholder: "Search...",
      switchToDark: "Switch to dark mode",
      switchToLight: "Switch to light mode",

      // Dashboard
      dashboard: "Dashboard",
      createPost: "Create Post",
      updatePost: "Update Post",

      // Common
      loading: "Loading...",
      error: "Error occurred",
      success: "Success",
      confirm: "Confirm",
      cancel: "Cancel",

        // Sign In Page
        welcomeBack: "Welcome Back",
        email: "Email",
        password: "Password",
        signInButton: "Sign In",
        signingIn: "Signing in...",
        orContinueWith: "Or continue with",
        dontHaveAccount: "Don't have an account?",
        signUpHere: "Sign up here",
        pleaseFillAllFields: "Please fill all fields",

        // Sign Up Page
        createAccount: "Create Account",
        username: "Username",
        email: "Email",
        password: "Password",
        creatingAccount: "Creating account...",
        alreadyHaveAccount: "Already have an account?",
        signInHere: "Sign in here",
        pleaseFillAllFields: "Please fill all fields",
        registrationFailed: "Account created successfully but auto sign-in failed. Please sign in manually.",

      // Footer
      footerDescription:
        "Sharing knowledge, experiences, and passion in the world of technology and beyond.",
      followUs: "Follow us",
      legal: "Legal",
      privacyPolicy: "Privacy Policy",
      termsConditions: "Terms & Conditions",
      allRightsReserved: "All Rights Reserved",
      projects50: "50 projects 50 days",
      socialLinks: {
        github: "Github",
        discord: "Discord",
        facebook: "Facebook",
        instagram: "Instagram",
        twitter: "Twitter",
      },
    },
  },
  vi: {
    translation: {
      // Navigation
      home: "Trang chủ",
      about: "Giới thiệu",
      projects: "Dự án",
      search: "Tìm kiếm",

      // Auth
      signIn: "Đăng nhập",
      signUp: "Đăng ký",
      signOut: "Đăng xuất",
      profile: "Hồ sơ",

      // Header
      searchPlaceholder: "Tìm kiếm...",
      switchToDark: "Chuyển sang chế độ tối",
      switchToLight: "Chuyển sang chế độ sáng",

      // Dashboard
      dashboard: "Bảng điều khiển",
      createPost: "Tạo bài viết",
      updatePost: "Cập nhật bài viết",

      // Common
      loading: "Đang tải...",
      error: "Đã xảy ra lỗi",
      success: "Thành công",
      confirm: "Xác nhận",
      cancel: "Hủy",

      // Sign In Page
      welcomeBack: "Chào mừng bạn",
      email: "Email",
      password: "Mật khẩu",
      signInButton: "Đăng nhập",
      signingIn: "Đang đăng nhập...",
      orContinueWith: "Hoặc tiếp tục với",
      dontHaveAccount: "Chưa có tài khoản?",
      signUpHere: "Đăng ký tại đây",
      pleaseFillAllFields: "Vui lòng điền tất cả các trường",

      // Sign Up Page
    createAccount: "Tạo tài khoản",
    username: "Tên người dùng",
    email: "Email",
    password: "Mật khẩu",
    creatingAccount: "Đang tạo tài khoản...",
    alreadyHaveAccount: "Đã có tài khoản?",
    signInHere: "Đăng nhập tại đây",
    pleaseFillAllFields: "Vui lòng điền tất cả các trường",
    registrationFailed: "Tạo tài khoản thành công nhưng tự động đăng nhập thất bại. Vui lòng đăng nhập thủ công.",

      // Footer
      footerDescription:
        "Chia sẻ kiến thức, kinh nghiệm và niềm đam mê trong thế giới công nghệ và hơn thế nữa.",
      followUs: "Theo dõi",
      legal: "Pháp lý",
      privacyPolicy: "Chính sách bảo mật",
      termsConditions: "Điều khoản & Điều kiện",
      allRightsReserved: "Đã đăng ký Bản quyền",
      projects50: "50 dự án 50 ngày",
      socialLinks: {
        github: "Github",
        discord: "Discord",
        facebook: "Facebook",
        instagram: "Instagram",
        twitter: "Twitter",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
