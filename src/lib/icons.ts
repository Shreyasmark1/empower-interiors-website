import {
  BedIcon,
  Cancel01Icon as CloseIcon,
  CheckmarkCircle01Icon as CheckCircleIcon,
  DeliveryTruck01Icon as TruckIcon,
  LampIcon,
  MinusSignIcon as MinusIcon,
  OfficeChairIcon,
  PlusSignIcon as PlusIcon,
  Search01Icon as SearchIcon,
  ShoppingCart01Icon as CartIcon,
  SparklesIcon as SparklesIcon,
  StarIcon as StarIcon,
  Tick01Icon as CheckIcon,
} from "hugeicons-react";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  Alert02Icon as ToastWarning,
  CheckmarkCircle02Icon as ToastSuccess,
  CustomerService01Icon as ContactIcon,
  HeartIcon as WishlistIcon,
  InformationCircleIcon as ToastInfo,
  Loading03Icon as ToastLoading,
  LoginSquare01Icon as LoginIcon,
  Menu01Icon as MenuIcon,
  MultiplicationSignCircleIcon as ToastError,
} from "@hugeicons/core-free-icons";

export {
  BedIcon,
  CartIcon,
  CheckCircleIcon,
  CheckIcon,
  CloseIcon,
  ContactIcon,
  HugeiconsIcon,
  LampIcon,
  LoginIcon,
  MenuIcon,
  MinusIcon,
  OfficeChairIcon,
  PlusIcon,
  SearchIcon,
  SparklesIcon,
  StarIcon,
  ToastError,
  ToastInfo,
  ToastLoading,
  ToastSuccess,
  ToastWarning,
  TruckIcon,
  WishlistIcon,
};

export const toastIcons = {
  success: ToastSuccess,
  info: ToastInfo,
  warning: ToastWarning,
  error: ToastError,
  loading: ToastLoading,
} as const;

export type { HugeiconsIconProps as IconProps } from "@hugeicons/react";

export const iconConfig = {
  detail: { size: 16, strokeWidth: 1.5 },
  standard: { size: 20, strokeWidth: 1.5 },
  nav: { size: 24, strokeWidth: 2 },
  showcase: { size: 32, strokeWidth: 2 },
} as const;