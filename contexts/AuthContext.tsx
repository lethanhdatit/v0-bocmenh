"use client";

import type React from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { apiClient } from "@/lib/api/apiClient";
import type { UserSession } from "@/lib/session/sessionOptions";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useMyFates } from "@/contexts/MyFatesContext";

interface PromptLoginOptions {
  onLoginSuccess?: () => Promise<void> | void;
  redirectTo?: string;
  preserveState?: boolean;
}

type AuthModalType = "login" | "register" | "forgot-password" | null;

interface AuthContextType {
  user: UserSession | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<AuthResult>;
  register: (
    name: string,
    email: string,
    password: string,
    confirmPassword?: string
  ) => Promise<AuthResult>;
  logout: () => Promise<void>;
  refreshUser: (forceRefresh?: boolean) => Promise<void>;

  // Modal management
  activeModal: AuthModalType;
  openLoginModal: (options?: PromptLoginOptions) => void;
  openRegisterModal: (options?: PromptLoginOptions) => void;
  openForgotPasswordModal: () => void;
  closeAuthModal: () => void;

  // For modal callbacks
  onLoginSuccessCallback: (() => Promise<void> | void) | null | undefined;
  redirectToAfterLogin: string | null;
}

interface AuthResult {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
  user?: UserSession;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export let globalLogoutHandler: (() => void | Promise<void>) | null = null;

function setGlobalLogoutHandler(handler: typeof globalLogoutHandler) {
  globalLogoutHandler = handler;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthActionLoading, setIsAuthActionLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  
  // Safely get MyFates context, might be null during initialization
  const myFatesContext = useMyFates();
  const fetchMyFates = myFatesContext?.fetchMyFates;
  const setMyFates = myFatesContext?.setMyFates;

  const { t } = useTranslation();
  const router = useRouter();

  // Add a ref to track if we've already called fetchUserProfile
  const isInitializingRef = useRef(false);

  // Modal states
  const [activeModal, setActiveModal] = useState<AuthModalType>(null);
  const [onLoginSuccessCallback, setOnLoginSuccessCallback] = useState<
    (() => Promise<void> | void) | null | undefined
  >(null);
  const [redirectToAfterLogin, setRedirectToAfterLogin] = useState<
    string | null
  >(null);

  const fetchUserProfile = useCallback(async (forceRefresh = false) => {
    if (!forceRefresh && (hasInitialized || isInitializingRef.current)) {
      return;
    }
    isInitializingRef.current = true;
    setIsLoading(true);
    try {
      const response = await apiClient.get("/auth/profile");
      if (response.data.success && response.data.user) {
        setUser(response.data.user);
        // Call fetchMyFates if available
        if (fetchMyFates) {
          fetchMyFates();
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
      setHasInitialized(true);
      isInitializingRef.current = false;
    }
  }, []); // Remove all dependencies to prevent re-creation and cycles

  useEffect(() => {
    // Only run once on mount, ignore hasInitialized and fetchUserProfile dependencies
    fetchUserProfile();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const logout = useCallback(async (): Promise<void> => {
    setIsAuthActionLoading(true);
    try {
      await apiClient.post("/auth/logout");
      setUser(null);
      // Call setMyFates if available
      if (setMyFates) {
        setMyFates(0);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsAuthActionLoading(false);
    }
  }, []); // Remove setMyFates dependency to prevent cycles  // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setGlobalLogoutHandler(logout);
  }, [logout]);

  // Modal management functions
  const openLoginModal = useCallback((options?: PromptLoginOptions) => {
    setOnLoginSuccessCallback(
      options?.onLoginSuccess ? () => options.onLoginSuccess : null
    );
    setRedirectToAfterLogin(options?.redirectTo || null);
    setActiveModal("login");
  }, []);

  const openRegisterModal = useCallback((options?: PromptLoginOptions) => {
    setOnLoginSuccessCallback(
      options?.onLoginSuccess ? () => options.onLoginSuccess : null
    );
    setRedirectToAfterLogin(options?.redirectTo || null);
    setActiveModal("register");
  }, []);

  const openForgotPasswordModal = useCallback(() => {
    setActiveModal("forgot-password");
  }, []);

  const closeAuthModal = useCallback(() => {
    setActiveModal(null);
    setOnLoginSuccessCallback(null);
    setRedirectToAfterLogin(null);
  }, []);

  const login = async (
    email: string,
    password: string,
    rememberMe = false
  ): Promise<AuthResult> => {
    setIsAuthActionLoading(true);
    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
        rememberMe,
      });
      if (response.data.success && response.data.data) {
        setUser(response.data.data);

        if (fetchMyFates) {
          fetchMyFates();
        }

        // Handle success callbacks
        if (onLoginSuccessCallback) {
          await onLoginSuccessCallback();
        } else if (redirectToAfterLogin) {
          router.push(redirectToAfterLogin);
        }

        // Close modal and clear callbacks
        closeAuthModal();

        return {
          success: true,
          message: t("auth.login.loginSuccess"),
          user: response.data.data,
        };
      }
      return {
        success: false,
        message: response.data.message,
        errors: response.data.errors,
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      return {
        success: false,
        message: errorMessage,
        errors: error.response?.data?.errors,
      };
    } finally {
      setIsAuthActionLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    confirmPassword?: string
  ): Promise<AuthResult> => {
    setIsAuthActionLoading(true);
    try {
      const response = await apiClient.post("/auth/register", {
        name,
        email,
        password,
        confirmPassword,
      });
      if (response.data.success && response.data.data) {
        setUser(response.data.data);

        if (fetchMyFates) {
          fetchMyFates();
        }

        // Handle success callbacks
        if (onLoginSuccessCallback) {
          await onLoginSuccessCallback();
        } else if (redirectToAfterLogin) {
          router.push(redirectToAfterLogin);
        }

        // Close modal and clear callbacks
        closeAuthModal();

        return {
          success: true,
          message: t("auth.register.registerSuccess"),
          user: response.data.data,
        };
      }
      return {
        success: false,
        message: response.data.message || t("auth.register.registerFailed"),
        errors: response.data.errors,
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || t("auth.register.registerFailed")
      return { success: false, message: errorMessage, errors: error.response?.data?.errors }
    } finally {
      setIsAuthActionLoading(false);
    }
  };

  const value = {
    user,
    isLoggedIn: !!user,
    isLoading: isLoading || isAuthActionLoading,
    login,
    register,
    logout,
    refreshUser: (forceRefresh?: boolean) => fetchUserProfile(forceRefresh),

    // Modal management
    activeModal,
    openLoginModal,
    openRegisterModal,
    openForgotPasswordModal,
    closeAuthModal,

    // For modal callbacks
    onLoginSuccessCallback,
    redirectToAfterLogin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
