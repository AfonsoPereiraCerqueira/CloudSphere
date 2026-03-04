import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:5000/api/users";
const CART_API = "http://localhost:5000/api/cart";
const PLAN_API = "http://localhost:5000/api/plan";
const DESCOUNT_API = "http://localhost:5000/api/descount";
const API_EMPLOYEE_URL = "http://localhost:5000/api/employees";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,
  descount: null,
  haveSubscription: false,
  searchedUser: null,
  isCheckingSubscription: false,
  isCheckingUserFoundSubscription: false,
  UserFoundhaveSubscription: false,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/register`, {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error sending reset email",
        isLoading: false,
      });
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "Error resetting password",
        isLoading: false,
      });
      throw error;
    }
  },

  checkActiveSubscription: async (UserID) => {
    set({ isLoading: true, isCheckingSubscription: true, error: null });
    try {
      const response = await axios.post(`http://localhost:5000/api/pay/verify-subscription`, {
        UserID: UserID,
      });

      if (response.data.success) {
        set({ haveSubscription: true, isLoading: false, isCheckingSubscription: false });
      }

      return response.data.success;
    } catch (error) {
      set({ 
        isLoading: false,
        isCheckingSubscription: false,
        haveSubscription: false,
      });
      throw error;
    }
  },

  checkUserActiveSubscription: async (UserID) => {
    set({ isLoading: true, isCheckingUserFoundSubscription: true, error: null });
    try {
      const response = await axios.post(`http://localhost:5000/api/pay/verify-subscription`, {
        UserID: UserID,
      });

      if (response.data.success) {
        set({ UserFoundhaveSubscription: true, isLoading: false, isCheckingUserFoundSubscription: false });
      }

      return response.data.success;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying subscription",
        isLoading: false,
        isCheckingUserFoundSubscription: false,
        UserFoundhaveSubscription: false,
      });
      throw error;
    }
  },

  searchUserByName: async (name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/name/`, {
        name: name
      });
      set({ searchedUser: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message || "Error searching user", isLoading: false });
      throw error;
    }
  },

  cancelSub: async (subIdPayPal, subIdDB) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`http://localhost:5000/api/pay/cancel`, {
        subId: subIdPayPal,
      });

      if (response.data.success) {
        const cancelResponse = await axios.post(`http://localhost:5000/api/pay/cancel-subscription`, {
            subscriptionID: subIdDB,
          }
        )

        set({ haveSubscription: false })
      }

      window.location.href = "/";

      toast.success("Subscription canceled");

      set({ message: response.message, isLoading: false});
    } catch (error) {
      set({ error: error.response.data.message || "Error canceling subscription", isLoading: false });
      throw error;
    }
  }
}));

