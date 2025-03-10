import { apiRequest } from "@/config/axios";
import { TCalcShippingSchema } from "@workspace/shared/schemas/shipping";

export const getProducts = async (
  params?: TSearchParams
): Promise<FilteredProductsResponse> => {
  const response = await apiRequest("GET", "/products", { params });
  return response.data;
};

export const getProduct = async (productId: string): Promise<IProduct> => {
  const response = await apiRequest("GET", `/products/${productId}`);
  return response.data.product as IProduct;
};

export const getCategories = async (): Promise<ICategory[]> => {
  const response = await apiRequest("GET", "/products/categories");
  return response.data.categories;
};

export const getAttributes = async (
  categories?: string[]
): Promise<IAttribute[]> => {
  const response = await apiRequest("GET", "/products/attributes", {
    params: { categories },
  });
  return response.data.attributes;
};

export const getCurrencyInfo = async (
  currency?: string
): Promise<ICurrencyOption> => {
  const response = await apiRequest("GET", `/products/currency/${currency}`);
  return response.data.currencyInfo;
};

export const getAllCurrencies = async (): Promise<ICurrencyOption[]> => {
  const response = await apiRequest("GET", `/products/currency`);
  return response.data.currencies;
};

export const getShippingMethods = async (
  country: string
): Promise<IShippingMethod> => {
  const response = await apiRequest("GET", `/shipping/method`, {
    data: { country },
  });
  return response.data.shippingMethod;
};

export const calculateShipping = async (
  data: TCalcShippingSchema
): Promise<number> => {
  const response = await apiRequest("POST", `/shipping/calculate`, { data });
  return response.data.shippingCost;
};