export const useCartStore = create((set) => ({
  plan: null,
  error: null,
  message: null,
  cartItems: null,
  planInfo: null,
  paymentInfo: null,
  recipe: null,

  getCart: async (userId) => {
    set({ error: null });
    try {
      const response = await axios.post(`${CART_API}`, {
        userId: userId,
      });

      const responseInfo = await axios.post(`${CART_API}/getPlanInfo`, {
        userId: userId,
        planId: response.data.cartItem.planId,
      });

      set({
        message: response.data.message,
        cartItems: response.data.cartItem,
        planInfo: responseInfo.data.plan,
      });
    } catch (error) {
      set({ error: error.response.data.message || "Error getting cart" });
      throw error;
    }
  },

  addToCart: async (userId, planName) => {
    set({ error: null });
    try {

      const responsePlan = await axios.post(`${PLAN_API}/name/`, {
        planName: planName,
      });

      const response = await axios.post(`${CART_API}/add`, {
        userId: userId,
        planId: responsePlan.data._id,
        quantity: 1,
      });

      if (response.data.success) {
        toast.success("Added to cart");
        set({ plan: responsePlan.data });
      }
    } catch (error) {
      set({ error: error.response.data.message || "Error adding to cart" });
      toast.error("You already have a plan in your cart");
      throw error;
    }
  },

  removeFromCart: async (userId, planId) => {
    set({ error: null });
    try {
      const response = await axios.post(`${CART_API}/remove`, {
        userId: userId,
        planId: planId,
      });
      set({ message: response.data.message });
    } catch (error) {
      set({ error: error.response.data.message || "Error removing from cart" });
      throw error;
    }
  },

  descountCode: async (code) => {
    set({ error: null });
    try {
      const response = await axios.post(`${DESCOUNT_API}/verify`, {
        descountName: code,
      });

      set({ message: response.data.message, descount: response.data.descountPercentage });
      return response.data.descount.descountPercentage;
    } catch (error) {
      set({ error: error.response.data.message || "Error applying discount" });
      throw error;
    }
  },

  paymentComplete: async (paymentData, user, name) => {
    set({ error: null });
    try {


      const response = await axios.post(`http://localhost:5000/api/pay/create-subscription`, {
        UserID: user,
        planId: paymentData.data.plan_id,
        subId: paymentData.data.id,
        startDate: paymentData.data.start_time,
        expireAt: paymentData.data.billing_info.next_billing_time,
        status: paymentData.data.status,
        paymentValue: paymentData.data.billing_info.last_payment.amount.value,
      })

      const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // AAAAMMDD
      const randomPart = Math.floor(1000 + Math.random() * 9000); // 4 dígitos aleatórios
      const recipeNumber = `INV-${datePart}-${randomPart}`;

      const responseRecipe = await axios.post(
        `http://localhost:5000/api/recipes/create-recipe`,
        {
          userId: user,
          subId: paymentData.data.id,
          recipeNumber: recipeNumber,
          recipePaymentId: response.data._id,
          recipeName: name,
          recipePrice: paymentData.data.billing_info.last_payment.amount.value,
          recipeSubscriptionId: paymentData.data.id,
          recipeStartDate: paymentData.data.start_time,
          recipeExpireAt: paymentData.data.billing_info.next_billing_time,
          recipeNextPayment: paymentData.data.billing_info.next_billing_time,
        }
      );

      set({ paymentInfo: paymentData, recipe: responseRecipe.data });
      return paymentData;
    } catch (error) {
      set({ error: error.response.data.message || "Error completing payment" });
      throw error;
    }
  },

  getRecipe: async (subId) => {
    set({ error: null });
    try {
      const response = await axios.post(`http://localhost:5000/api/recipes/get-recipe`, {
        subId: subId,
      });

      set({ recipe: response.data.recipe });
    } catch (error) {
      set({ error: error.response.data.message || "Error getting recipe" });
      throw error;
    }
  }
}));

export const useAdminStore = create((set) => ({
  employee: null,
  isAuthenticatedEmployee: false,
  error: null,
  isLoading: false,
  isCheckingAuthEmployee: true,
  message: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_EMPLOYEE_URL}/login`, {
        email,
        password,
      });
      set({
        isAuthenticatedEmployee: true,
        employee: response.data.employee,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  checkAuthEmployee: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_EMPLOYEE_URL}/check-auth`);
      set({
        employee: response.data.employee,
        isAuthenticatedEmployee: true,
        isCheckingAuthEmployee: false,
      });
    } catch (error) {
      set({ error: null, isCheckingAuthEmployee: false, isAuthenticatedEmployee: false });
    }
  },

  logoutEmployee: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_EMPLOYEE_URL}/logout`);
      set({
        employee: null,
        isAuthenticatedEmployee: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

}));

export const useDashboardStore = create((set) => ({

  allUsers: null,
  allEmployees: null,
  allSubscriptions: null,
  singleSubscription: null,
  singleSubscriptionFound: false,
  searchedEmployee: null,
  isLoading: false,
  error: null,
  message: null,

  getAllUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/`);
      set({ allUsers: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message || "Error getting all users", isLoading: false });
      throw error;
    }
  },

  getAllEmployees: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_EMPLOYEE_URL}/`);
      set({ allEmployees: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message || "Error getting all employees", isLoading: false });
      throw error;
    }
  },

  getSingleSubscriptionByUserId: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`http://localhost:5000/api/subscription/userId/`, {
        userId: userId,
      });
      set({ singleSubscription: response.data, isLoading: false, singleSubscriptionFound: true });
    } catch (error) {
      set({ error: error || "Error getting single subscription", isLoading: false, singleSubscriptionFound: false });
      throw error;
    }
  },

  searchEmployeeByName: async (name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`http://localhost:5000/api/employees/name`, {
        name: name
      });
      set({ searchedEmployee: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message || "Error searching employee", isLoading: false });
      throw error;
    }
  },

  desactivateUser: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/desactivate-user`, {
        id: userId,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message || "Error desactivating user", isLoading: false });
      throw error;
    }
  },

  activateUser: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/activate-user`, {
        id: userId,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message || "Error activating user", isLoading: false });
      throw error;
    }
  },

  desactivateEmployee: async (employeeId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_EMPLOYEE_URL}/desactivate-employee`, {
        id: employeeId,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message || "Error desactivating employee", isLoading: false });
      throw error;
    }
  },

  activateEmployee: async (employeeId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_EMPLOYEE_URL}/activate-employee`, {
        id: employeeId,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message || "Error activating employee", isLoading: false });
      throw error;
    }
  },

  getAllSubscriptions: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`http://localhost:5000/api/subscription/`);

      set({ allSubscriptions: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message || "Error getting all subscriptions", isLoading: false });
      throw error;      
    }
  },

}));

export const useManageStore = create((set) => ({

  isLoading: false,
  error: null,
  message: null,


  manageSubscription: async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/pay/manage-subscriptions`);
      set({ message: response.data.message});
    } catch (error) {
      set({ error: error.response.data.message || "Error managing subscriptions" });
      throw error;
    }
  }


}));

export const useVPSStore = create((set) => ({
  vps: null,
  error: null,
  message: null,
  isLoading: false,

  createVPS: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`http://localhost:5000/api/vps/create-vps`, {
        UserId: userId,
      });

      set({ vps: response.data.vps, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message || "Error creating VPS", isLoading: false });
      throw error;
    }
  },

  getVPS: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`http://localhost:5000/api/vps/get-vps`, {
        userId: userId,
      });

      set({ vps: response.data, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response.data.message || "Error getting VPS", isLoading: false });
      throw error;
    }
  },

  turnVPSOff: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `http://localhost:5000/api/vps/turn-off-vps`,
        {
          userId: userId,
        }
      );

      set({ vps: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message || "Error turning off VPS", isLoading: false });
      throw error;
    }
  },

  turnVPSOn: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `http://localhost:5000/api/vps/turn-on-vps`,
        {
          userId: userId,
        }
      );

      set({ vps: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message || "Error turning on VPS", isLoading: false });
      throw error;
    }
  },

  rebootVPS: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `http://localhost:5000/api/vps/reboot-vps`,
        {
          userId: userId,
        }
      );

      set({ vps: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message || "Error rebooting VPS", isLoading: false });
      throw error;
    }
  }

}));

export const useSubscriptionStore = create((set) => ({
  subscription: null,
  error: null,
  message: null,
  isLoading: false,

  verifySubscription: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`http://localhost:5000/api/pay/verify-subscription`, {
        UserID: userId,
      });

      set({ subscription: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message || "Error verifying subscription", isLoading: false });
      throw error;
    }
  },

  upgradeSubscription: async (subId, newPlanId) => {
    set({ isLoading: true, error: null });

    try {
      
      const response = await axios.post(`http://localhost:5000/api/pay/upgrade`, {
        subId: subId,
        newPlanId: newPlanId,
      });

      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({ error: error.response.data.message || "Error upgrading subscription", isLoading: false });
      throw error;
    }
  },

}));